package com.gichungasoftwares.ServiceHub.service.admin.users;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.Category;
import com.gichungasoftwares.ServiceHub.entity.user.Customer;
import com.gichungasoftwares.ServiceHub.entity.user.Provider;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.enums.UserRole;
import com.gichungasoftwares.ServiceHub.repository.UserRepository;
import com.gichungasoftwares.ServiceHub.service.admin.audit.AuditControlService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserManagerServiceImpl implements UserManagerService {

    private final UserRepository userRepository;
    private final AuditControlService auditControlService;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserManagerServiceImpl.class);

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(User::toUserDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long id) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with id " + id));
        UserDto userDto = new UserDto();
        userDto.setId(existingUser.getId());
        userDto.setUserRole(existingUser.getUserRole());
        userDto.setEmail(existingUser.getEmail());
        userDto.setIdNumber(existingUser.getIdNumber());
        userDto.setPhoneNumber(existingUser.getPhoneNumber());
        userDto.setFullName(existingUser.getFullName());
        return userDto;
    }

    @Override
    public boolean deleteUser(Long userId) {
        // find user
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            var existingUser = optionalUser.get();
            userRepository.deleteById(userId);
            //Log action
            auditControlService.logAction("User Deleted", existingUser.getEmail(), "User ID: " + existingUser.getId());
            return true;
        }
        return false;
    }

    @Override
    public boolean updateUser(Long id, UserDto userDto, Authentication connectedUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with this email does not exist");
        }
        try {
            User user;
            if ((userDto.getBusinessName() != null) && !userDto.getBusinessName().isEmpty()) {
                // Update provider
                Provider existingProvider = (Provider) optionalUser.get();
                existingProvider.setBusinessName(userDto.getBusinessName());
                user = existingProvider;
            } else {
                // Update Customer
                User existingCustomer = (Customer) optionalUser.get();
                existingCustomer.setFullName(userDto.getFullName());
                user = existingCustomer;
            }
            // common user fields
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setUsername(userDto.getUsername());
            user.setPhoneNumber(userDto.getPhoneNumber());
            user.setIdNumber(userDto.getIdNumber());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

            User updatedUser = userRepository.save(user);
            logger.info("{} record updated successfully", user.getUserRole());

            //Log Action
            auditControlService.logAction("User Updated", "SYSTEM ADMIN", "User: " + updatedUser.getId());

            return true;

        } catch (DataAccessException e) {
            logger.warn("Error while updating user record{}", String.valueOf(e));
            return false;
        } catch (Exception e) {
            logger.warn("Something went wrong{}", String.valueOf(e));
            return false;
        }
    }
}
