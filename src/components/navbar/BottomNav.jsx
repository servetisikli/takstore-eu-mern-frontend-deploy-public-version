import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "All-Shop", path: "/shop" },
    { name: "Electronics", path: "category/electronics" },
    { name: "Books", path: "/category/books" },
    { name: "Clothing", path: "/category/clothing" },
    { name: "Home-Appliances", path: "/category/home-appliances" },
    {
      name: "Sale",
      path: "/shop",
      className: "text-red-500 hover:text-red-600",
    },
  ];

  return (
    <nav className="border-t border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="w-32"></div>
          <div className="flex items-center justify-center flex-1">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => navigate(category.path)}
                className={`relative px-6 py-4 text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors cursor-pointer ${
                  category.className || ""
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
                {index !== categories.length - 1 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gray-200" />
                )}
              </motion.button>
            ))}
          </div>
          <div className="w-32"></div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
