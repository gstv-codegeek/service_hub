package com.gichungasoftwares.ServiceHub.entity.user;

import com.gichungasoftwares.ServiceHub.entity.Service;
import com.gichungasoftwares.ServiceHub.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@DiscriminatorValue("SERVICE_PROVIDER")
public class ServiceProvider extends User{

    private String businessName;

    @OneToMany(mappedBy = "serviceProvider")
    private List<Service> services;
}
