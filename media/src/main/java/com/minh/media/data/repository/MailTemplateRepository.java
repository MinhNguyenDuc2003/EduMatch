package com.minh.media.data.repository;

import com.minh.media.data.entity.MailTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MailTemplateRepository extends JpaRepository<MailTemplateEntity, Long> {

    MailTemplateEntity findByType(String type);

}
