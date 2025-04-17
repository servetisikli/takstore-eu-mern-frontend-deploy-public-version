import React from "react";
import { useNavigate } from "react-router-dom";
import electronics from "../../assets/images/collection/electronics.jpg";
import books from "../../assets/images/collection/books.jpg";
import clothing from "../../assets/images/collection/clothing.jpg";
import homeAppliances from "../../assets/images/collection/home-appliances.jpg";

const Carousel = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Smart, innovative, high-performance",
      image: electronics,
      itemCount: "5 Items",
      link: "/category/electronics",
    },
    {
      id: 2,
      name: "Books",
      description: "Creative, inspiring, timeless",
      image: books,
      itemCount: "5 Items",
      link: "/category/books",
    },
    {
      id: 3,
      name: "Clothing",
      description: "Stylish, comfortable, versatile",
      image: clothing,
      itemCount: "5 Items",
      link: "/category/clothing",
    },
    {
      id: 4,
      name: "Home-Appliances",
      description: "Efficient, modern, reliable",
      image: homeAppliances,
      itemCount: "5 Items",
      link: "/category/home-appliances",
    },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-indigo-700 uppercase rounded-full bg-indigo-50">
            Explore Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-[350] text-gray-900 mb-6 tracking-tight">
            Browse Collections
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Discover our carefully curated selection of contemporary pieces
          </p>
        </div>

        {/* Updated Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(category.link)}
              className="group relative bg-white rounded-2xl transition-all duration-300 
                hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer
                border border-gray-100 overflow-hidden"
            >
              {/* Item Count Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span
                  className="text-xs font-medium bg-gray-900/75 text-white 
                  px-2 py-1 rounded-full group-hover:bg-indigo-600 
                  transition-colors duration-300"
                >
                  {category.itemCount}
                </span>
              </div>

              {/* Image Container */}
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3
                  className="text-xl font-medium text-gray-900 mb-2 
                  group-hover:text-indigo-600 transition-colors duration-300"
                >
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div
                className="absolute inset-0 border-2 border-indigo-600 rounded-2xl opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
