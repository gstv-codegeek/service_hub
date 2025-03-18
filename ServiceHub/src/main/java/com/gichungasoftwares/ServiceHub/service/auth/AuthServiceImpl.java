package com.gichungasoftwares.ServiceHub.service.auth;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.user.Admin;
import com.gichungasoftwares.ServiceHub.entity.user.Customer;
import com.gichungasoftwares.ServiceHub.entity.user.Provider;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.enums.UserRole;
import com.gichungasoftwares.ServiceHub.repository.UserRepository;
import com.gichungasoftwares.ServiceHub.requests.SignupRequest;
import com.gichungasoftwares.ServiceHub.service.admin.audit.AuditControlService;
import com.gichungasoftwares.ServiceHub.service.auth.mapper.UserMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditControlService auditControlService;
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public Optional<User> getUserWithEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @PostConstruct
    public void createAdmin() {
        logger.info("Running createAdmin() method");
        try {
            User existingAdmin = userRepository.findByUserRole(UserRole.Admin);
            if (existingAdmin == null) {
                Admin admin = new Admin();
                admin.setFullName("SYSTEM ADMIN");
                admin.setUsername("admin");
                admin.setEmail("admin@servicehub.com");
                admin.setPhoneNumber("0723456789");
                admin.setUserRole(UserRole.Admin);

                logger.info("Encoding default admin password");
                admin.setPassword(passwordEncoder.encode("sysadmin"));

                userRepository.save(admin);
                logger.info("Default admin created successfully");
            } else {
                logger.info("Admin already exists, skipping creation");
            }
        } catch (Exception e) {
            logger.error("Error in createAdmin: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public UserDto createUser(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }
        try {
            User user;
            if ((signupRequest.getBusinessName() != null) && !signupRequest.getBusinessName().isEmpty()) {
                // Register as provider
                Provider newProvider = new Provider();
                newProvider.setBusinessName(signupRequest.getBusinessName());
                newProvider.setUserRole(UserRole.Provider);
                user = newProvider;
            } else {
                // Register as Customer
                Customer newCustomer = new Customer();
                newCustomer.setUserRole(UserRole.Customer);
                newCustomer.setFullName(signupRequest.getFullName());
                user = newCustomer;
            }
            // common user fields
            user.setUsername(signupRequest.getUsername());
            user.setEmail(signupRequest.getEmail());
            user.setPhoneNumber(signupRequest.getPhoneNumber());
            user.setIdNumber(signupRequest.getIdNumber());
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

            User createdUser = userRepository.save(user);
            logger.info("{} record created successfully", user.getUserRole());

            //Log Action
            auditControlService.logAction("User Created", "SYSTEM", "User: " + createdUser.getId());

            return userMapper.toUserDto(createdUser);

        } catch (DataAccessException e) {
            logger.warn("Error while creating user record");
            throw new RuntimeException("User registration failed");
        } catch (Exception e) {
            throw new RuntimeException("Something went wrong " + e);
        }
    }


    @Override
    public List<UserDto> getAllProviders() {
        return userRepository.findAllByUserRole(UserRole.Provider)
                .stream()
                .map(User::toUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getAllCustomers() {
        return userRepository.findAllByUserRole(UserRole.Customer)
                .stream()
                .map(User::toUserDto)
                .collect(Collectors.toList());
    }

}
