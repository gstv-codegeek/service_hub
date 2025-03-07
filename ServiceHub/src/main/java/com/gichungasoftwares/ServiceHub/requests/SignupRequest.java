package com.gichungasoftwares.ServiceHub.requests;

import lombok.Data;

@Data
public class SignupRequest {

    private String fullName;
    private String username;
    private String email;
    private String phoneNumber;
    private String idNumber;
    private String businessName;
    private String password;
}
