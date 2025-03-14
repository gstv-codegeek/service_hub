package com.gichungasoftwares.ServiceHub.service.admin.bookings;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;

import java.util.List;

public interface BookingService {
    boolean bookAService(BookingDto bookingDto);
    List<BookingDto> getAllBookings();
    BookingDto getBookingById(Long id);
    boolean changeBookingStatus(Long bookingId, String status);
    boolean deleteBooking(Long id);
}
