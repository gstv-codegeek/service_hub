package com.gichungasoftwares.ServiceHub.entity;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;
import com.gichungasoftwares.ServiceHub.entity.user.Provider;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table( name = "provider_services",
        uniqueConstraints = @UniqueConstraint(columnNames = {"service_name", "service_provider_id", "category_id"})
)
public class ProviderService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;
    private String description;
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "providerService", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>();

    public ProviderServiceDto getServiceDto() {
        ProviderServiceDto providerServiceDto = new ProviderServiceDto();
        providerServiceDto.setId(id);
        providerServiceDto.setServiceName(serviceName);
        providerServiceDto.setPrice(price);
        providerServiceDto.setProviderId(provider.getId());
        providerServiceDto.setCategoryId(category.getId());
        providerServiceDto.setDescription(description);
        providerServiceDto.setBookings(bookings.stream().map(Booking::toBookingDto).collect(Collectors.toList()));
        return providerServiceDto;
    }
}
