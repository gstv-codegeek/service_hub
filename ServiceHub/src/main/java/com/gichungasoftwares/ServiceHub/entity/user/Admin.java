package com.gichungasoftwares.ServiceHub.entity.user;

import com.gichungasoftwares.ServiceHub.entity.Booking;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends  User{


}
