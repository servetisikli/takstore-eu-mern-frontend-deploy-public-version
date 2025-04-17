import { useContext, useState } from "react";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { useNavbar } from "../../context/layout/NavbarContext";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MobileBottomNav = () => {
  const { setIsCartOpen } = useNavbar();
  const { getItemCount } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    {
      icon: HiOutlineHome,
      label: "Home",
      action: () => navigate("/"),
    },
    {
      icon: HiOutlineShoppingBag,
      label: "Cart",
      action: () => setIsCartOpen(true),
      badge: getItemCount() || undefined,
    },
    {
      icon: HiOutlineClipboardList,
      label: "Orders",
      action: () => navigate("/orders"),
      show: user,
    },
    {
      icon: user ? HiOutlineUserCircle : HiOutlineUser,
      label: user ? "Profile" : "Sign In",
      action: user
        ? () => setIsProfileOpen(!isProfileOpen)
        : () => navigate("/login"),
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.hasOwnProperty("show") || item.show
  );

  const profileMenu = [
    {
      icon: HiOutlineUserCircle,
      label: "My Profile",
      action: () => {
        navigate("/profile");
        setIsProfileOpen(false);
      },
    },
    {
      icon: HiOutlineLogout,
      label: "Logout",
      action: () => {
        navigate("/logout");
        setIsProfileOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t md:hidden">
        <div className="flex items-center justify-around h-16">
          {filteredNavItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex flex-col items-center justify-center relative w-16"
            >
              <item.icon className="w-6 h-6 mb-1 text-gray-600" />
              <span className="text-xs text-gray-600">{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 right-2 w-4 h-4 text-xs flex items-center justify-center bg-violet-600 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Simple Profile Menu */}
      {isProfileOpen && user && (
        <>
          <div
            className="fixed inset-0 bg-black/20 md:hidden z-40"
            onClick={() => setIsProfileOpen(false)}
          />
          <div className="fixed bottom-16 right-0 bg-white border-l shadow-lg md:hidden z-50 w-48">
            {profileMenu.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`flex items-center w-full px-4 py-3 ${
                  item.danger ? "text-red-600" : "text-gray-700"
                } hover:bg-gray-50`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MobileBottomNav;
