package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.requests.LoginRequest;
import com.gichungasoftwares.ServiceHub.requests.SignupRequest;
import com.gichungasoftwares.ServiceHub.response.AuthResponse;
import com.gichungasoftwares.ServiceHub.service.admin.audit.AuditControlService;
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
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JWTUtil jwtUtil;
    private final AuditControlService auditControlService;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody SignupRequest signupRequest) {
        if (authService.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("User exists with this email", HttpStatus.NOT_ACCEPTABLE);
        }
        UserDto createdUserDto = authService.createUser(signupRequest);
        if (createdUserDto == null) return new ResponseEntity<>("User not created", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(createdUserDto, HttpStatus.CREATED);
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

            //Log Action
            auditControlService.logAction("User Login", user.getEmail(), "User ID: [" + user.getId() + "] ");

            return ResponseEntity.ok(authResponse);
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error Occurred");
        }

    }

    @GetMapping("/providers")
    public ResponseEntity<?> getAllProviders() {
        return ResponseEntity.ok(authService.getAllProviders());
    }

    @GetMapping("/customers")
    public ResponseEntity<?> getAllCustomers() {
        return ResponseEntity.ok(authService.getAllCustomers());
    }
}
