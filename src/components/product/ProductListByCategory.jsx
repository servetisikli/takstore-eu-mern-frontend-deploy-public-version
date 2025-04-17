import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductListByCategory = () => {
  const { category } = useParams();
  const { categoryProducts, fetchProductsByCategory, loading, error } =
    useContext(ProductContext);

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [category]);

  if (loading) {
    return <p className="text-lg text-blue-600">Loading...</p>;
  }

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-indigo-700 uppercase rounded-full bg-indigo-50">
            Explore {category}
          </span>
          <h2 className="text-4xl md:text-5xl font-[350] text-gray-900 mb-6 tracking-tight">
            {category.charAt(0).toUpperCase() + category.slice(1)} Category
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Discover our carefully curated selection of {category}
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

export default ProductListByCategory;

// Directly axios is used in the snippet.
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_URL } from "../services/api";
// import ProductCard from "./ProductCard";

// const ProductListByCategory = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProductsByCategory = async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/api/product/category/${category}`
//         );
//         setProducts(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductsByCategory();
//   }, [category]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (products.length === 0) return <p>No products found in this category</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <ProductCard key={product._id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductListByCategory;
