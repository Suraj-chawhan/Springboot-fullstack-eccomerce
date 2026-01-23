package com.hunny.hunny.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ui")
public class UiController {

    @GetMapping("/home")
    public String home(){
        return """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food Delivery App</title>
    <style>
        /* ===== Global ===== */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            background: #f8f8f8;
        }
        header {
            background: #ff4d4d;
            color: white;
            padding: 15px;
            text-align: center;
        }
        h2 {
            margin: 0;
        }
        button {
            cursor: pointer;
        }
        /* ===== Auth ===== */
        #authContainer {
            max-width: 400px;
            margin: 30px auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        /* ===== Main App ===== */
        #appContainer {
            display: none;
            max-width: 1200px;
            margin: 20px auto;
        }
        #categories, #products, #cart {
            margin-bottom: 30px;
        }
        .category, .product, .cart-item {
            background: white;
            padding: 10px;
            margin: 10px;
            border-radius: 10px;
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
            display: inline-block;
            vertical-align: top;
        }
        .product img {
            width: 150px;
            height: 120px;
            object-fit: cover;
            border-radius: 10px;
        }
        .product button {
            background: #ff4d4d;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            margin-top: 5px;
        }
        #cart {
            background: white;
            padding: 15px;
            border-radius: 10px;
        }
        #cart h3 {
            margin-top: 0;
        }
        #logoutBtn {
            float: right;
            background: white;
            color: #ff4d4d;
            border: 1px solid #ff4d4d;
            padding: 5px 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <header>
        <h2>Food Delivery App</h2>
        <button id="logoutBtn" style="display:none;">Logout</button>
    </header>

    <!-- ===== AUTH ===== -->
    <div id="authContainer">
        <h3 id="authTitle">Login</h3>
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <input type="text" id="name" placeholder="Name (Signup Only)" style="display:none;">
        <button id="authBtn">Login</button>
        <p id="toggleAuth" style="cursor:pointer;color:#ff4d4d;margin-top:10px;">Switch to Signup</p>
        <p id="authMsg" style="color:red;"></p>
    </div>

    <!-- ===== APP ===== -->
    <div id="appContainer">
        <div id="categories"></div>
        <div id="products"></div>
        <div id="cart">
            <h3>Cart</h3>
            <div id="cartItems"></div>
            <h4>Total: ₹<span id="cartTotal">0</span></h4>
            <button id="checkoutBtn">Checkout with Razorpay</button>
        </div>
    </div>

    <!-- Razorpay Script -->
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

    <script>
        const API_BASE = "http://localhost:8080";
        let token = localStorage.getItem("jwtToken");
        let cart = [];

        // ===== AUTH LOGIC =====
        const authContainer = document.getElementById('authContainer');
        const appContainer = document.getElementById('appContainer');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const nameInput = document.getElementById('name');
        const authBtn = document.getElementById('authBtn');
        const toggleAuth = document.getElementById('toggleAuth');
        const authTitle = document.getElementById('authTitle');
        const authMsg = document.getElementById('authMsg');
        const logoutBtn = document.getElementById('logoutBtn');

        let isLogin = true;

        function showApp() {
            authContainer.style.display = 'none';
            appContainer.style.display = 'block';
            logoutBtn.style.display = 'inline-block';
            loadCategories();
            loadProducts();
        }

        if(token) showApp();

        toggleAuth.onclick = () => {
            isLogin = !isLogin;
            nameInput.style.display = isLogin ? 'none' : 'block';
            authTitle.textContent = isLogin ? 'Login' : 'Signup';
            authBtn.textContent = isLogin ? 'Login' : 'Signup';
            authMsg.textContent = '';
        };

        authBtn.onclick = async () => {
            const email = emailInput.value;
            const password = passwordInput.value;
            const name = nameInput.value;

            const url = isLogin ? "/auth/login" : "/auth/register";
            const body = isLogin ? { email, passowrd: password } : { email, passowrd: password, name };

            try {
                const res = await fetch(API_BASE + url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const data = await res.json();
                if(res.ok) {
                    token = data.token;
                    localStorage.setItem("jwtToken", token);
                    showApp();
                } else {
                    authMsg.textContent = data.message || "Error";
                }
            } catch(e) {
                authMsg.textContent = "Server error";
            }
        };

        logoutBtn.onclick = () => {
            localStorage.removeItem("jwtToken");
            token = null;
            authContainer.style.display = 'block';
            appContainer.style.display = 'none';
            logoutBtn.style.display = 'none';
        };

        // ===== CATEGORY LOGIC =====
        async function loadCategories() {
            const res = await fetch(API_BASE + "/api/user/categories", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const categories = await res.json();
            const categoriesDiv = document.getElementById('categories');
            categoriesDiv.innerHTML = '<h3>Categories</h3>';
            categories.forEach(c => {
                const div = document.createElement('div');
                div.className = 'category';
                div.innerHTML = `<strong>${c.name}</strong>`;
                div.onclick = () => loadProducts(c.id);
                categoriesDiv.appendChild(div);
            });
        }

        // ===== PRODUCT LOGIC =====
        async function loadProducts(categoryId=null) {
            let url = categoryId ? `/api/user/category/${categoryId}/products` : "/api/user/products";
            const res = await fetch(API_BASE + url, { headers: { "Authorization": `Bearer ${token}` } });
            const products = await res.json();
            const productsDiv = document.getElementById('products');
            productsDiv.innerHTML = '<h3>Products</h3>';
            products.forEach(p => {
                const div = document.createElement('div');
                div.className = 'product';
                div.innerHTML = `
                    <img src="${p.imageUrl}" alt="${p.name}">
                    <p><strong>${p.name}</strong></p>
                    <p>₹${p.price}</p>
                    <input type="number" min="1" value="1" id="qty-${p.id}" style="width:50px;">
                    <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
                `;
                productsDiv.appendChild(div);
            });
        }

        // ===== CART LOGIC =====
        function addToCart(id, name, price) {
            const qty = parseInt(document.getElementById(`qty-${id}`).value);
            const existing = cart.find(i => i.id === id);
            if(existing) existing.quantity += qty;
            else cart.push({id, name, price, quantity: qty});
            renderCart();
        }

        function renderCart() {
            const cartDiv = document.getElementById('cartItems');
            cartDiv.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`;
                cartDiv.appendChild(div);
            });
            document.getElementById('cartTotal').textContent = total;
        }

        // ===== RAZORPAY PAYMENT =====
        document.getElementById('checkoutBtn').onclick = async () => {
            if(cart.length === 0) return alert("Cart is empty!");

            const orderData = {
                userId: 1, // replace with actual logged in userId
                items: cart.map(i => ({ productId: i.id, quantity: i.quantity })),
                totalAmount: cart.reduce((acc,i)=>acc+i.price*i.quantity,0)
            };

            const res = await fetch(API_BASE + "/api/place", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });
            const order = await res.json();

            const options = {
                key: "YOUR_RAZORPAY_KEY", // Replace with your key
                amount: order.totalAmount * 100,
                currency: "INR",
                name: "Food Delivery App",
                order_id: order.razorpayOrderId,
                handler: async function(response) {
                    await fetch(API_BASE + "/api/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ razorpayPaymentId: response.razorpay_payment_id, razorpayOrderId: response.razorpay_order_id, razorpaySignature: response.razorpay_signature })
                    });
                    alert("Payment successful!");
                    cart = [];
                    renderCart();
                }
            };
            const rzp = new Razorpay(options);
            rzp.open();
        }
    </script>
</body>
</html>




        """;
    }
}

