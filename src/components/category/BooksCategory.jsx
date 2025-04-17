import React, { useState, useEffect } from "react";
import api from "../../services/api";
import ProductCard from "../../components/product/ProductCard";

const BooksCategory = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/product/category/${category}`);
      setCategoryProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory("books");
  }, []);

  if (loading) {
    return <p className="text-lg text-blue-600">Loading...</p>;
  }

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-indigo-700 uppercase rounded-full bg-indigo-50">
            Explore Books
          </span>
          <h2 className="text-4xl md:text-5xl font-[350] text-gray-900 mb-6 tracking-tight">
            Books Category
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Discover our carefully curated selection of books
          </p>
        </div>

        {/* Product Grid */}
        {error && <p className="text-red-600">{error}</p>}
        {categoryProducts.length === 0 ? (
          <p>No products found in this category</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksCategory;
