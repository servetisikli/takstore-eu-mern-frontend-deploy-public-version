import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSpeakerphone, HiOutlineTruck } from "react-icons/hi";

const TopNav = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  const announcements = [
    {
      id: 1,
      icon: HiOutlineSpeakerphone,
      text: "🌟 New Season Collection - Up to 40% Off!",
      mobileText: "40% Off New Season",
      link: "#",
    },
    {
      id: 2,
      icon: HiOutlineSpeakerphone,
      text: "⚡ Download Our App & Get $10 Off",
      mobileText: "App $10 Off",
      link: "#",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIndex((prev) =>
        prev === announcements.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = announcements[currentAnnouncementIndex].icon;

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        {/* Desktop & Tablet View */}
        <div className="hidden sm:flex items-center justify-between h-11">
          {/* Sol - Kampanya Duyuruları */}
          <div className="flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncementIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-medium flex items-center space-x-2"
              >
                <HiOutlineSpeakerphone className="w-4 h-4" />
                <span>{announcements[currentAnnouncementIndex].text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sağ - Kargo Bilgisi */}
          <div className="flex items-center space-x-2 pl-4">
            <HiOutlineTruck className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm whitespace-nowrap">
              Free Shipping Over $75
            </span>
          </div>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden flex items-center justify-center h-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncementIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center text-sm font-medium flex items-center space-x-2"
            >
              <motion.span
                initial={{ rotate: -45 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentIcon className="w-4 h-4" />
              </motion.span>
              <span>{announcements[currentAnnouncementIndex].mobileText}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopNav;