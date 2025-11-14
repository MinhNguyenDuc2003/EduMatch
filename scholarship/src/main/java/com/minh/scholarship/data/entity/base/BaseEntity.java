package com.minh.scholarship.data.entity.base;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minh.utils.UaaContextHolder;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.*;
import org.apache.commons.lang3.ObjectUtils;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@ToString
@MappedSuperclass
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "CREATED_BY", updatable = false)
    public String createdBy;

    @Column(name = "UPDATED_BY")
    public String updatedBy;

    @Column(name = "ACTIVE")
    public Boolean active;

    @Column(name = "VERSION")
    public Long version;

    @Column(name = "CREATED_DATETIME", columnDefinition = "TIMESTAMP", updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    public LocalDateTime createdDate;

    @Column(name = "UPDATED_DATETIME", columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    public LocalDateTime updatedDate;

    @PrePersist
    public void prePersist() {
        if (Objects.isNull(this.createdDate)) {
            this.createdDate = LocalDateTime.now();
        }
        if (Objects.isNull(this.updatedDate)) {
            this.updatedDate = LocalDateTime.now();
        }
        if (Objects.isNull(this.active)) {
            this.active = Boolean.TRUE;
        }
        if (Objects.isNull(this.version)) {
            this.version = 0L;
        }
        if (ObjectUtils.isEmpty(createdBy)) {
            this.createdBy = UaaContextHolder.getUsername();
        }
        if (ObjectUtils.isEmpty(updatedBy)) {
            this.updatedBy = UaaContextHolder.getUsername();
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedDate = LocalDateTime.now();
        this.updatedBy = UaaContextHolder.getUsername();
    }

}
