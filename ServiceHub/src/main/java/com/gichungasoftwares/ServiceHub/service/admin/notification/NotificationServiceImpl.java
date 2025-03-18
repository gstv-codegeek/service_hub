package com.gichungasoftwares.ServiceHub.service.admin.notification;

import com.gichungasoftwares.ServiceHub.entity.Notification;
import com.gichungasoftwares.ServiceHub.entity.user.User;
import com.gichungasoftwares.ServiceHub.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
    private final NotificationRepository notificationRepository;
    private static final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);

    @Override
    public void saveNotification(User user, String messageCategory, String message, boolean isRead) {
        try {
            Notification notification = new Notification();
            notification.setUser(user);
            notification.setMessageCategory(messageCategory);
            notification.setMessage(message);
            notification.setRead(false);
            Notification createdNotification = notificationRepository.save(notification);

            logger.info("Notification created successfully. Notification id: {}", createdNotification.getId());
        } catch (DataAccessException e) {
            logger.error("Database error saving notification :", e);
        } catch (Exception e) {
            logger.error("Something went wrong :", e);
        }
    }
}
