package com.example.final_assigment.request.Assigment;


import com.example.final_assigment.dto.AssigmentDto;
import com.example.final_assigment.model.Assigment;
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
public class CreateAssigmentRequest {
    private List<AssigmentDto> assigmentList;
    private List<Word> wordList;
}
