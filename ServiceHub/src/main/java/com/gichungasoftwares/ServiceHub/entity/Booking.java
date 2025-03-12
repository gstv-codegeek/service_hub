package com.gichungasoftwares.ServiceHub.entity;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.entity.user.Customer;
import com.gichungasoftwares.ServiceHub.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "provider_service_id")
    private ProviderService providerService;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private LocalDateTime bookingDate;

    private BookingStatus bookingStatus;

    public BookingDto toBookingDto() {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(id);
        bookingDto.setServiceId(providerService.getId());
        bookingDto.setCustomerId(customer.getId());
        bookingDto.setBookingStatus(bookingStatus);
        bookingDto.setBookingDate(bookingDate);
        return bookingDto;
    }
}
