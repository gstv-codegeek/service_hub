package com.gichungasoftwares.ServiceHub.service.admin.services;

import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;
import com.gichungasoftwares.ServiceHub.entity.Category;
import com.gichungasoftwares.ServiceHub.entity.ProviderService;
import com.gichungasoftwares.ServiceHub.entity.user.Provider;
import com.gichungasoftwares.ServiceHub.repository.CategoryRepository;
import com.gichungasoftwares.ServiceHub.repository.ProviderRepository;
import com.gichungasoftwares.ServiceHub.repository.ServiceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceManagerImpl implements ServiceManager {

    private final ServiceRepository serviceRepository;
    private final CategoryRepository categoryRepository;
    private final ProviderRepository providerRepository;
    private static final Logger logger = LoggerFactory.getLogger(ServiceManagerImpl.class);

    @Override
    @Transactional
    public boolean createService(ProviderServiceDto providerServiceDto) {
        logger.info("bl-creating service {}", providerServiceDto);

        Category category = categoryRepository.findById(providerServiceDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        logger.info("Category {}", category);
        Provider provider = providerRepository.findById(providerServiceDto.getProviderId())
                .orElseThrow(() -> new RuntimeException("Service Provider not found"));

        // prevent duplicate services by a provider under the same category
        Optional<ProviderService> existingService = serviceRepository.findByServiceNameAndProviderAndCategory(
                providerServiceDto.getServiceName(),
                provider,
                category);

        if (existingService.isPresent()) {
            logger.warn("Service already exists for this provider under the same category");
            return false;
        }
        try {
            ProviderService providerService = new ProviderService();
            providerService.setServiceName(providerServiceDto.getServiceName());
            providerService.setDescription(providerServiceDto.getDescription());
            providerService.setPrice(providerServiceDto.getPrice());
            providerService.setProvider(provider);
            providerService.setCategory(category);
            ProviderService createdProviderService = serviceRepository.save(providerService);

            logger.info("Service '{}' successfully created for provider {}", createdProviderService.getServiceName(), createdProviderService.getProvider());
            return true;
        } catch (DataAccessException e) {
            logger.error("Database access error while creating service", e);
            return false;
        } catch (Exception e) {
            logger.error("Something went wrong", e);
            return false;
        }
    }

    @Override
    public List<ProviderServiceDto> getAllServices() {
        return serviceRepository.findAll().stream().map(ProviderService::getServiceDto).collect(Collectors.toList());
    }
}
