import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
     
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ show only 20 products
      setProducts((res.data || []).slice(0, 20));
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  // ✅ total products shown
  const totalShown = useMemo(() => products?.length || 0, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-[1400px] mx-auto px-6 py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h1 className="font-['Playfair_Display'] text-5xl font-black text-[#1a1a2e] tracking-tight">
              Products
            </h1>
            <p className="text-[#64748b] mt-3 text-lg">
              Showing <span className="font-bold text-[#1e293b]">{totalShown}</span>{" "}
              products
            </p>
          </div>

          <button
            onClick={() => navigate("/categories")}
            className="w-fit px-8 py-3 bg-white border-2 border-[#e2e8f0] text-[#1e293b] rounded-2xl font-bold transition-all duration-300 hover:border-[#667eea] hover:text-[#667eea] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)]"
          >
            View Categories
          </button>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white h-[420px] rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl p-14 text-center shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
            <h2 className="text-2xl font-black text-[#1e293b] mb-2">
              No products found
            </h2>
            <p className="text-[#64748b]">Try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-black/5 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              >
                {/* Image */}
                <div className="relative w-full h-[240px] overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#94a3b8] font-bold">
                      No Image
                    </div>
                  )}

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-[#1e293b] shadow-sm border border-black/5">
                    {p.categoryName || "Food"}
                  </span>

                  {/* Stock Badge */}
                  {p.quantity === 0 ? (
                    <span className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
                      Out of Stock
                    </span>
                  ) : p.quantity <= 5 ? (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-[0_4px_15px_rgba(245,87,108,0.35)]">
                      Only {p.quantity} left
                    </span>
                  ) : null}
                </div>

                {/* Info */}
                <div className="p-7">
                  <h3 className="text-[20px] font-black text-[#1e293b] mb-2 tracking-tight truncate">
                    {p.name}
                  </h3>

                  <p className="text-sm text-[#64748b] mb-5">
                    Stock: <span className="font-bold">{p.quantity}</span>
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-[#f1f5f9]">
                    <span className="font-['Playfair_Display'] text-[26px] font-black text-[#667eea]">
                      ₹{Number(p.price).toFixed(2)}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${p.id}`);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl text-sm font-bold transition-all duration-300 hover:translate-x-1 hover:shadow-[0_6px_18px_rgba(102,126,234,0.35)]"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => navigate("/ecommerce")}
            className="px-12 py-4 bg-white border-2 border-[#e2e8f0] text-[#1e293b] rounded-2xl text-base font-bold transition-all duration-300 hover:border-[#667eea] hover:text-[#667eea] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
          >
            Back to Shop
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
