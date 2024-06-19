package com.example.final_assigment.response.Target;

import com.example.final_assigment.dto.TargetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetListTargetResponse {
    private String message;
    private List<TargetDto> listTarget;
}
