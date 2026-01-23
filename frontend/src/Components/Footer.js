import React from 'react';

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
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <h3 className="font-['Playfair_Display'] text-[28px] font-black text-white">ShopHub</h3>
            </div>
            <p className="text-[#94a3b8] leading-relaxed mb-8 text-[15px]">
              Your trusted destination for quality products and exceptional service.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[#e2e8f0] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:-translate-y-1" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[#e2e8f0] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:-translate-y-1" aria-label="Twitter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[#e2e8f0] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:-translate-y-1" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold tracking-wider uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3.5">
              <li><a href="#about" className="text-[#94a3b8] text-sm hover:text-white hover:translate-x-1 inline-block transition-all">About Us</a></li>
              <li><a href="#products" className="text-[#94a3b8] text-sm hover:text-white hover:translate-x-1 inline-block transition-all">Products</a></li>
              <li><a href="#categories" className="text-[#94a3b8] text-sm hover:text-white hover:translate-x-1 inline-block transition-all">Categories</a></li>
              <li><a href="#contact" className="text-[#94a3b8] text-sm hover:text-white hover:translate-x-1 inline-block transition-all">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-base font-bold tracking-wider uppercase mb-6">Customer Service</h4>
            <ul className="space-y-3.5">
              <li><a href="#shipping" className="text-[#94a3b8] text-sm hover:text-white hover:translate-x-1 inline-block transition-all">Shipping Info</a></li>
              <li><a href="#returns" className="text-[#94a3b8] text-sm hover:text-white hover:translate-x-1 inline-block transition-all">Returns</a></li>
              <li><a href="#faq" className="text-[#94a3b8] text-sm hover:text-white hover:translate-x-1 inline-block transition-all">FAQ</a></li>
              <li><a href="#support" className="text-[#94a3b8] text-sm hover:text-white hover:translate-x-1 inline-block transition-all">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-base font-bold tracking-wider uppercase mb-6">Newsletter</h4>
            <p className="text-[#94a3b8] text-sm mb-4 leading-relaxed">Subscribe to get special offers and updates</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 border-2 border-white/10 rounded-xl bg-white/5 text-white text-sm focus:outline-none focus:border-[#667eea] focus:bg-white/8 transition-all placeholder:text-[#64748b]"
              />
              <button type="submit" className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-5 text-[#64748b] text-sm">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#privacy" className="text-[#94a3b8] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-[#94a3b8] hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;