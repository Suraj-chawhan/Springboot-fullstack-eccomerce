package com.hunny.hunny.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hunny.hunny.Entity.Category;
import com.hunny.hunny.dto.CategoryDTO;
import com.hunny.hunny.repository.CategoryRepository;

@Service

public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public String addCategory(CategoryDTO dto) {
        Category c = new Category();
        c.setName(dto.getName());
        c.setImageUrl(dto.getImageUrl());
        categoryRepository.save(c);
        return "Category added";
    }

    @Override
    public String updateCategory(Long id, CategoryDTO dto) {
        Category c = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found"));
        c.setName(dto.getName());
        c.setImageUrl(dto.getImageUrl());
        categoryRepository.save(c);
        return "Category updated";
    }

    @Override
    public String deleteCategory(Long id) {
        categoryRepository.deleteById(id);
        return "Category deleted";
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
            .map(c -> new CategoryDTO(c.getId(), c.getName(), c.getImageUrl()))
            .toList();
    }
}

