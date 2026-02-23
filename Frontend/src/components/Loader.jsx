export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Spinner */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg text-gray-300 tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
