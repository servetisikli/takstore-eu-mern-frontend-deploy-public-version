import React from "react";
import { useNavigate } from "react-router-dom";
import { HiMail, HiPhone } from "react-icons/hi";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const FooterLink = ({ onClick, children }) => (
  <div
    onClick={onClick}
    className="text-gray-600 hover:text-violet-600 cursor-pointer transition-colors"
  >
    {children}
  </div>
);

const SocialIcon = ({
  onClick,
  children,
  hoverColor = "hover:text-violet-600",
}) => (
  <div
    onClick={onClick}
    className={`text-gray-600 ${hoverColor} transition-colors p-2 hover:bg-gray-50 rounded-full cursor-pointer`}
  >
    {children}
  </div>
);

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-100 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">TakStore</h2>
            <p className="text-gray-600">
              Your trusted online shopping destination
            </p>
            <div className="space-y-2">
              <div
                onClick={() => navigate("#")}
                className="flex items-center text-gray-600 hover:text-violet-600 transition-colors cursor-pointer"
              >
                <HiMail className="w-5 h-5 mr-2" />
                example@example.com
              </div>
              <div
                onClick={() => navigate("#")}
                className="flex items-center text-gray-600 hover:text-violet-600 transition-colors cursor-pointer"
              >
                <HiPhone className="w-5 h-5 mr-2" />
                TAK-STORE
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Customer Service
            </h2>
            <nav className="flex flex-col space-y-2">
              <FooterLink onClick={() => navigate("#")}>Track Order</FooterLink>
              <FooterLink onClick={() => navigate("#")}>
                Shipping Info
              </FooterLink>
              <FooterLink onClick={() => navigate("#")}>
                Returns & Exchanges
              </FooterLink>
              <FooterLink onClick={() => navigate("#")}>FAQ</FooterLink>
              <FooterLink onClick={() => navigate("#")}>Contact Us</FooterLink>
            </nav>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Shop Categories</h2>
            <nav className="flex flex-col space-y-2">
              <FooterLink onClick={() => navigate("#")}>
                New Arrivals
              </FooterLink>
              <FooterLink onClick={() => navigate("#")}>
                Best Sellers
              </FooterLink>
              <FooterLink onClick={() => navigate("#")}>Sale</FooterLink>
              <FooterLink onClick={() => navigate("#")}>Brands</FooterLink>
            </nav>
          </div>

          {/* Payment & Social */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Connect With Us</h2>
            {/* Payment Methods */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Secure Payments</p>
              <div className="flex space-x-3">
                <FaCcVisa className="h-8 w-auto text-[#1434CB]" />
                <FaCcMastercard className="h-8 w-auto text-[#EB001B]" />
                <FaCcPaypal className="h-8 w-auto text-[#003087]" />
              </div>
            </div>
            {/* Social Media */}
            <div className="flex space-x-2">
              <SocialIcon onClick={() => navigate("#")}>
                <FaFacebookF className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon onClick={() => navigate("#")}>
                <FaInstagram className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon onClick={() => navigate("#")}>
                <FaTwitter className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TakStore. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <FooterLink onClick={() => navigate("#")}>
                Privacy Policy
              </FooterLink>
              <FooterLink onClick={() => navigate("#")}>
                Terms of Service
              </FooterLink>
              <FooterLink onClick={() => navigate("#")}>
                Cookie Policy
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
