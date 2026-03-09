import { formatCurrency } from "../components/utils/formatter";
import CartItem from "./CartItem";
import { useCallback, useContext, useMemo, useState } from "react";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const auth = useContext(AuthContext);
  const token = auth?.token;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { items, addItem, removeItem } = cartCtx;

  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const formattedCartTotal = useMemo(() => {
    return formatCurrency(cartTotal);
  }, [cartTotal]);

  const itemHandlers = useMemo(() => {
    const inc = new Map();
    const dec = new Map();
    for (const item of items) {
      inc.set(item.id, () => addItem(item));
      dec.set(item.id, () => removeItem(item.id));
    }
    return { inc, dec };
  }, [items, addItem, removeItem]);

  const handleStripeCheckout = useCallback(async () => {
    if (items.length === 0 || loading) return;

    // 🚨 USER NOT LOGGED IN
    if (!token) {
      const existingUser = window.confirm(
        "Do you already have an account?\n\nOK = Login\nCancel = Signup",
      );

      if (existingUser) {
        navigate("/login");
      } else {
        navigate("/signup");
      }

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${backendUrl}/api/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔐 send JWT
          },
          body: JSON.stringify({
            items,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[FRONTEND] Backend error:", errorData);
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      window.location.href = session.url;
    } catch (error) {
      console.error("[FRONTEND] Checkout error:", error.message);
    } finally {
      setLoading(false);
    }
  }, [items, loading, navigate, token]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6">
        {/* LEFT — Order Summary */}
        <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-8 w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Order Summary
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-400 text-center py-10 text-base sm:text-lg">
              Your cart is empty
            </p>
          ) : (
            <>
              <ul className="space-y-4 max-h-72 sm:max-h-96 overflow-y-auto pr-2 sm:pr-3">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    name={item.title}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={itemHandlers.inc.get(item.id)}
                    onDecrease={itemHandlers.dec.get(item.id)}
                  />
                ))}
              </ul>

              <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-3xl sm:text-4xl font-bold text-purple-400 mt-2">
                  {formattedCartTotal}
                </p>
              </div>
            </>
          )}
        </div>

        {/* RIGHT — Stripe Payment */}
        <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-8 w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Secure Payment
            </h2>

            <p className="text-gray-400 text-sm mb-4 sm:mb-6">
              You will be redirected to Stripe’s secure checkout page.
            </p>
          </div>

          <button
            onClick={handleStripeCheckout}
            disabled={loading || items.length === 0}
            className={`w-full mt-6 sm:mt-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg active:scale-95
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
              `Pay ${formattedCartTotal}`
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
            🔒 Secure payments powered by Stripe
          </p>
        </div>
      </div>
    </>
  );
}
