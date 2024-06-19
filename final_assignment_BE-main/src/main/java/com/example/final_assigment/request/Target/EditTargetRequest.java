package com.example.final_assigment.request.Target;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EditTargetRequest {
    private Long targetId;
    private Long amount;
    private Integer dayOfWeek;
    private Integer studyTime;
}
