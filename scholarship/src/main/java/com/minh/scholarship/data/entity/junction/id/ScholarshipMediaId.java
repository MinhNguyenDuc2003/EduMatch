package com.minh.scholarship.data.entity.junction.id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class ScholarshipMediaId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long scholarshipId;

    private Long mediaId;

}
