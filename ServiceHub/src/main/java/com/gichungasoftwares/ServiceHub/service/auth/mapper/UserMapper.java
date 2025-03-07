package com.gichungasoftwares.ServiceHub.service.auth.mapper;

import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.entity.user.Customer;
import com.gichungasoftwares.ServiceHub.entity.user.ServiceProvider;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public UserDto toUserDto(User createdUser) {
        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        userDto.setFullName(createdUser.getFullName());
        userDto.setUsername(createdUser.getUsername());
        userDto.setEmail(createdUser.getEmail());
        userDto.setPhoneNumber(createdUser.getPhoneNumber());
        if (createdUser instanceof ServiceProvider provider) {
            userDto.setBusinessName(provider.getBusinessName());
        } else {
            userDto.setBusinessName(null);
        }
        return userDto;
    }
}
