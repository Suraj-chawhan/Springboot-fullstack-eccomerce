package com.hunny.hunny.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hunny.hunny.dto.CategoryDTO;
import com.hunny.hunny.dto.ProductDTO;
import com.hunny.hunny.dto.OrderDTO;
import com.hunny.hunny.dto.PaymentVerificationDTO;
import com.hunny.hunny.service.CategoryService;
import com.hunny.hunny.service.ProductService;
import com.hunny.hunny.service.OrderService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MainController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/admin/category")
    public String addCategory(@RequestBody CategoryDTO dto) {
        return categoryService.addCategory(dto);
    }

    @PutMapping("/admin/category/{id}")
    public String updateCategory(@PathVariable Long id, @RequestBody CategoryDTO dto) {
        return categoryService.updateCategory(id, dto);
    }

    @DeleteMapping("/admin/category/{id}")
    public String deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }

    @GetMapping("/admin/categories")
    public List<CategoryDTO> getAllCategoriesAdmin() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/admin/product")
    public String addProduct(@RequestBody ProductDTO dto) {
        return productService.addProduct(dto);
    }

    @PutMapping("/admin/product/{id}")
    public String updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        return productService.updateProduct(id, dto);
    }

    @DeleteMapping("/admin/product/{id}")
    public String deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/admin/products")
    public List<ProductDTO> getAllProductsAdmin() {
        return productService.getAllProducts();
    }

    @GetMapping("/admin/orders")
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/user/categories")
    public List<CategoryDTO> getAllCategoriesUser() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/user/products")
    public List<ProductDTO> getAllProductsUser() {
        return productService.getAllProducts();
    }

    @GetMapping("/user/product/{id}")
    public ProductDTO getSingleProductsUser(@PathVariable Long id) {
        return productService.getSingleProducts(id);
    }

    @GetMapping("/user/category/{categoryId}/products")
    public List<ProductDTO> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }

    @GetMapping("/user/orders/{userId}")
    public List<OrderDTO> getUserOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }

    @PostMapping("/place")
    public ResponseEntity<OrderDTO> placeOrder(@RequestBody OrderDTO dto) {
        return ResponseEntity.ok(orderService.placeOrder(dto));
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody PaymentVerificationDTO dto) {
        orderService.verifyPayment(dto);
        return ResponseEntity.ok("Payment verified");
    }
}
