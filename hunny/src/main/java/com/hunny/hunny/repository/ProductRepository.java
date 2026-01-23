package com.hunny.hunny.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hunny.hunny.Entity.Product;


public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product> findByCategory_Id(Long categoryId);
    
}
