package com.gichungasoftwares.ServiceHub.service.admin.users;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserManagerServiceImpl implements UserManagerService {

    private final UserRepository userRepository;
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
}
