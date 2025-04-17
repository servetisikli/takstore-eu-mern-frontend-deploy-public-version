import {
  HiX,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiOutlineClipboardList,
  HiOutlineLogout,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const menuItems = user
    ? [
        {
          id: "profile",
          label: "My Profile",
          icon: HiOutlineUserCircle,
          onClick: () => handleNavigate("/profile"),
        },
        {
          id: "orders",
          label: "My Orders",
          icon: HiOutlineClipboardList,
          onClick: () => handleNavigate("/profile"),
        },
        {
          id: "logout",
          label: "Logout",
          icon: HiOutlineLogout,
          onClick: () => handleNavigate("/logout"),
          divider: true,
          danger: true,
        },
      ]
    : [
        {
          id: "login",
          label: "Sign In",
          icon: HiOutlineUser,
          onClick: () => handleNavigate("/login"),
        },
      ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 w-[280px] h-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden">
        <header className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close menu"
          >
            <HiX className="w-6 h-6" />
          </button>
        </header>

        <nav className="py-4 px-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.divider && (
                <div className="border-t border-gray-100 my-2" />
              )}
              <button
                type="button"
                onClick={item.onClick}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <item.icon className="w-6 h-6 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
