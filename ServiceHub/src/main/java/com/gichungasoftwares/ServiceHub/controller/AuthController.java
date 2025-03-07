package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.requests.SignupRequest;
import com.gichungasoftwares.ServiceHub.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/customer/signup")
    public ResponseEntity<?> createCustomer(@RequestBody SignupRequest signupRequest) {
        if (authService.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("User exists with this email", HttpStatus.NOT_ACCEPTABLE);
        }
        UserDto createdCustomerDto = authService.createCustomer(signupRequest);
        if (createdCustomerDto == null) return new ResponseEntity<>("Customer not created", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(createdCustomerDto, HttpStatus.CREATED);
    }

    @PostMapping("/provider/signup")
    public ResponseEntity<?> createProvider(@RequestBody SignupRequest signupRequest) {
        if (authService.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("User exists with this email", HttpStatus.NOT_ACCEPTABLE);
        }
        UserDto createdProviderDto = authService.createProvider(signupRequest);
        if (createdProviderDto == null) return new ResponseEntity<>("Service Provider not created", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(createdProviderDto, HttpStatus.CREATED);
    }
}
