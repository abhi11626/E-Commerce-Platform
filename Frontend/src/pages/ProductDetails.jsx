import { useLoaderData, Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function ProductDetails() {
  const product = useLoaderData();
  const cartCtx = useContext(CartContext);

  function handleAddToCart() {
    cartCtx.addItem(product);
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="bg-white rounded-2xl p-8 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-96 object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          <p className="text-gray-400 mb-6">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-yellow-400 text-lg">
              ⭐ {product.rating?.rate}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.rating?.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-purple-400 mb-6">
            ${product.price}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition duration-300"
            >
              Add to Cart
            </button>

            <Link
              to="/checkout"
              className="border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-xl transition duration-300"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
