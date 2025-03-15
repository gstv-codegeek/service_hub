package com.gichungasoftwares.ServiceHub.service.admin.notification;

import com.gichungasoftwares.ServiceHub.entity.user.User;

public interface NotificationService {
    void saveNotification(User user, String messageCategory, String message, boolean isRead);
}
