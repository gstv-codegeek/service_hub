package com.gichungasoftwares.ServiceHub.service.admin.services;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ServiceManager {
    boolean createService(ProviderServiceDto providerServiceDto, Authentication connectedUser);
    List<ProviderServiceDto> getAllServices();
    ProviderServiceDto getServiceById(Long id);
    boolean updateService(Long id, ProviderServiceDto providerServiceDto, Authentication connectedUser);
    void deleteService(Long id, Authentication connectedUser);

}
