require("dotenv").config();
const express = require("express");
const cors = require("cors");

const stripeKey = process.env.STRIPE_SECRET_KEY;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

console.log("[ENV] STRIPE_SECRET_KEY:", stripeKey ? `${stripeKey.slice(0, 8)}...` : "MISSING");
console.log("[ENV] FRONTEND_URL:", frontendUrl);

if (!stripeKey) {
  console.error("[FATAL] STRIPE_SECRET_KEY is not set. Stripe payments will fail.");
}

const stripe = require("stripe")(stripeKey);

const app = express();
app.use(
  cors({
    origin: [frontendUrl],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.options("*", cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    stripe: stripeKey ? "connected" : "MISSING KEY",
    frontendUrl,
  });
});

app.post("/api/create-checkout-session", async (req, res) => {
  console.log("[CHECKOUT] Incoming request from:", req.headers.origin || "unknown");
  console.log("[CHECKOUT] Items received:", JSON.stringify(req.body.items?.length ?? 0), "items");

  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      console.warn("[CHECKOUT] Empty cart submitted");
      return res.status(400).json({ error: "Cart is empty" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`,
    });

    console.log("[CHECKOUT] Stripe session created:", session.id);
    console.log("[CHECKOUT] Redirecting to:", session.url);
    res.json({ url: session.url });
  } catch (error) {
    console.error("[CHECKOUT] Stripe error:", error.type, "-", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log("[SERVER] Backend running on http://localhost:5000");
    console.log("[SERVER] Health check: http://localhost:5000/api/health");
  });
}

module.exports = app;
