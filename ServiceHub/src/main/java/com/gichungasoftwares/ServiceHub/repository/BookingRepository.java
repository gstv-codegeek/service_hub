package com.gichungasoftwares.ServiceHub.repository;

import com.gichungasoftwares.ServiceHub.dto.BookingDto;
import com.gichungasoftwares.ServiceHub.entity.Booking;
import com.gichungasoftwares.ServiceHub.entity.ProviderService;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByCustomerAndProviderServiceAndBookingStatusIn(User customer, ProviderService service, List<BookingStatus> statuses);

    List<Booking> findAllByCustomer(User existingCustomer);

    List<Booking> findAllByProvider(User existingProvider);
}
