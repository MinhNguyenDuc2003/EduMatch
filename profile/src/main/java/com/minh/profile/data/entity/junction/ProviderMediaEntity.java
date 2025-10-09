package com.minh.profile.data.entity.junction;

import com.minh.profile.data.entity.junction.id.ProviderMediaId;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(ProviderMediaId.class)
@Table(schema = "profile", name = "PROVIDER_MEDIA")
public class ProviderMediaEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "PROVIDER_ID")
    private Long providerId;

    @Id
    @Column(name = "MEDIA_ID")
    private Long mediaId;

    @Column(name = "IMAGE_TYPE")
    private String imageType;

}
