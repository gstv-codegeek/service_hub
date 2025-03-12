package com.gichungasoftwares.ServiceHub.service.auth;

import com.gichungasoftwares.ServiceHub.dto.ProviderServiceDto;
import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.user.Customer;
import com.gichungasoftwares.ServiceHub.entity.user.Provider;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.requests.SignupRequest;

import java.util.List;
import java.util.Optional;

public interface AuthService {

    boolean existsByEmail(String email);
    Optional<User> getUserWithEmail(String email);
    UserDto createCustomer(SignupRequest signupRequest);
    UserDto createProvider(SignupRequest signupRequest);
    List<UserDto> getAllProviders();
    List<UserDto> getAllCustomers();
}
