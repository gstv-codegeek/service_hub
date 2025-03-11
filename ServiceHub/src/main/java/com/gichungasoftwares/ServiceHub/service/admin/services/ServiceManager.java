package com.gichungasoftwares.ServiceHub.service.admin.services;

import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;

import java.util.List;

public interface ServiceManager {
    boolean createService(ProviderServiceDto providerServiceDto);
    List<ProviderServiceDto> getAllServices();


}
