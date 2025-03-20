package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;
import com.gichungasoftwares.ServiceHub.service.admin.categories.CategoryService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class CategoryController {

    private final CategoryService categoryService;
    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@RequestBody CategoryDto categoryDto, Authentication connectedUser) {
        logger.info("Creating category, Incoming Dto: {}", categoryDto);
        boolean success = categoryService.postCategory(categoryDto, connectedUser);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        logger.info("Getting all categories");
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        logger.info("Getting category with id: {}", id);
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PutMapping("/category/{id}/update")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto, Authentication connectedUser) {
        if (categoryService.updateCategory(id, categoryDto, connectedUser)) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/category/{id}/delete")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id, Authentication connectedUser) {
        categoryService.deleteCategory(id, connectedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
