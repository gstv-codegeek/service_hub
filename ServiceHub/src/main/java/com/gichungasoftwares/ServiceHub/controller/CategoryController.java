package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import com.gichungasoftwares.ServiceHub.service.admin.categories.CategoryService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final CategoryService categoryService;
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@RequestBody CategoryDto categoryDto) {
        logger.info("Creating category, Incoming Dto: {}", categoryDto);
        boolean success = categoryService.postCategory(categoryDto);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Category created Successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category could not be created");
    }
}
