package com.example.final_assigment.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TargetDto {
    private Long id;

    private Long amount;


    private Integer studyTime;


    private Integer dayOfWeek;
}
