import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetchProduct();

  }, [id]);

 
  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

 
const handleCheckout = async () => {
  if (!product) return;

  setOrderLoading(true);

  try {
    const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

    const price = Number(product?.price || 0);
    const qty = Number(quantity || 1);
    const total = price * qty;

  
    const orderDTO = {
      userId: userId,
      totalAmount: total,
      items: [
        {
          productId: Number(product.id),  
          productName: product.name,     
          quantity: qty,
          price: price                 
        },
      ],
    };

    ;

    const orderRes = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/place`,
      orderDTO,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const orderData = orderRes.data;
   

    if (!window.Razorpay) {
      alert(" Razorpay SDK not loaded. Add script in public/index.html");
      return;
    }

    const options = {
      key: "rzp_test_lhLDr2VeITGMax",
      amount: orderData.totalAmount * 100,
      currency: "INR",
      name: "Hunny Food Delivery",
      description: "Food Order Payment",
      order_id: orderData.razorpayOrderId,
    handler: async function (response) {
  try {
    const verifyDTO = {
      orderId: orderData.id, 
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
    };

    const verifyRes = await axios.post(
     `${process.env.REACT_APP_API_URL}/api/verify`,
      verifyDTO,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Payment verified:", verifyRes.data);
    alert(" Payment Successful & Verified!");
    setOrderSuccess(true);

    setTimeout(() => navigate("/ecommerce"), 1500);
  } catch (err) {
    console.error("Payment Verification Failed:", err);
    alert(" Payment Done, But Verification Failed!");
  }
},
      modal: {
        ondismiss: function () {
          alert(" Payment Cancelled!");
        },
      },
      theme: { color: "#667eea" },
    };

    new window.Razorpay(options).open();
  } catch (error) {
    console.error(" Error placing order:", error);
    alert(" Failed to place order. Please try again.");
  } finally {
    setOrderLoading(false);
  }
};

  //  Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  //  Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
        <Navbar onLogout={handleLogout} />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#667eea]/20 border-t-[#667eea] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Product Not Found UI
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
        <Navbar onLogout={handleLogout} />
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#1a1a2e]">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/ecommerce")}
            className="px-8 py-3.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)]"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Main UI (Unchanged)
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <Navbar onLogout={handleLogout} />

      <div className="max-w-[1400px] mx-auto px-6 py-16 pb-24">
        {/* Back Button */}
        <button
          onClick={() => navigate("/ecommerce")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e293b] border-2 border-[#e2e8f0] rounded-xl text-sm font-semibold transition-all duration-300 hover:border-[#667eea] hover:text-[#667eea] hover:-translate-x-1 mb-10"
        >
          <svg
            className="w-4.5 h-4.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
      
          <div className="sticky top-24 w-full h-[600px] bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#667eea]/5 to-[#764ba2]/5">
                <svg
                  className="w-32 h-32 stroke-[#cbd5e1] stroke-2"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>

          
          <div className="bg-white px-12 py-12 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      
            <div className="flex items-start justify-between gap-5 mb-8 pb-8 border-b-2 border-[#f1f5f9]">
              <h1 className="flex-1 font-['Playfair_Display'] text-5xl font-black text-[#1a1a2e] leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-3 mb-10">
              <span className="text-sm font-semibold text-[#64748b] uppercase tracking-widest">
                Price
              </span>
              <span className="font-['Playfair_Display'] text-[56px] font-black text-[#667eea]">
                ₹{product.price}
              </span>
            </div>

          
            <div className="mb-10">
              <h3 className="text-xl font-bold text-[#1e293b] mb-4 tracking-tight">
                Quantity
              </h3>
              <div className="flex items-center gap-4 bg-[#f8fafc] p-2 rounded-2xl w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-xl bg-white text-[#1e293b] flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-[#667eea] hover:text-white hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#1e293b] disabled:hover:scale-100"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="text-xl font-bold text-[#1e293b] min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-white text-[#1e293b] flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-[#667eea] hover:text-white hover:scale-105"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>

            
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#667eea]/5 to-[#764ba2]/5 rounded-2xl mb-8">
              <span className="text-base font-semibold text-[#64748b] uppercase tracking-wider">
                Total
              </span>
              <span className="font-['Playfair_Display'] text-[42px] font-black text-[#667eea]">
                ₹{(product.price * quantity).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={orderLoading || orderSuccess}
              className="w-full px-4 py-5 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_8px_30px_rgba(102,126,234,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(102,126,234,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none tracking-wide"
            >
              {orderLoading ? (
                <>
                  <span className="inline-block w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : orderSuccess ? (
                <>
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Order Placed!
                </>
              ) : (
                <>
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Pay with Razorpay
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
