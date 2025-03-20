package com.gichungasoftwares.ServiceHub.service.admin.bookings;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface BookingService {
    boolean bookAService(BookingDto bookingDto, Authentication connectedUser);
    List<BookingDto> getAllBookings();
    BookingDto getBookingById(Long id);
    boolean changeBookingStatus(Long bookingId, String status, Authentication connectedUser);
    boolean deleteBooking(Long id, Authentication connectedUser);
    List<BookingDto> getCustomerBookings(Long id);
}
