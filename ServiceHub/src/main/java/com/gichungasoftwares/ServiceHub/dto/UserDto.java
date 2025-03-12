package com.gichungasoftwares.ServiceHub.dto;

import com.gichungasoftwares.ServiceHub.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String phoneNumber;
    private String idNumber;
    private UserRole userRole;
    private String businessName;
}
