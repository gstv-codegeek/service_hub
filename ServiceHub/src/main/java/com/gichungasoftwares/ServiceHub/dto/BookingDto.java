package com.gichungasoftwares.ServiceHub.dto;

import com.gichungasoftwares.ServiceHub.enums.BookingStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingDto {
    private Long id;
    private Long serviceId;
    private Long customerId;
    private LocalDateTime bookingDate;
    private LocalDateTime serviceDate;
    private BookingStatus bookingStatus;
}
