package com.gichungasoftwares.ServiceHub.dto;

import com.gichungasoftwares.ServiceHub.entity.Booking;
import com.gichungasoftwares.ServiceHub.entity.ProviderService;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProviderServiceDto {

    private Long id;
    private String serviceName;
    private String description;
    private BigDecimal price;
    private Long providerId;
    private Long categoryId;
    private List<BookingDto> bookings;
}
