import { useState, useRef, useEffect, useContext } from "react";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineLogout,
  HiOutlineClipboardList,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { useNavbar } from "../../context/layout/NavbarContext";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import IconButton from "./IconButton";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";

const MainNav = () => {
  const navigate = useNavigate();
  const { setIsCartOpen } = useNavbar();
  const { user } = useAuth();
  const { getItemCount } = useContext(CartContext);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    if (isSearchFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchFocused]);
  // Body scroll'u engelle - mobilMenu açıkken
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50">
      <div className="py-2 sm:py-3 lg:py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Search Section */}
            <div className="flex items-center gap-4 sm:gap-8 lg:gap-12 flex-1">
              <a
                href="/"
                className="text-xl sm:text-2xl font-bold shrink-0 transition-transform hover:scale-105"
              >
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  TAKSTORE.EU
                </span>
              </a>

              <div className="hidden sm:block flex-1 max-w-2xl">
                <SearchBar
                  inputRef={searchInputRef}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-8">
              <IconButton
                icon={HiOutlineShoppingBag}
                onClick={() => setIsCartOpen(true)}
                label="Cart"
                badge={getItemCount() || undefined}
                className="hover:bg-gray-100"
              />

              {user ? (
                <div className="relative" ref={profileMenuRef}>
                  <IconButton
                    icon={HiOutlineUser}
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    label="Account"
                    className="hover:bg-gray-100"
                  />

                  {/* Desktop Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <HiOutlineUserCircle className="w-5 h-5 mr-3" />
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <HiOutlineClipboardList className="w-5 h-5 mr-3" />
                        My Orders
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          navigate("/logout");
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <HiOutlineLogout className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <IconButton
                  icon={HiOutlineUser}
                  onClick={() => navigate("/login")}
                  label="Sign In"
                  className="hover:bg-gray-100"
                />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <HiOutlineMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-3 pt-2">
          <SearchBar isMobile className="bg-gray-50" />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default MainNav;
