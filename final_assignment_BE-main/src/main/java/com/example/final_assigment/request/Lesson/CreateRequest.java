package com.example.final_assigment.request.Lesson;

import com.example.final_assigment.model.Word;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateRequest {
    private String title;
    private String description;
    private List<Word> wordList;
    private Long userId;
}
