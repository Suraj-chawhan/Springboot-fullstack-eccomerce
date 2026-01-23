package com.hunny.hunny.service;

import java.util.List;



import com.hunny.hunny.dto.ProductDTO;

public interface ProductService {
    String addProduct(ProductDTO dto);
    String updateProduct(Long id, ProductDTO dto);
    String deleteProduct(Long id);
    List<ProductDTO> getAllProducts();
    List<ProductDTO> getProductsByCategory(Long categoryId);
    ProductDTO getSingleProducts(Long id);
}
