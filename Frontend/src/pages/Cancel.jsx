import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-black text-white px-4">
      <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-fadeInUp">
        {/* Cancel Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4 bg-linear-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
          Payment Cancelled
        </h1>

        <p className="text-gray-400 mb-8">
          Your payment was not completed. You can try again anytime.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/checkout"
            className="py-3 rounded-xl font-semibold bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg active:scale-95"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
