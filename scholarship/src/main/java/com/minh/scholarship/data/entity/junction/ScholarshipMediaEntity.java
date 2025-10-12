package com.minh.scholarship.data.entity.junction;

import com.minh.scholarship.data.entity.junction.id.ScholarshipMediaId;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(ScholarshipMediaId.class)
@Table(schema = "scholarship", name = "SCHOLARSHIP_MEDIA")
public class ScholarshipMediaEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "SCHOLARSHIP_ID")
    private Long scholarshipId;

    @Id
    @Column(name = "MEDIA_ID")
    private Long mediaId;

}
