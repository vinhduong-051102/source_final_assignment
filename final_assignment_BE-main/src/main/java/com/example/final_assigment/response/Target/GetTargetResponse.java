package com.example.final_assigment.response.Target;


import com.example.final_assigment.dto.TargetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetTargetResponse {
    private TargetDto target;
    private String message;
}
