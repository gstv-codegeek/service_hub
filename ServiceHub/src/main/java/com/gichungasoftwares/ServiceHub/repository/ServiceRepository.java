package com.gichungasoftwares.ServiceHub.repository;

import com.gichungasoftwares.ServiceHub.entity.Category;
import com.gichungasoftwares.ServiceHub.entity.ProviderService;
import com.gichungasoftwares.ServiceHub.entity.user.Provider;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<ProviderService, Long> {
    Optional<ProviderService> findByServiceNameAndProviderAndCategory(
            String serviceName,
            Provider provider,
            Category category);

    List<ProviderService> findAllByProvider(User user);

    @Query("SELECT s FROM ProviderService s WHERE NOT EXISTS " +
            "(SELECT b FROM Booking b WHERE b.providerService.id = s.id AND b.customer.id = :customerId)")
    List<ProviderService> findUnbookedServicesByCustomer(@Param("customerId") Long customerId);
}
