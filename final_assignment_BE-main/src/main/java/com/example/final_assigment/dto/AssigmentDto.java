package com.example.final_assigment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AssigmentDto {
    private Long id;
    private String type;
    private Boolean isComplete;
    private Long lessonId;
}
