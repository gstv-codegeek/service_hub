package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.service.admin.bookings.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/service/book")
    public ResponseEntity<?> bookAService(@RequestBody BookingDto bookingDto) {
        boolean success = bookingService.bookAService(bookingDto);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }


    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}
