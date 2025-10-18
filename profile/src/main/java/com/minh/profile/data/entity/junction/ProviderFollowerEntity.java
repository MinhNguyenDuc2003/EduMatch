package com.minh.profile.data.entity.junction;

import com.minh.profile.data.entity.junction.id.ProviderFollowerId;
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
@IdClass(ProviderFollowerId.class)
@Table(schema = "profile", name = "PROVIDER_FOLLOWER")
public class ProviderFollowerEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "PROVIDER_ID")
    private Long providerId;

    @Id
    @Column(name = "USER_ID")
    private String userId;

}
