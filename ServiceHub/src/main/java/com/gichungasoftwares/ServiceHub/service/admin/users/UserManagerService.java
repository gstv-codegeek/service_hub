package com.gichungasoftwares.ServiceHub.service.admin.users;

import com.gichungasoftwares.ServiceHub.dto.UserDto;

import java.util.List;

public interface UserManagerService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
}
