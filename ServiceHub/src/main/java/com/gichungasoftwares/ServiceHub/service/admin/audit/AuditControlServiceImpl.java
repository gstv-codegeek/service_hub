package com.gichungasoftwares.ServiceHub.service.admin.audit;

import com.gichungasoftwares.ServiceHub.entity.AuditLog;
import com.gichungasoftwares.ServiceHub.repository.AuditControlRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuditControlServiceImpl implements AuditControlService{

    private final AuditControlRepository auditControlRepository;
    private final Logger logger = LoggerFactory.getLogger(AuditControlServiceImpl.class);


    @Override
    public void logAction(String action, String performedBy, String details) {
        AuditLog auditLog = new AuditLog();
        auditLog.setAction(action);
        auditLog.setPerformedBy(performedBy);
        auditLog.setDetails(details);
        auditControlRepository.save(auditLog);

        logger.info("Log created");
    }
}
