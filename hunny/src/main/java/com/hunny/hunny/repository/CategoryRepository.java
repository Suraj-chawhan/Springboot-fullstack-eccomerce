package com.hunny.hunny.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hunny.hunny.Entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}

