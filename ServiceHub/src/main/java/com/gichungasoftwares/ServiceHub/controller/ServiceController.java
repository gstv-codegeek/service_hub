package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;
import com.gichungasoftwares.ServiceHub.service.admin.services.ServiceManager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ServiceController {

    private final ServiceManager serviceManager;

    @PostMapping("/service")
    public ResponseEntity<?> createService(@RequestBody ProviderServiceDto providerServiceDto, Authentication connectedUser) {
        boolean success = serviceManager.createService(providerServiceDto, connectedUser);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/services")
    public ResponseEntity<?> getAllServices() {
        return ResponseEntity.ok(serviceManager.getAllServices());
    }

    @GetMapping("/service/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceManager.getServiceById(id));
    }

    @PutMapping("/service/{id}/update")
    public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody ProviderServiceDto providerServiceDto, Authentication connectedUser) {
        if (serviceManager.updateService(id, providerServiceDto, connectedUser)) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/service/{id}/delete")
    public ResponseEntity<Void> deleteService(@PathVariable Long id, Authentication connectedUser) {
        serviceManager.deleteService(id, connectedUser);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
