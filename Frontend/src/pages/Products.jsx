import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Products() {
  const products = useLoaderData();
  return (
    <div className="bg-gray-950 text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Our Products
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
