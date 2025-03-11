package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.requests.LoginRequest;
import com.gichungasoftwares.ServiceHub.requests.SignupRequest;
import com.gichungasoftwares.ServiceHub.response.AuthResponse;
import com.gichungasoftwares.ServiceHub.service.auth.AuthService;
import com.gichungasoftwares.ServiceHub.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JWTUtil jwtUtil;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        try {
            var auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );


            UserDetails principal = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            final String jwt = jwtUtil.generateToken(principal);

            User user = authService.getUserWithEmail(principal.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            AuthResponse authResponse = new AuthResponse();
            authResponse.setJwt(jwt);
            authResponse.setUserRole(user.getUserRole());
            authResponse.setUserId(user.getId());

            return ResponseEntity.ok(authResponse);
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error Occured");
        }

    }
}
