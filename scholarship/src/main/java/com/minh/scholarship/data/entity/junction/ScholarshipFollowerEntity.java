package com.minh.scholarship.data.entity.junction;

import com.minh.scholarship.data.entity.base.BaseEntity;
import com.minh.scholarship.data.entity.junction.id.ScholarshipFollowerId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "scholarship", name = "APPLICATION_FOLLOWER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@IdClass(ScholarshipFollowerId.class)
public class ScholarshipFollowerEntity extends BaseEntity {

    @Id
    @Column(name = "SCHOLARSHIP_ID")
    private Long scholarshipId;

    @Id
    @Column(name = "USER_ID")
    private Long userId;

}
