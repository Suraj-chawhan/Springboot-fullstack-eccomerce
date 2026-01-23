import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/categories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const totalCategories = useMemo(
    () => categories?.length || 0,
    [categories]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-[1400px] mx-auto px-6 py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h1 className="font-['Playfair_Display'] text-5xl font-black text-[#1a1a2e] tracking-tight">
              Categories
            </h1>
            <p className="text-[#64748b] mt-3 text-lg">
              Total:{" "}
              <span className="font-bold text-[#1e293b]">{totalCategories}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="w-fit px-8 py-3 bg-white border-2 border-[#e2e8f0] text-[#1e293b] rounded-2xl font-bold transition-all duration-300 hover:border-[#667eea] hover:text-[#667eea] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)]"
          >
            View Products
          </button>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white h-[160px] rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white rounded-3xl p-14 text-center shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
            <h2 className="text-2xl font-black text-[#1e293b] mb-2">
              No categories found
            </h2>
            <p className="text-[#64748b]">Try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`/category/${c.id}`)}
                className="group bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-black/5 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              >
                {/* Image */}
                <div className="h-[120px] bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 overflow-hidden flex items-center justify-center">
                  {c.imageUrl ? (
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-4xl font-black text-[#667eea]">
                      {c.name?.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="p-4 text-center">
                  <p className="text-sm font-black text-[#1e293b] truncate">
                    {c.name}
                  </p>
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

export default Categories;
