package com.gichungasoftwares.ServiceHub.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String phoneNumber;
    private String businessName;
}
