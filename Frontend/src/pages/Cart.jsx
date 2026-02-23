import { useContext, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import CartContext from "../context/CartContext";
import { formatCurrency } from "../components/utils/formatter";
import CartItem from "./CartItem";

export default function Cart({ open, onClose }) {
  const cartCtx = useContext(CartContext);

  const handleAddItem = useCallback(
    (item) => cartCtx.addItem(item),
    [cartCtx]
  );

  const handleRemoveItem = useCallback(
    (itemId) => cartCtx.removeItem(itemId),
    [cartCtx]
  );

  const cartTotal = useMemo(
    () =>
      cartCtx.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [cartCtx.items],
  );

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full text-white shadow-2xl shadow-purple-500/10">
        <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Shopping Cart
        </h2>
        {cartCtx.items.length === 0 ? (
          <p className="text-gray-400 text-center py-8 text-lg">
            Your cart is empty
          </p>
        ) : (
          <>
            <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {cartCtx.items.map((item) => (
                <CartItem
                  key={item.id}
                  name={item.title}
                  quantity={item.quantity}
                  price={item.price}
                  onIncrease={() => handleAddItem(item)}
                  onDecrease={() => handleRemoveItem(item.id)}
                />
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-300">
                <span className="text-2xl font-bold text-purple-400">
                  Total: {formatCurrency(cartTotal)}
                </span>
              </p>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="mt-4 w-full bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white py-3 rounded-xl block text-center font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
            >
              Checkout
            </Link>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-6 w-full border border-gray-600 hover:bg-gray-800 text-white py-3 rounded-xl transition duration-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
