import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Package, 
  FolderTree, 
  ShoppingCart, 
  LogOut, 
  Plus, 
  Upload, 
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";

const CLOUDINARY_UPLOAD_PRESET = "fgl3bmtq";
const CLOUDINARY_CLOUD_NAME = "dqqwrgmo9";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  );

  return res.data.secure_url;
};

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryName: "",
    categoryId: "",
    imageUrl: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    imageUrl: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
      fetchCategories();
    }
    if (activeTab === "categories") fetchCategories();
    if (activeTab === "orders") fetchOrders();
  }, [activeTab]);

  const fetchProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const handleProductImageUpload = async (file) => {
    setLoading(true);
    const url = await uploadToCloudinary(file);
    setProductForm((p) => ({ ...p, imageUrl: url }));
    setLoading(false);
  };

  const handleCategoryImageUpload = async (file) => {
    setLoading(true);
    const url = await uploadToCloudinary(file);
    setCategoryForm((c) => ({ ...c, imageUrl: url }));
    setLoading(false);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/admin/product`,
      productForm,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Product added");
    setProductForm({
      name: "",
      price: "",
      quantity: "",
      categoryName: "",
      categoryId: "",
      imageUrl: "",
    });
    fetchProducts();
    setLoading(false);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/admin/category`,
      categoryForm,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Category added");
    setCategoryForm({ name: "", imageUrl: "" });
    fetchCategories();
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      PAID: { 
        bg: 'bg-green-100', 
        text: 'text-green-700', 
        border: 'border-green-200',
        icon: <CheckCircle className="w-4 h-4" />
      },
      CREATED: { 
        bg: 'bg-orange-100', 
        text: 'text-orange-700', 
        border: 'border-orange-200',
        icon: <Clock className="w-4 h-4" />
      },
      PENDING: { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-700', 
        border: 'border-yellow-200',
        icon: <Clock className="w-4 h-4" />
      }
    };

    const config = statusConfig[status] || statusConfig.CREATED;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  const calculateOrderStats = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const paidOrders = orders.filter(order => order.paymentStatus === 'PAID').length;
    const pendingOrders = orders.filter(order => order.paymentStatus !== 'PAID').length;

    return { totalRevenue, paidOrders, pendingOrders, totalOrders: orders.length };
  };

  const stats = calculateOrderStats();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-[280px] bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 fixed h-full shadow-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {[
            { id: "products", label: "Products", icon: <Package className="w-5 h-5" /> },
            { id: "categories", label: "Categories", icon: <FolderTree className="w-5 h-5" /> },
            { id: "orders", label: "Orders", icon: <ShoppingCart className="w-5 h-5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id 
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" 
                  : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-[280px] flex-1 p-8">
        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Products Management</h2>
              <p className="text-slate-600">Add and manage your products</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Add Product Form */}
              <form
                onSubmit={handleProductSubmit}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Add New Product</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Product Name
                    </label>
                    <input
                      placeholder="Enter product name"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({ ...productForm, price: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={productForm.quantity}
                        onChange={(e) =>
                          setProductForm({ ...productForm, quantity: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category
                    </label>
                    <select
  value={productForm.categoryId}
  onChange={(e) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find(
      (c) => c.id === Number(selectedId)
    );

    setProductForm({
      ...productForm,
      categoryId: selectedId,
      categoryName: selectedCategory?.name || "",
    });
  }}
  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white"
  required
>
  <option value="">Select a category</option>
  {categories.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>

                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Product Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProductImageUpload(e.target.files[0])}
                        className="hidden"
                        id="product-image"
                      />
                      <label
                        htmlFor="product-image"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        <Upload className="w-5 h-5" />
                        <span className="font-medium">Upload Image</span>
                      </label>
                    </div>

                    {productForm.imageUrl && (
                      <div className="mt-4">
                        <img
                          src={productForm.imageUrl}
                          alt="preview"
                          className="w-full h-48 rounded-lg object-cover border border-slate-200"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 px-4 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Adding Product..." : "Add Product"}
                  </button>
                </div>
              </form>

              {/* Products List */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">All Products ({products.length})</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-orange-500 transition-colors">
                      <img
                        src={product.imageUrl || 'https://via.placeholder.com/80'}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{product.name}</h4>
                        <p className="text-sm text-slate-600">{product.categoryName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">${product.price}</p>
                        <p className="text-xs text-slate-500">Qty: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Categories Management</h2>
              <p className="text-slate-600">Add and manage product categories</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Add Category Form */}
              <form
                onSubmit={handleCategorySubmit}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Add New Category</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category Name
                    </label>
                    <input
                      placeholder="Enter category name"
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({ ...categoryForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCategoryImageUpload(e.target.files[0])}
                        className="hidden"
                        id="category-image"
                      />
                      <label
                        htmlFor="category-image"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        <Upload className="w-5 h-5" />
                        <span className="font-medium">Upload Image</span>
                      </label>
                    </div>

                    {categoryForm.imageUrl && (
                      <div className="mt-4">
                        <img
                          src={categoryForm.imageUrl}
                          alt="preview"
                          className="w-full h-48 rounded-lg object-cover border border-slate-200"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 px-4 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Adding Category..." : "Add Category"}
                  </button>
                </div>
              </form>

              {/* Categories List */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">All Categories ({categories.length})</h3>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="border border-slate-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                      <img
                        src={category.imageUrl || 'https://via.placeholder.com/150'}
                        alt={category.name}
                        className="w-full h-32 rounded-lg object-cover mb-3"
                      />
                      <h4 className="font-semibold text-slate-900 text-center">{category.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Orders Management</h2>
              <p className="text-slate-600">View and manage all customer orders</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-100 text-sm font-medium">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-orange-200" />
                </div>
                <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Total Orders</span>
                  <ShoppingCart className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-3xl font-bold text-slate-900">{stats.totalOrders}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Paid Orders</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-green-600">{stats.paidOrders}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Pending Orders</span>
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">#{order.id}</p>
                            <p className="text-xs text-slate-500">{order.razorpayOrderId}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {formatDate(order.orderDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-900">User #{order.userId}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-sm">
                                <p className="font-medium text-slate-900">{item.productName}</p>
                                <p className="text-xs text-slate-500">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-lg font-bold text-slate-900">
                            ${order.totalAmount.toFixed(2)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {getPaymentStatusBadge(order.paymentStatus)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {orders.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">No orders found</p>
                  <p className="text-slate-500 text-sm">Orders will appear here once customers make purchases</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;