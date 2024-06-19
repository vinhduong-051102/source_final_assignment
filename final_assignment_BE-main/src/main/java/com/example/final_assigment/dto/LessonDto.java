package com.example.final_assigment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LessonDto {
    private Long id;
    private String title;
    private String description;
    private List<WordDto> wordList;
    private List<AssigmentDto> assigmentList;
}
