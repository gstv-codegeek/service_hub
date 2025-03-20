package com.gichungasoftwares.ServiceHub.entity.user;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.Booking;
import com.gichungasoftwares.ServiceHub.entity.ProviderService;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@DiscriminatorValue("SERVICE_PROVIDER")
public class Provider extends User{

    private String businessName;

    @OneToMany(mappedBy = "provider")
    private List<ProviderService> services;

    @OneToMany(mappedBy = "provider")
    private List<Booking> bookings;
}
