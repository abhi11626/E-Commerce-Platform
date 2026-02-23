import { Link } from "react-router-dom";
import { memo } from "react";

function ProductCard({ product }) {
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition duration-300">
      <div className="h-60 bg-white flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full object-contain"
        />
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.title}
        </h2>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-purple-400 font-bold text-lg">
            ${product.price}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition duration-300"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
