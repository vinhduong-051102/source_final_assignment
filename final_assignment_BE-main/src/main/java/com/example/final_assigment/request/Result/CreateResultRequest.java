package com.example.final_assigment.request.Result;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateResultRequest {
    private Long assigmentId;
    private Boolean isPass;
    private Long userId;
}
