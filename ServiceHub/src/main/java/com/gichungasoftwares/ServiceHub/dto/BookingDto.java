package com.gichungasoftwares.ServiceHub.dto;

import com.gichungasoftwares.ServiceHub.enums.BookingStatus;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class BookingDto {
    private Long id;
    private Long serviceId;
    private Long customerId;
    private ZonedDateTime bookingDate;
    private ZonedDateTime serviceDate;
    private BookingStatus bookingStatus;
}
