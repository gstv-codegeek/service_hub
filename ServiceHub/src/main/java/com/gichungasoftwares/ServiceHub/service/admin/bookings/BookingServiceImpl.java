package com.gichungasoftwares.ServiceHub.service.admin.bookings;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.entity.Booking;
import com.gichungasoftwares.ServiceHub.entity.Notification;
import com.gichungasoftwares.ServiceHub.entity.ProviderService;
import com.gichungasoftwares.ServiceHub.entity.user.Customer;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.enums.BookingStatus;
import com.gichungasoftwares.ServiceHub.repository.BookingRepository;
import com.gichungasoftwares.ServiceHub.repository.ServiceRepository;
import com.gichungasoftwares.ServiceHub.repository.UserRepository;
import com.gichungasoftwares.ServiceHub.service.admin.notification.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final NotificationService notificationService;
    private static final Logger logger = LoggerFactory.getLogger(BookingServiceImpl.class);

    @Override
    @Transactional
    public boolean bookAService(BookingDto bookingDto) {
        logger.info("Booking service: Incoming DTO {} ", bookingDto);
        User customer = userRepository.findById(bookingDto.getCustomerId())
                .orElseThrow(() -> new UsernameNotFoundException("Customer not found with id " + bookingDto.getCustomerId()));

        ProviderService service = serviceRepository.findById(bookingDto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service does not exist"));

        // Prevent double booking
        Optional<Booking> existingBooking = bookingRepository.findByCustomerAndProviderServiceAndBookingStatusIn(customer, service, Arrays.asList(BookingStatus.Pending, BookingStatus.Rejected));
        if (existingBooking.isPresent()) {
            logger.error("Booking by customer with id: {} for service with id {} exists. ", customer.getId(), service.getId());
            return false;
        }
        // if customer of service booking is non-existent
        if (customer == null || service == null) {
            logger.error("Provided Customer or Service does not exist");
            return false;
        }
        try {
            Booking booking = new Booking();
            booking.setBookingDate(LocalDateTime.now());
            booking.setServiceDate(bookingDto.getServiceDate());
            booking.setBookingStatus(BookingStatus.Pending);
            booking.setCustomer((Customer) customer);
            booking.setProviderService(service);
            Booking createdBooking = bookingRepository.save(booking);
            //Send Notification
            String message = String.format(
                    "Hello %s,\n\nYour booking for %s with %s on %s has been received and is awaiting verification.\n\nStatus: Pending Verification\n\nYou will be notified once it is approved.\n\nThank you for choosing ServiceHub!",
                    customer.getFullName(), createdBooking.getProviderService().getServiceName(),
                    createdBooking.getProviderService().getProvider().getBusinessName(),
                    createdBooking.getServiceDate()
            );
            notificationService.saveNotification(customer, "Booking Received", message, false);
            logger.info("Service with id : {} was booked successfully. Booking id : {}", service.getId(), createdBooking.getId());
            return true;
        } catch (DataAccessException e) {
            logger.error("Database access error while booking service", e);
            return false;
        } catch (Exception e) {
            logger.error("Something went wrong", e);
            return false;
        }
    }

    @Override
    public List<BookingDto> getAllBookings() {
        logger.info("Getting all bookings");
        return bookingRepository.findAll().stream().map(Booking::toBookingDto).collect(Collectors.toList());
    }

    @Override
    public BookingDto getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found with id " + id));
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setServiceId(booking.getProviderService().getId());
        bookingDto.setCustomerId(booking.getCustomer().getId());
        bookingDto.setBookingDate(booking.getBookingDate());
        bookingDto.setServiceDate(booking.getServiceDate());
        bookingDto.setBookingStatus(booking.getBookingStatus());
        return bookingDto;
    }

    @Override
    @Transactional
    public boolean changeBookingStatus(Long bookingId, String status) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isPresent()) {
            Booking existingBooking = optionalBooking.get();
            if (Objects.equals(status, "Approve")) {
                existingBooking.setBookingStatus(BookingStatus.Approved);
                //Send Notification
                String message = String.format(
                        "Hello %s,\n\nYour booking for %s with %s on %s has been verified.\n\nStatus: Verified\n\nYou will be contacted by the service provider.\n\nThank you for choosing ServiceHub!",
                        existingBooking.getCustomer().getFullName(), existingBooking.getProviderService().getServiceName(),
                        existingBooking.getProviderService().getProvider().getBusinessName(),
                        existingBooking.getServiceDate()
                );
                notificationService.saveNotification(existingBooking.getCustomer(), "Booking Approval", message, false);
            } else {
                existingBooking.setBookingStatus(BookingStatus.Rejected);
                //Send Notification
                String message = String.format(
                        "Hello %s,\n\nYour booking for %s with %s on %s has been rejected.\n\nStatus: Rejected.\n\nThank you for choosing ServiceHub!",
                        existingBooking.getCustomer().getFullName(), existingBooking.getProviderService().getServiceName(),
                        existingBooking.getProviderService().getProvider().getBusinessName(),
                        existingBooking.getServiceDate()
                );
                notificationService.saveNotification(existingBooking.getCustomer(), "Booking Approval", message, false);
            }
            bookingRepository.save(existingBooking);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteBooking(Long id) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isPresent()) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
