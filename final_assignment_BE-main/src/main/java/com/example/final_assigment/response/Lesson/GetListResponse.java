package com.example.final_assigment.response.Lesson;

import com.example.final_assigment.dto.LessonDto;
import com.example.final_assigment.model.Lesson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetListResponse {
    private List<?> lessonList;
    private String message;
}
