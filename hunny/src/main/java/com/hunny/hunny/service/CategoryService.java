package com.hunny.hunny.service;

import java.util.List;
import com.hunny.hunny.dto.CategoryDTO;

public interface CategoryService {
    String addCategory(CategoryDTO dto);
    String updateCategory(Long id, CategoryDTO dto);
    String deleteCategory(Long id);
    List<CategoryDTO> getAllCategories();
}
