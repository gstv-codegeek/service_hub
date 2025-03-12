package com.gichungasoftwares.ServiceHub.service.admin.bookings;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;

import java.util.List;

public interface BookingService {
    boolean bookAService(BookingDto bookingDto);
    List<BookingDto> getAllBookings();
}
