package com.gichungasoftwares.ServiceHub.service.auth;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.requests.SignupRequest;

import java.util.List;
import java.util.Optional;

public interface AuthService {

    boolean existsByEmail(String email);
    Optional<User> getUserWithEmail(String email);
    UserDto createUser(SignupRequest signupRequest);
    List<UserDto> getAllProviders();
    List<UserDto> getAllCustomers();
}
