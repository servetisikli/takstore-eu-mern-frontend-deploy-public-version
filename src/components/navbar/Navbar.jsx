import { motion } from "framer-motion";
import { useNavbar } from "../../context/layout/NavbarContext";
import TopNav from "./TopNav";
import MainNav from "./MainNav";
import BottomNav from "./BottomNav";
import CartSidebar from "./CartSidebar";
import MobileBottomNav from "./MobileBottomNav";

const Navbar = () => {
  const { scrollProgress = 0, isCartOpen } = useNavbar();

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 z-50"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      />

      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 backdrop-blur-md bg-white/70" />

        <div className="relative">
          <TopNav />
          <MainNav />

          {/* Bottom Navigation - Desktop */}
          <div className="hidden md:block">
            <BottomNav />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <MobileBottomNav />
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && <CartSidebar />}
    </>
  );
};

export default Navbar;
