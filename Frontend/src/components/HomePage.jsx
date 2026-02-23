import { Link } from "react-router-dom";
import apparels from "../assets/apparels.webp";
import led from "../assets/led.jpg";
import electronics from "../assets/image.jpg";

function HomePage() {
  return (
    <div className="text-white min-h-screen dark:bg-gray-900">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        {/* Small Badge */}
        <div className="inline-block mb-6 px-4 py-1 text-sm font-medium bg-indigo-600/20 text-indigo-400 rounded-full border border-indigo-500/30 backdrop-blur-md">
          ✨ New Collection 2026
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="block bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Elevate Your
          </span>

          <span className="relative inline-block mt-2 text-white">
            Shopping Experience
            <span className="absolute left-0 -bottom-2 w-full h-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"></span>
          </span>
        </h1>

        {/* Sub Text */}
        <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover{" "}
          <span className="text-white font-semibold">premium quality </span>
          products crafted to match your lifestyle and redefine your everyday
          living.
        </p>

        {/* Category Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto my-16">
          {/* LED TV */}

          <Link
            to="/products"
            className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          >
            <img
              src={led}
              alt="LED TV"
              loading="lazy"
              className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white">Smart LED TVs</h3>
              <p className="text-gray-300 text-sm">Experience cinema at home</p>
            </div>
          </Link>

          {/* Fashion Clothing */}
          <Link
            to="/products"
            className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          >
            <img
              src={apparels}
              alt="Fashion Clothing"
              loading="lazy"
              className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white">Clothing</h3>
              <p className="text-gray-300 text-sm">Style matters!</p>
            </div>
          </Link>

          {/* Electronics & Accessories */}
          <Link
            to="/products"
            className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          >
            <img
              src={electronics}
              alt="Electronics & Accessories"
              loading="lazy"
              className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white">
                Fashion Accessories
              </h3>
              <p className="text-gray-300 text-sm">Style that defines you</p>
            </div>
          </Link>
        </div>

        <div className="flex justify-center gap-6">
          <Link
            to="/products"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition duration-300"
          >
            Shop Now
          </Link>

          <Link
            to="/signup"
            className="border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-xl font-semibold transition duration-300"
          >
            Join Us
          </Link>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-indigo-700 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Gear?</h2>
        <p className="mb-6 text-gray-200">
          Join thousands of happy customers today.
        </p>
        <Link
          to="/products"
          className="bg-black hover:bg-gray-900 px-8 py-3 rounded-xl font-semibold transition duration-300"
        >
          Explore Products
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
