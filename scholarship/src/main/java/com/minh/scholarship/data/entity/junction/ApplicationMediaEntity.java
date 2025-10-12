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
@Table(schema = "scholarship", name = "APPLICATION_MEDIA")
public class ApplicationMediaEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "APPLICATION_ID")
    private Long applicationId;

    @Id
    @Column(name = "MEDIA_ID")
    private Long mediaId;

}
