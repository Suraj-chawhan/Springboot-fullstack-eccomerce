import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Carousel from '../Components/Carousel';
import { Package, Grid, ShoppingBag, ArrowRight, Tag } from 'lucide-react';

const Ecommerce = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const [categoriesRes, productsRes] = await Promise.all([
        axios.get('http://localhost:8080/api/user/categories', config),
        axios.get(`${process.env.REACT_APP_API_URL}/api/user/products`, config)
      ]);

      setCategories(categoriesRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onLogout={handleLogout} />
      
      <Carousel />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Categories Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-600">Browse our curated collections</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* All Products Card */}
            <div
              onClick={() => setSelectedCategory('all')}
              className={`group bg-white rounded-xl p-6 text-center cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
                selectedCategory === 'all' 
                  ? 'border-orange-500 shadow-lg shadow-orange-500/20 bg-gradient-to-br from-orange-50 to-white' 
                  : 'border-slate-200 hover:border-orange-300'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                selectedCategory === 'all' 
                  ? 'bg-orange-500 scale-110' 
                  : 'bg-slate-100 group-hover:bg-orange-100'
              }`}>
                <Grid className={`w-8 h-8 ${selectedCategory === 'all' ? 'text-white' : 'text-slate-600 group-hover:text-orange-600'}`} />
              </div>
              <h3 className={`text-sm font-semibold ${selectedCategory === 'all' ? 'text-orange-600' : 'text-slate-700 group-hover:text-slate-900'}`}>
                All Products
              </h3>
            </div>

            {/* Category Cards */}
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                className={`group bg-white rounded-xl p-6 text-center cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
                  selectedCategory === category.name 
                    ? 'border-orange-500 shadow-lg shadow-orange-500/20 bg-gradient-to-br from-orange-50 to-white' 
                    : 'border-slate-200 hover:border-orange-300'
                }`}
              >
                {category.imageUrl ? (
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedCategory === category.name ? 'scale-110' : ''
                  }`}>
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    selectedCategory === category.name 
                      ? 'bg-orange-500 scale-110' 
                      : 'bg-slate-100 group-hover:bg-orange-100'
                  }`}>
                    <Package className={`w-8 h-8 ${selectedCategory === category.name ? 'text-white' : 'text-slate-600 group-hover:text-orange-600'}`} />
                  </div>
                )}
                <h3 className={`text-sm font-semibold ${selectedCategory === category.name ? 'text-orange-600' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 pb-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-slate-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
            
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 transition-colors"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-[420px] animate-pulse border border-slate-200"></div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600 mb-6">Try browsing other categories</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm border border-slate-200 hover:shadow-xl hover:border-orange-300 hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-[240px] bg-slate-100 overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                        <Package className="w-16 h-16 text-slate-300" />
                      </div>
                    )}
                    {product.badge && (
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                        {product.badge}
                      </span>
                    )}
                    
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="px-6 py-2.5 bg-white text-slate-900 rounded-lg font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    {/* Category Tag */}
                    {product.categoryName && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Tag className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-medium text-orange-600">
                          {product.categoryName}
                        </span>
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    {product.description && (
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-2xl font-bold text-slate-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-400 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 group-hover:gap-3">
                        View
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Stock Indicator */}
                    {product.quantity !== undefined && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-xs font-medium ${product.quantity > 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Ecommerce;