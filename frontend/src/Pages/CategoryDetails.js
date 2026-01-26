import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const CategoryProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetchCategoryProducts();
  }, [id,fetchCategoryProducts]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedPriceRange, sortBy,filterAndSortProducts]);

  const fetchCategoryProducts = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/category/${id}/products`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setProducts(response.data);

    if (response.data.length > 0) {
      setCategoryName(response.data[0].categoryName);
    }

    if (response.data.length > 0) {
      const prices = response.data.map((p) => Number(p.price));
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setPriceRange({ min, max });
      setSelectedPriceRange({ min, max });
    }
  } catch (error) {
    console.error("Error fetching category products:", error);
  } finally {
    setLoading(false);
  }
};


  const filterAndSortProducts = () => {
    let filtered = products.filter(
      product => product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
    );

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  const resetFilters = () => {
    setSelectedPriceRange({ min: priceRange.min, max: priceRange.max });
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-[1400px] mx-auto px-6 py-12">
      
        <div className="flex items-center gap-2 text-sm text-[#64748b] mb-8">
          <button onClick={() => navigate('/ecommerce')} className="hover:text-[#667eea] transition-colors">
            Home
          </button>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span className="text-[#1e293b] font-semibold">{categoryName || 'Category'}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-['Playfair_Display'] text-5xl font-black text-[#1a1a2e] mb-3 tracking-tight">
            {categoryName || 'Products'}
          </h1>
          <p className="text-lg text-[#64748b]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1e293b]">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-[#667eea] hover:text-[#764ba2] font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8 pb-8 border-b border-[#f1f5f9]">
                <h3 className="text-lg font-bold text-[#1e293b] mb-6">Price Range</h3>
                
                <div className="space-y-4">
                  {/* Min Price Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#64748b]">
                      Min Price: ${selectedPriceRange.min}
                    </label>
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedPriceRange.min}
                      onChange={(e) => setSelectedPriceRange({
                        ...selectedPriceRange,
                        min: Math.min(parseInt(e.target.value), selectedPriceRange.max - 1)
                      })}
                      className="w-full h-2 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#667eea]"
                    />
                  </div>

                  {/* Max Price Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#64748b]">
                      Max Price: ${selectedPriceRange.max}
                    </label>
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedPriceRange.max}
                      onChange={(e) => setSelectedPriceRange({
                        ...selectedPriceRange,
                        max: Math.max(parseInt(e.target.value), selectedPriceRange.min + 1)
                      })}
                      className="w-full h-2 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#667eea]"
                    />
                  </div>

                  {/* Price Range Display */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#667eea]/5 to-[#764ba2]/5 rounded-xl">
                    <span className="text-sm font-bold text-[#1e293b]">
                      ${selectedPriceRange.min}
                    </span>
                    <span className="text-sm text-[#64748b]">to</span>
                    <span className="text-sm font-bold text-[#1e293b]">
                      ${selectedPriceRange.max}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-lg font-bold text-[#1e293b] mb-4">Sort By</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="default"
                      checked={sortBy === 'default'}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-4 h-4 accent-[#667eea]"
                    />
                    <span className="text-sm text-[#475569]">Default</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="price-low"
                      checked={sortBy === 'price-low'}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-4 h-4 accent-[#667eea]"
                    />
                    <span className="text-sm text-[#475569]">Price: Low to High</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="price-high"
                      checked={sortBy === 'price-high'}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-4 h-4 accent-[#667eea]"
                    />
                    <span className="text-sm text-[#475569]">Price: High to Low</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8fafc] transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="name"
                      checked={sortBy === 'name'}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-4 h-4 accent-[#667eea]"
                    />
                    <span className="text-sm text-[#475569]">Name: A to Z</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl h-[450px] animate-pulse"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-32 h-32 mx-auto mb-6 stroke-[#cbd5e1] stroke-2" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <h3 className="text-2xl font-bold text-[#1e293b] mb-2">No products found</h3>
                <p className="text-[#64748b] mb-6">Try adjusting your filters</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-black/5 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                  >
                    {/* Product Image */}
                    <div className="relative w-full h-[280px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] overflow-hidden group">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#667eea]/5 to-[#764ba2]/5">
                          <svg className="w-20 h-20 stroke-[#cbd5e1] stroke-2" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </div>
                      )}
                      {product.quantity <= 5 && product.quantity > 0 && (
                        <span className="absolute top-4 right-4 bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_4px_15px_rgba(245,87,108,0.4)]">
                          Only {product.quantity} left
                        </span>
                      )}
                      {product.quantity === 0 && (
                        <span className="absolute top-4 right-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-7">
                      <h3 className="text-[22px] font-bold text-[#1e293b] mb-3 tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#64748b] mb-6">
                        Stock: {product.quantity} available
                      </p>

                      <div className="flex items-center justify-between pt-5 border-t border-[#f1f5f9]">
                        <span className="font-['Playfair_Display'] text-[28px] font-black text-[#667eea]">
                          ${product.price.toFixed(2)}
                        </span>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:translate-x-1 hover:shadow-[0_4px_15px_rgba(102,126,234,0.4)] tracking-wide">
                          View Details
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryProducts;