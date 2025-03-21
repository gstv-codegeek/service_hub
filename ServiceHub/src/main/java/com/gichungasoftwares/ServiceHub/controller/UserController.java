package com.gichungasoftwares.ServiceHub.controller;

import com.gichungasoftwares.ServiceHub.dto.CategoryDto;
import com.gichungasoftwares.ServiceHub.dto.UserDto;
import com.gichungasoftwares.ServiceHub.service.admin.users.UserManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserManagerService userService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @DeleteMapping("user/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @PutMapping("/user/{id}/update")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDto userDto, Authentication connectedUser) {
        if (userService.updateUser(id, userDto, connectedUser)) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
