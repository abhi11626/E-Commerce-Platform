import { formatCurrency } from "../components/utils/formatter";
import CartItem from "./CartItem";
import { useContext, useState } from "react";
import CartContext from "../context/CartContext";


export default function Checkout() {
  const backendUrl = import.meta.env.BACKEND_URL || "http://localhost:5000";
  const cartCtx = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  async function handleStripeCheckout() {
    if (cartCtx.items.length === 0) return;

    setLoading(true);

    try {
      // Call your backend to create Stripe session
      const response = await fetch(
        `${backendUrl}/api/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartCtx.items,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      // const result = await stripe.redirectToCheckout({
      //   sessionId: session.id,
      // });
      window.location.href = session.url;
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-8">
      {/* LEFT — Order Summary */}
      <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 w-1/2">
        <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Order Summary
        </h2>

        {cartCtx.items.length === 0 ? (
          <p className="text-gray-400 text-center py-10 text-lg">
            Your cart is empty
          </p>
        ) : (
          <>
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-3">
              {cartCtx.items.map((item) => (
                <CartItem
                  key={item.id}
                  name={item.title}
                  quantity={item.quantity}
                  price={item.price}
                  onIncrease={() => cartCtx.addItem(item)}
                  onDecrease={() => cartCtx.removeItem(item.id)}
                />
              ))}
            </ul>

            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm">Total</p>
              <p className="text-4xl font-bold text-purple-400 mt-2">
                {formatCurrency(cartTotal)}
              </p>
            </div>
          </>
        )}
      </div>

      {/* RIGHT — Stripe Payment */}
      <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Secure Payment
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            You will be redirected to Stripe’s secure checkout page.
          </p>
        </div>

        <button
          onClick={handleStripeCheckout}
          disabled={loading || cartCtx.items.length === 0}
          className={`w-full mt-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg active:scale-95
            ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
            }`}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            `Pay ${formatCurrency(cartTotal)}`
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          🔒 Secure payments powered by Stripe
        </p>
      </div>
    </div>
  );
}
