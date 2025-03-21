package com.gichungasoftwares.ServiceHub.response;

import com.gichungasoftwares.ServiceHub.enums.UserRole;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;
    private UserRole userRole;
    private Long userId;
    private String fullName;
    private String businessName;

}
