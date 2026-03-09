require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const pool = require("./db");

const app = express();
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

/* MIDDLEWARE */
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json());

/* HEALTH */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/* AUTH MIDDLEWARE */
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

/* SIGNUP */
app.post("/api/auth/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const exists = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (exists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1,$2,$3,$4)",
      [email, hash, firstName, lastName],
    );

    res.json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

/* LOGIN */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (result.rows.length === 0)
      return res
        .status(400)
        .json({ error: "User not found, Redirecting to Signup" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* STRIPE (PROTECTED) */
app.post("/api/create-checkout-session", auth, async (req, res) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.title },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe error" });
  }
});

/* START */
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
