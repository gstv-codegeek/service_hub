package com.gichungasoftwares.ServiceHub.entity;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.entity.user.Customer;
import com.gichungasoftwares.ServiceHub.entity.user.Provider;
import com.gichungasoftwares.ServiceHub.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;

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

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;

    private ZonedDateTime bookingDate;

    private ZonedDateTime serviceDate;

    private BookingStatus bookingStatus;

    public BookingDto toBookingDto() {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(id);
        bookingDto.setServiceId(providerService.getId());
        bookingDto.setCustomerId(customer.getId());
        bookingDto.setProviderId(providerService.getProvider().getId());
        bookingDto.setBookingStatus(bookingStatus);
        bookingDto.setBookingDate(bookingDate);
        bookingDto.setServiceDate(serviceDate);
        return bookingDto;
    }
}
