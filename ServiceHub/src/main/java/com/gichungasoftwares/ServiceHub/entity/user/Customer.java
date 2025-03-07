package com.gichungasoftwares.ServiceHub.entity.user;

import com.gichungasoftwares.ServiceHub.entity.Booking;
import com.gichungasoftwares.ServiceHub.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@DiscriminatorValue("CUSTOMER")
public class Customer extends User{

    @OneToMany(mappedBy = "customer")
    private List<Booking> bookings;

}
