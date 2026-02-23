import React, { useMemo } from "react";
import { formatCurrency } from "../components/utils/formatter";

function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
  const displayText = useMemo(
    () => `${name} - ${quantity} x ${formatCurrency(price)}`,
    [name, quantity, price],
  );

  return (
    <li className="flex justify-between items-center bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 hover:bg-slate-800 transition duration-300">
      <p className="text-gray-200 font-medium">{displayText}</p>
      <p className="flex items-center gap-5">
        <button
          onClick={onDecrease}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition duration-200"
        >
          -
        </button>
        <span className="text-lg font-semibold text-white">{quantity}</span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white transition duration-200"
        >
          +
        </button>
      </p>
    </li>
  );
}

export default React.memo(CartItem);
