package com.gichungasoftwares.ServiceHub.entity.user;

import com.gichungasoftwares.ServiceHub.entity.Booking;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends  User{

}
