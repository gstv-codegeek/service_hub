package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.service.admin.bookings.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/service/book")
    public ResponseEntity<?> bookAService(@RequestBody BookingDto bookingDto, Authentication connectedUser) {
        boolean success = bookingService.bookAService(bookingDto, connectedUser);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/bookings/provider/{id}")
    public ResponseEntity<?> getProviderBookings(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getProviderBookings(id));
    }

    @GetMapping("/booking/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping("/booking/{id}/{status}")
    public ResponseEntity<?> changeBookingStatus(@PathVariable Long id, @PathVariable String status, Authentication connectedUser) {
        boolean success = bookingService.changeBookingStatus(id, status, connectedUser);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
    }

    @DeleteMapping("/booking/delete/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id, Authentication connectedUser) {
        boolean success = bookingService.deleteBooking(id, connectedUser);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
    }

    @GetMapping("/bookings/customer/{id}")
    public ResponseEntity<?> getCustomerBookings(@PathVariable("id") Long id) {
        return ResponseEntity.ok(bookingService.getCustomerBookings(id));
    }

}
