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
@Table(schema = "profile", name = "PROVIDER_NEWS_MEDIA")
public class ProviderNewsMediaEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "PROVIDER_NEWS_ID")
    private Long providerNewsId;

    @Id
    @Column(name = "MEIDA_ID")
    private Long mediaId;

}
