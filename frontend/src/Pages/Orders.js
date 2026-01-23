import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for the logged-in user
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/orders/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(data || []);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      alert("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  // --- Loading UI ---
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
        <Navbar onLogout={handleLogout} />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#667eea]/20 border-t-[#667eea] rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );

  // --- No Orders UI ---
  if (!orders || orders.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
        <Navbar onLogout={handleLogout} />
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="bg-white rounded-3xl p-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h1 className="font-['Playfair_Display'] text-5xl font-black text-[#1a1a2e] mb-4 tracking-tight">
              No Orders Yet
            </h1>
            <p className="text-lg text-[#64748b] mb-10">
              You haven’t placed any orders. Start shopping now!
            </p>
            <button
              onClick={() => navigate("/ecommerce")}
              className="px-10 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-2xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(102,126,234,0.45)]"
            >
              Go to Shop
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );

  // --- Orders List UI ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-[1400px] mx-auto px-6 py-14">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-['Playfair_Display'] text-5xl font-black text-[#1a1a2e] tracking-tight mb-3">
            My Orders
          </h1>
          <p className="text-lg text-[#64748b]">
            Total Orders: <span className="font-bold">{orders.length}</span>
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-black/5"
            >
              {/* Order Header */}
              <div className="p-8 bg-gradient-to-r from-[#667eea]/5 to-[#764ba2]/5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-black text-[#1a1a2e]">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-[#64748b] mt-2">
                    Date:{" "}
                    <span className="font-semibold text-[#334155]">
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleString()
                        : "N/A"}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white shadow-sm border border-black/5 text-[#1e293b]">
                    Total: ₹{order.totalAmount}
                  </span>

                  <span
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-900"
                        : order.paymentStatus === "FAILED"
                        ? "bg-red-100 text-red-900"
                        : "bg-yellow-100 text-yellow-900"
                    }`}
                  >
                    {order.paymentStatus || "PENDING"}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-8">
                <h3 className="text-xl font-black text-[#1e293b] mb-5">
                  Items
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wider text-[#64748b] border-b border-[#e2e8f0]">
                        <th className="py-3 pr-4">Product</th>
                        <th className="py-3 pr-4">Qty</th>
                        <th className="py-3 pr-4">Price</th>
                        <th className="py-3 pr-4">Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#f1f5f9] text-sm">
                            <td className="py-4 pr-4 font-semibold text-[#1e293b]">
                              {item.productName}
                            </td>
                            <td className="py-4 pr-4 text-[#475569]">{item.quantity}</td>
                            <td className="py-4 pr-4 text-[#475569]">₹{item.price}</td>
                            <td className="py-4 pr-4 font-bold text-[#667eea]">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-6 text-center text-[#64748b]">
                            No items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Razorpay Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                    <p className="text-xs text-[#64748b] uppercase font-bold tracking-wider">
                      Razorpay Order ID
                    </p>
                    <p className="text-sm font-semibold text-[#1e293b] mt-1 break-all">
                      {order.razorpayOrderId || "N/A"}
                    </p>
                  </div>

                  <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                    <p className="text-xs text-[#64748b] uppercase font-bold tracking-wider">
                      Payment Status
                    </p>
                    <p className="text-sm font-semibold text-[#1e293b] mt-1">
                      {order.paymentStatus || "PENDING"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => navigate("/ecommerce")}
            className="px-12 py-4 bg-white border-2 border-[#e2e8f0] text-[#1e293b] rounded-2xl font-bold transition-all duration-300 hover:border-[#667eea] hover:text-[#667eea] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
          >
            Back to Shop
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyOrders;
