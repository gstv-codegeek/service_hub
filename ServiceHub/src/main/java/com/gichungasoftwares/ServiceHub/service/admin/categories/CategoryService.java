package com.gichungasoftwares.ServiceHub.service.admin.categories;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CategoryService {
    boolean postCategory(CategoryDto categoryDto, Authentication connectedUser);
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(Long id);
    boolean updateCategory(Long id, CategoryDto categoryDto, Authentication connectedUser);
    void deleteCategory(Long id, Authentication connectedUser);
}
