// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();
app.use(
  cors({
    origin: [
      "e-commerce-backend-xi-eosin.vercel.app",
      "e-commerce-frontend-one-lemon.vercel.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // only if you're using cookies/auth
  }),
);

app.options("*", cors()); // handle preflight
app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

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

    // res.json({ id: session.id });
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Only listen on port 5000 if running locally
if (process.env.NODE_ENV !== "production") {
  app.listen(5000);
}

// Export the app for Vercel serverless functions
export default app;
