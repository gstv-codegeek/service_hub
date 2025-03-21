package com.gichungasoftwares.ServiceHub.service.admin.users;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface UserManagerService {
    List<UserDto> getAllUsers();

    UserDto getUserById(Long id);

    boolean deleteUser(Long userId);

    boolean updateUser(Long userId, UserDto userDto, Authentication connectedUser);
}
