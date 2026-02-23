import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

export default function Success() {
  const { clearCart } = useContext(CartContext);

  // Clear cart when payment is successful
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-black text-white px-4">
      <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-fadeInUp">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Payment Successful!
        </h1>

        <p className="text-gray-400 mb-8">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>

        <Link
          to="/"
          className="inline-block w-full py-3 rounded-xl font-semibold bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg active:scale-95"
        >
          Back to Home
        </Link>

        <p className="text-xs text-gray-500 mt-6">
          A confirmation email will be sent to you shortly.
        </p>
      </div>
    </div>
  );
}
