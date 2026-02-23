import { Link, NavLink, useLocation } from "react-router-dom";

import { useState, useContext, useCallback } from "react";
import CartContext from "../context/CartContext";
import Cart from "../pages/Cart";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const location = useLocation();

  const showCart =
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/product");

  const handleCartClick = useCallback(() => {
    setIsCartModalOpen(true);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
          <Link
            to="/"
            className="text-3xl md:text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            React Shop
          </Link>
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-300 hover:text-yellow-400"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-300 hover:text-yellow-400"
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-300 hover:text-yellow-400"
              }
            >
              Contact us
            </NavLink>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            {showCart && (
              <div className="relative">
                <button onClick={() => handleCartClick()} className="text-2xl">
                  🛒
                </button>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCartItems}
                </span>
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={handleToggleMenu}
              className="md:hidden text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-800 shadow-lg px-4 py-3 space-y-2">
          <Link
            to="/"
            onClick={handleCloseMenu}
            className="block text-gray-300 hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={handleCloseMenu}
            className="block text-gray-300 hover:text-yellow-400"
          >
            Products
          </Link>
          <Link
            to="/contact-us"
            onClick={handleCloseMenu}
            className="block text-gray-300 hover:text-yellow-400"
          >
            Contact us
          </Link>
          {showCart && (
            <Link
              to="/checkout"
              onClick={handleCloseMenu}
              className="block text-gray-300 hover:text-yellow-400"
            >
              Checkout
            </Link>
          )}
        </div>
      )}

      {/* Cart Modal */}
      <Cart open={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
    </nav>
  );
}
