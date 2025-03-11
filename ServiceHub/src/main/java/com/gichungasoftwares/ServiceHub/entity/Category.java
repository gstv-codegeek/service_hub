package com.gichungasoftwares.ServiceHub.entity;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String categoryName;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProviderService> providerServices = new ArrayList<>();

    public CategoryDto getCategoryDto() {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryName(categoryName);
        categoryDto.setId(id);
        categoryDto.setServices(providerServices.stream().map(ProviderService::getServiceName).collect(Collectors.toList()));
        return categoryDto;
    }
}
