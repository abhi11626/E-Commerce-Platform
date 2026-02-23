import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";
  let status = error?.status || 500;

  if (status === 500) {
    message = error?.data?.message || "Internal Server Error.";
  } else if (status === 404) {
    title = "Page Not Found";
    message = "The page you are looking for doesn’t exist.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 px-6">
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 text-center space-y-6 animate-fadeIn">
        {/* Status Code */}
        <h2 className="text-7xl font-extrabold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          {status}
        </h2>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white">{title}</h1>

        {/* Message */}
        <p className="text-gray-400 text-lg">{message}</p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-xl font-semibold
                     bg-linear-to-r from-purple-600 to-pink-600
                     hover:scale-105 active:scale-95
                     transition-all duration-300 shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
