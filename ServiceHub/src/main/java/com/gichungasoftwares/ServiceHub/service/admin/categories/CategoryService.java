package com.gichungasoftwares.ServiceHub.service.admin.categories;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    boolean postCategory(CategoryDto categoryDto);
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(Long id);
    boolean updateCategory(Long id, CategoryDto categoryDto);
    void deleteCategory(Long id);
}
