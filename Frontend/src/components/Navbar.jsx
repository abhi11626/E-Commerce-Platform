import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useContext, useCallback, useMemo } from "react";
import CartContext from "../context/CartContext";
import Cart from "../pages/Cart";
import logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;

  const totalCartItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const { logout, isAuthenticated } = useAuth();

  const location = useLocation();

  const showCart = useMemo(() => {
    const path = location.pathname;
    return path.startsWith("/products") || path.startsWith("/product");
  }, [location.pathname]);

  const handleCartClick = useCallback(() => {
    setIsCartModalOpen(true);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCloseCart = useCallback(() => {
    setIsCartModalOpen(false);
  }, []);

  const handleLogoutMobile = useCallback(() => {
    logout();
    handleCloseMenu();
  }, [logout, handleCloseMenu]);

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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center bg-slate-800/60 backdrop-blur-md rounded-full p-1 border border-white/10 relative">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative px-5 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `relative px-5 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                `relative px-5 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Contact us
            </NavLink>
            {isAuthenticated() ? (
              <button
                onClick={logout}
                className="relative px-5 py-2 rounded-full transition-all duration-300 bg-yellow-600 text-white shadow-md hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `relative px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            {showCart && (
              <div className="relative">
                <button onClick={handleCartClick} className="text-2xl">
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
              className="md:hidden text-2xl text-white hover:text-purple-400 transition"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleCloseMenu}
          ></div>

          {/* side menu */}
          <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 z-50 shadow-xl p-6 flex flex-col space-y-6">
            {/* close */}
            <button
              onClick={handleCloseMenu}
              className="self-end text-2xl text-gray-400 hover:text-white transition"
            >
              ×
            </button>

            {/* mobile links */}
            <NavLink
              to="/"
              onClick={handleCloseMenu}
              className={({ isActive }) =>
                `block text-lg font-medium px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-purple-700 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={handleCloseMenu}
              className={({ isActive }) =>
                `block text-lg font-medium px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-purple-700 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/contact-us"
              onClick={handleCloseMenu}
              className={({ isActive }) =>
                `block text-lg font-medium px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-purple-700 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Contact us
            </NavLink>

            {isAuthenticated() ? (
              <button
                onClick={handleLogoutMobile}
                className="block text-lg px-3 py-2 rounded-lg transition-all duration-300 bg-yellow-600 text-white shadow-md hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={handleCloseMenu}
                className={({ isActive }) =>
                  `block text-lg font-medium px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </>
      )}

      {/* Cart Modal */}
      <Cart open={isCartModalOpen} onClose={handleCloseCart} />
    </nav>
  );
}
