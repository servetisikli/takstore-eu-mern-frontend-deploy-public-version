import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = ({ isMobile = false, inputRef, onFocus, onBlur }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search products, brands and more..."
        className={`w-full px-4 ${!isMobile ? "sm:px-6 py-2 sm:py-2.5" : "py-2"} text-sm rounded-full bg-gray-100 border-2 border-transparent focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all`}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={isMobile ? "Search mobile" : "Search"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <HiOutlineSearch
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
          aria-hidden="true"
        />
      </button>
    </form>
  );
};

export default SearchBar;