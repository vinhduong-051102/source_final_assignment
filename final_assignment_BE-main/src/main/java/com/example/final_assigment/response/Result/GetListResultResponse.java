package com.example.final_assigment.response.Result;

import com.example.final_assigment.dto.ResultDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetListResultResponse {
    private String message;
    private List<ResultDto> listResult;
}
