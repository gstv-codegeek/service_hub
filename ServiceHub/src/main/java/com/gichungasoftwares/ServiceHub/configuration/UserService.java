package com.gichungasoftwares.ServiceHub.configuration;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailsService();
}
