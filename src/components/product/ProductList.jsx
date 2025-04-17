import React, { useContext } from 'react';
import { ProductContext } from "../../context/ProductContext";
import ProductCard from './ProductCard';

const ProductList = () => {
  const { products, loading, error } = useContext(ProductContext);

  if (loading) {
    return <p className="text-lg text-blue-600">Loading...</p>;
  }

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-indigo-700 uppercase rounded-full bg-indigo-50">
            Explore Products
          </span>
          <h2 className="text-4xl md:text-5xl font-[350] text-gray-900 mb-6 tracking-tight">
            All Products
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Discover our carefully curated selection of products
          </p>
        </div>

        {/* Product Grid */}
        {error && <p className="text-red-600">{error}</p>}
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;