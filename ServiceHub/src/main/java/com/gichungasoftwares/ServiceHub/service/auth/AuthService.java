package com.gichungasoftwares.ServiceHub.service.auth;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.requests.SignupRequest;

public interface AuthService {

    boolean existsByEmail(String email);
    UserDto createCustomer(SignupRequest signupRequest);
    UserDto createProvider(SignupRequest signupRequest);
}
