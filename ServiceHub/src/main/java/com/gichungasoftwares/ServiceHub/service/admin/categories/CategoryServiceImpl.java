package com.gichungasoftwares.ServiceHub.service.admin.categories;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import com.gichungasoftwares.ServiceHub.entity.Category;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.repository.CategoryRepository;
import com.gichungasoftwares.ServiceHub.service.admin.audit.AuditControlService;
import com.gichungasoftwares.ServiceHub.service.admin.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final AuditControlService auditControlService;
    private final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    @Override
    public boolean postCategory(CategoryDto categoryDto, Authentication connectedUser) {
        Optional<Category> existingCategory = categoryRepository.findByCategoryName(categoryDto.getCategoryName());
        if (existingCategory.isPresent()) {
            System.out.println("This category exists");
            return false;
        }
        try {
            Category category = new Category();
            category.setCategoryName(categoryDto.getCategoryName());
            Category createdCategory = categoryRepository.save(category);
            //Log Action
            auditControlService.logAction("Category Created", connectedUser.getName(), "Category: " + createdCategory.getCategoryName());
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
    public boolean updateCategory(Long id, CategoryDto categoryDto, Authentication connectedUser) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            var existingCategory = optionalCategory.get();
            existingCategory.setCategoryName(categoryDto.getCategoryName());
            categoryRepository.save(existingCategory);
            //Log Action
            auditControlService.logAction("Category Updated", connectedUser.getName(), "Category ID: " + id);

            logger.info("Category updated successfully. ID: {}", id);
            return true;
        }
        return false;
    }

    @Override
    public void deleteCategory(Long id, Authentication connectedUser) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            categoryRepository.deleteById(id);
            //Log Action
            auditControlService.logAction("Category Deleted", connectedUser.getName(), "Category ID: " + optionalCategory.get().getId());
            logger.info("Category deleted successfully");
        }
    }
}
