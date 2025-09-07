package com.minh.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.minh.utils.serializer.DateToTimestamp;
import com.minh.utils.serializer.TimestampToDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BaseDto implements Serializable {

    private static final long serialVersionUID = 1L;

    @JsonIgnore
    public Boolean active = true;
    @JsonIgnore
    public Long version = 0L;
    @JsonIgnore
    public String createdBy;
    @JsonIgnore
    public String updatedBy;

    @JsonIgnore
    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    public LocalDateTime createdDate;

    @JsonIgnore
    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    public LocalDateTime updatedDate;

}
