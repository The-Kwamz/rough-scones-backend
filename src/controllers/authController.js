import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db.js";

//
// REGISTER USER
//
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = "customer" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email exists
    const [existing] = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // insert user
    const [result] = await query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, role]
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertId,
        name,
        email,
        role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST BODY:", req.body);

    if (!email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Querying DB for email:", email);
    const [rows] = await query("SELECT * FROM users WHERE email = ?", [email]);
    console.log("DB RESULT:", rows);

    if (rows.length === 0) {
      console.log("Email not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    console.log("Stored password in DB:", user.password);
    console.log("Comparing passwords...");

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", passwordMatch);

    if (!passwordMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Generating JWT...");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("LOGIN SUCCESS");
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR STACK:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
