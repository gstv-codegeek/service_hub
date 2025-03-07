package com.gichungasoftwares.ServiceHub.service.auth;

import com.gichungasoftwares.ServiceHub.configuration.JwtAuthenticationFilter;
import com.gichungasoftwares.ServiceHub.configuration.WebSecurityConfiguration;
import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.user.Admin;
import com.gichungasoftwares.ServiceHub.entity.user.Customer;
import com.gichungasoftwares.ServiceHub.entity.user.ServiceProvider;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.enums.UserRole;
import com.gichungasoftwares.ServiceHub.repository.UserRepository;
import com.gichungasoftwares.ServiceHub.requests.SignupRequest;
import com.gichungasoftwares.ServiceHub.service.auth.mapper.UserMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @PostConstruct
    public void createAdmin() {
        logger.info("Running createAdmin() method");
        try {
            User existingAdmin = userRepository.findByUserRole(UserRole.ROLE_ADMIN);
            if (existingAdmin == null) {
                Admin admin = new Admin();
                admin.setFullName("SYSTEM ADMIN");
                admin.setUsername("admin");
                admin.setEmail("admin@servicehub.com");
                admin.setPhoneNumber("0723456789");
                admin.setUserRole(UserRole.ROLE_ADMIN);

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
    public UserDto createCustomer(SignupRequest signupRequest) {

        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with email already exists");
        }
        try {
                Customer newCustomer = new Customer();
                newCustomer.setFullName(signupRequest.getFullName());
                newCustomer.setUsername(signupRequest.getUsername());
                newCustomer.setEmail(signupRequest.getEmail());
                newCustomer.setPhoneNumber(signupRequest.getPhoneNumber());
                newCustomer.setIdNumber(signupRequest.getIdNumber());
                newCustomer.setUserRole(UserRole.ROLE_CUSTOMER);
                newCustomer.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

                Customer createdCustomer = userRepository.save(newCustomer);
                logger.info("Customer record created successfully");

                return userMapper.toUserDto(createdCustomer);
        } catch (DataAccessException e) {
            logger.warn("Error while creating customer record");
            throw new RuntimeException("Could not create customer");
        }
    }

    @Override
    public UserDto createProvider(SignupRequest signupRequest) {

        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }
        try {
            ServiceProvider newProvider = new ServiceProvider();
            newProvider.setFullName(signupRequest.getFullName());
            newProvider.setUsername(signupRequest.getUsername());
            newProvider.setEmail(signupRequest.getEmail());
            newProvider.setPhoneNumber(signupRequest.getPhoneNumber());
            newProvider.setIdNumber(signupRequest.getIdNumber());
            newProvider.setUserRole(UserRole.ROLE_SERVICE_PROVIDER);
            newProvider.setBusinessName(signupRequest.getBusinessName());
            newProvider.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

            ServiceProvider createdProvider = userRepository.save(newProvider);
            logger.info("Service Provider record created successfully");

            return userMapper.toUserDto(createdProvider);

        } catch (DataAccessException e) {
            logger.warn("Error while creating service provider record");
            throw new RuntimeException("Could not create provider");
        }
    }


}
