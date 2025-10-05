package com.minh.profile.data.entity.junction.id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class ProviderMediaId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long providerId;

    private Long mediaId;

}
