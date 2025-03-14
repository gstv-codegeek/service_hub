package com.gichungasoftwares.ServiceHub.repository;

import com.gichungasoftwares.ServiceHub.entity.Booking;
import com.gichungasoftwares.ServiceHub.entity.ProviderService;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByCustomerAndProviderService(User customer, ProviderService service);
}
