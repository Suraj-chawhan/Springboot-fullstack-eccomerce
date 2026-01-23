import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const navigate=useNavigate()
  return (
    <nav className="bg-[#1a1a2e]/98 backdrop-blur-xl border-b border-white/10 sticky top-0 z-[1000] shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[75px]">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 stroke-[#667eea] stroke-[2.5]" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="font-['Playfair_Display'] text-[26px] font-black text-white tracking-tight">
            ShopHub
          </span>
        </div>

        {/* Desktop Menu */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-[75px] md:top-0 left-0 right-0 md:left-auto md:right-auto bg-[#1a1a2e]/98 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none gap-5 md:gap-10 items-center p-6 md:p-0 border-b md:border-0 border-white/10 transition-all duration-300`}>
          <a href="/ecommerce" className="text-[#e2e8f0] text-[15px] font-medium tracking-wide relative hover:text-white transition-colors after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#667eea] after:to-[#764ba2] hover:after:w-full after:transition-all after:duration-300">
            Home
          </a>
          <h2  onClick={()=>navigate("/products")} className="text-[#e2e8f0] text-[15px] font-medium tracking-wide relative hover:text-white transition-colors after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#667eea] after:to-[#764ba2] hover:after:w-full after:transition-all after:duration-300">
            Products
          </h2>
          <h2  onClick={()=>navigate("/categories")} className="text-[#e2e8f0] text-[15px] font-medium tracking-wide relative hover:text-white transition-colors after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#667eea] after:to-[#764ba2] hover:after:w-full after:transition-all after:duration-300">
            Categories
          </h2>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

            
          {/* Search Button */}
          {/* <button className="relative w-11 h-11 rounded-xl bg-white/5 text-[#e2e8f0] flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button> */}

          {/* Cart Button */}
          <button className="relative w-11 h-11 rounded-xl bg-white/5 text-[#e2e8f0] flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5" onClick={()=>navigate("/orders")}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>

          {/* Logout Button - Desktop */}
          <button 
            onClick={onLogout}
            className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(102,126,234,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)] tracking-wide"
          >
            Logout
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 rounded-xl bg-white/5 text-[#e2e8f0] flex items-center justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;