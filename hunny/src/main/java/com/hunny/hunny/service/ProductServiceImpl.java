package com.hunny.hunny.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hunny.hunny.Entity.Category;
import com.hunny.hunny.Entity.Product;
import com.hunny.hunny.dto.ProductDTO;
import com.hunny.hunny.repository.CategoryRepository;
import com.hunny.hunny.repository.ProductRepository;


@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public String addProduct(ProductDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found"));

        Product p = new Product();
        p.setName(dto.getName());
        p.setPrice(dto.getPrice());
        p.setQuantity(dto.getQuantity());
        p.setImageUrl(dto.getImageUrl());
        p.setCategory(category);

        productRepository.save(p);
        return "Product added";
    }

    @Override
    public String updateProduct(Long id, ProductDTO dto) {
        Product p = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        p.setName(dto.getName());
        p.setPrice(dto.getPrice());
        p.setQuantity(dto.getQuantity());
        p.setImageUrl(dto.getImageUrl());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            p.setCategory(category);
        }

        productRepository.save(p);
        return "Product updated";
    }

    @Override
    public String deleteProduct(Long id) {
        productRepository.deleteById(id);
        return "Product deleted";
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
            .map(p -> new ProductDTO(
                p.getId(),
                p.getName(),
                p.getPrice(),
                p.getQuantity(),
                p.getImageUrl(),
                p.getCategory().getId(),
                p.getCategory().getName()
            )).toList();
    }

    
@Override
public ProductDTO getSingleProducts(Long id) {

    Product p = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

    return new ProductDTO(
            p.getId(),
            p.getName(),
            p.getPrice(),
            p.getQuantity(),
            p.getImageUrl(),
            p.getCategory().getId(),
            p.getCategory().getName()
    );
}


    @Override
    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId).stream()
            .map(p -> new ProductDTO(
                p.getId(),
                p.getName(),
                p.getPrice(),
                p.getQuantity(),
                p.getImageUrl(),
                p.getCategory().getId(),
                p.getCategory().getName()
            )).toList();
    }
}
