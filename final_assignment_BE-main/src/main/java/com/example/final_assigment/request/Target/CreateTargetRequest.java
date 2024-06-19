package com.example.final_assigment.request.Target;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateTargetRequest {
    private Long userId;
    private Long amount;
    private Integer dayOfWeek;
    private Integer studyTime;
}
