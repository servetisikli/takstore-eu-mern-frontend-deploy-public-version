import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProductCard from "../components/product/ProductCard";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(
          `/api/product/search?q=${encodeURIComponent(query)}`
        );
        setResults(response.data);
      } catch (error) {
        setError("Failed to fetch search results. Please try again.");
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-20 sm:mt-30 md:mt-40 lg:mt-40 xl:mt-40">
        <div className="flex items-center justify-center mb-8">
          <FaSearch className="text-primary text-2xl mr-3" />
          <h1 className="text-3xl font-semibold text-gray-800">
            Search Results for "{query}"
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <FaSearch className="text-gray-400 text-5xl mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              No results found for "{query}"
            </p>
            <p className="text-gray-500 mt-2">
              Try checking your spelling or using different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
