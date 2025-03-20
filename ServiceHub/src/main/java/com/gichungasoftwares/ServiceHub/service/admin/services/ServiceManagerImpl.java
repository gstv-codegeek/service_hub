package com.gichungasoftwares.ServiceHub.service.admin.services;

import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;
import com.gichungasoftwares.ServiceHub.entity.Category;
import com.gichungasoftwares.ServiceHub.entity.ProviderService;
import com.gichungasoftwares.ServiceHub.entity.user.Provider;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.repository.CategoryRepository;
import com.gichungasoftwares.ServiceHub.repository.ProviderRepository;
import com.gichungasoftwares.ServiceHub.repository.ServiceRepository;
import com.gichungasoftwares.ServiceHub.repository.UserRepository;
import com.gichungasoftwares.ServiceHub.service.admin.audit.AuditControlService;
import com.gichungasoftwares.ServiceHub.service.admin.notification.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceManagerImpl implements ServiceManager {

    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final CategoryRepository categoryRepository;
    private final ProviderRepository providerRepository;
    private final NotificationService notificationService;
    private final AuditControlService auditControlService;
    private static final Logger logger = LoggerFactory.getLogger(ServiceManagerImpl.class);

    @Override
    @Transactional
    public boolean createService(ProviderServiceDto providerServiceDto, Authentication connectedUser) {
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

            //Send Notification
            String message = String.format(
                    "Hello %s,\n\nYou have successfully service %s on %s!",
                    connectedUser.getName(),
                    createdProviderService.getServiceName(),
                    ZonedDateTime.now()
            );
            notificationService.saveNotification((User) connectedUser.getPrincipal(), "Service Creation", message, false);

            //Log Action
            auditControlService.logAction("Service Created", connectedUser.getName(), "Service ID: " + createdProviderService.getId());

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

    @Override
    public List<ProviderServiceDto> getProviderServices(Long id) {
        // confirm provider exists
        Optional<User> optionalProvider = userRepository.findById(id);
        return optionalProvider.map(user -> serviceRepository.findAllByProvider(user).stream().map(ProviderService::getServiceDto).collect(Collectors.toList())).orElse(null);
    }

    @Override
    public ProviderServiceDto getServiceById(Long id) {
        ProviderService providerService = serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found with id " + id));
        ProviderServiceDto providerServiceDto = new ProviderServiceDto();
        providerServiceDto.setId(providerService.getId());
        providerServiceDto.setServiceName(providerService.getServiceName());
        providerServiceDto.setProviderId(providerService.getProvider().getId());
        providerServiceDto.setPrice(providerService.getPrice());
        providerServiceDto.setDescription(providerService.getDescription());
        providerServiceDto.setCategoryId(providerService.getCategory().getId());
        return providerServiceDto;
    }

    @Override
    public boolean updateService(Long id, ProviderServiceDto providerServiceDto, Authentication connectedUser) {
        Optional<ProviderService> optionalProviderService = serviceRepository.findById(id);
        if (optionalProviderService.isPresent()) {
            var existingService = optionalProviderService.get();
            existingService.setServiceName(providerServiceDto.getServiceName());
            existingService.setPrice(providerServiceDto.getPrice());
            existingService.setDescription(providerServiceDto.getDescription());
            Optional<Category> category = categoryRepository.findById(providerServiceDto.getCategoryId());
            category.ifPresent(existingService::setCategory);
            //Log Action
            auditControlService.logAction("Service Updated", connectedUser.getName(), "Service ID: " + existingService.getId());

            logger.info("Service updated successfully. Service ID -  {}", id);
            return true;
        }

        return false;
    }

    @Override
    public void deleteService(Long id, Authentication connectedUser) {
        Optional<ProviderService> optionalProviderService = serviceRepository.findById(id);
        if (optionalProviderService.isPresent()) {
            serviceRepository.deleteById(id);
            // Log Action
            auditControlService.logAction("Service Deleted", connectedUser.getName(), "Service ID: " + id);

            logger.info("Service deleted successfully. Service ID - {}", id);
        }
    }
}
