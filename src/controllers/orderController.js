import { query } from "../../db.js";

export const getOrders = async (req, res) => {
  const [orders] = await query("SELECT * FROM orders");
  res.json(orders);
};
