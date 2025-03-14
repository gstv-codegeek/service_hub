package com.gichungasoftwares.ServiceHub.service.admin.categories;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import com.gichungasoftwares.ServiceHub.entity.Category;
import com.gichungasoftwares.ServiceHub.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    @Override
    public boolean postCategory(CategoryDto categoryDto) {
        Optional<Category> existingCategory = categoryRepository.findByCategoryName(categoryDto.getCategoryName());
        if (existingCategory.isPresent()) {
            System.out.println("This category exists");
            return false;
        }
        try {
            Category category = new Category();
            category.setCategoryName(categoryDto.getCategoryName());
            categoryRepository.save(category);
            return true;
        } catch (DataAccessException e) {
            System.err.println("Error saving category: " + e.getMessage());
            return false;
        }catch (Exception e) {
            System.err.println("Error occurred :" + e.getMessage());
            return false;
        }
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream().map(Category::getCategoryDto).collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found with id : " + id));
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setCategoryName(category.getCategoryName());
        categoryDto.setServices(category.getCategoryDto().getServices());
        return categoryDto;
    }

    @Override
    public boolean updateCategory(Long id, CategoryDto categoryDto) {
        return false;
    }

    @Override
    public void deleteCategory(Long id) {

    }
}
