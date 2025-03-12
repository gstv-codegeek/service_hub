package com.gichungasoftwares.ServiceHub.repository;

import com.gichungasoftwares.ServiceHub.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}
