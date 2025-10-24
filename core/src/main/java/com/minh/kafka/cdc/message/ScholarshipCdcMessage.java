package com.minh.kafka.cdc.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@lombok.Getter
@lombok.Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScholarshipCdcMessage {

    private Scholarship after;

    private Scholarship before;

    private Operation op;

}
