package com.gichungasoftwares.ServiceHub.service.admin.audit;

public interface AuditControlService {
    void logAction(String action, String performedBy, String details);
}
