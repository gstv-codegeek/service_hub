package com.gichungasoftwares.ServiceHub.service.admin.categories;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    boolean postCategory(CategoryDto categoryDto);
    List<CategoryDto> getAllCategories();
    void deleteCategory(Long id);
    CategoryDto getCategoryById(Long id);
    boolean updateCategory(Long id, CategoryDto categoryDto);
}
