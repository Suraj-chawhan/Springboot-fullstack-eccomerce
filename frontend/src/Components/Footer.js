import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0c29] text-[#e2e8f0] pt-20 pb-8 mt-24">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <svg className="w-8 h-8 stroke-[#667eea]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <h3 className="font-['Playfair_Display'] text-[28px] font-black text-white">
                ShopHub
              </h3>
            </div>

            <p className="text-[#94a3b8] leading-relaxed mb-8 text-[15px]">
              Your trusted destination for quality products and exceptional service.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {["Facebook", "Twitter", "Instagram"].map((label) => (
                <div
                  key={label}
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[#e2e8f0] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:-translate-y-1"
                  aria-label={label}
                >
                  <span className="text-sm">{label[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/categories" className="footer-link">Categories</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-base font-bold uppercase mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3.5">
              <li><Link to="/shipping" className="footer-link">Shipping Info</Link></li>
              <li><Link to="/returns" className="footer-link">Returns</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/support" className="footer-link">Support</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-base font-bold uppercase mb-6">
              Newsletter
            </h4>
            <p className="text-[#94a3b8] text-sm mb-4">
              Subscribe to get special offers and updates
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 border-2 border-white/10 rounded-xl bg-white/5 text-white text-sm focus:outline-none focus:border-[#667eea]"
              />
              <button
                type="submit"
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white flex items-center justify-center hover:-translate-y-0.5"
              >
                →
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-5 text-[#64748b] text-sm">
          <p>© 2024 ShopHub. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
