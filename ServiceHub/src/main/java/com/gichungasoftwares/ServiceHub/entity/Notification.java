package com.gichungasoftwares.ServiceHub.entity;

import com.gichungasoftwares.ServiceHub.entity.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String messageCategory;
    private String message;
    private boolean isRead;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void persistTimestamp() {
        this.timestamp = LocalDateTime.now();
    }
}
