package com.gichungasoftwares.ServiceHub.repository;

import com.gichungasoftwares.ServiceHub.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditControlRepository extends JpaRepository<AuditLog, Long> {
}
