package com.example.final_assigment.controller;

import com.example.final_assigment.dto.ResultDto;
import com.example.final_assigment.model.Lesson;
import com.example.final_assigment.repository.ResultRepository;
import com.example.final_assigment.request.Lesson.CreateRequest;
import com.example.final_assigment.request.Result.CreateResultRequest;
import com.example.final_assigment.response.Lesson.CreateResponse;
import com.example.final_assigment.response.Result.CreateResultResponse;
import com.example.final_assigment.response.Result.GetListResultResponse;
import com.example.final_assigment.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/result")
@RequiredArgsConstructor
public class ResultController {
    private final ResultService resultService;

    @PostMapping("/create_result")
    public ResponseEntity<?> createResult(@RequestBody CreateResultRequest request) {
        try {
            resultService.setResult(request.getAssigmentId(), request.getIsPass(), request.getUserId());
            return ResponseEntity.status(200).body(CreateResultResponse.builder().message("Thêm mới thành công").build());
        }
        catch (Exception exception) {
            return ResponseEntity.status(400).body(CreateResultResponse.builder().message("Thêm mới thất bại").build());
        }
    }

    @GetMapping("/get_list_result")
    public ResponseEntity<?> getListResult(@RequestParam(name = "user_id") Long userId) {
        try {
            List<ResultDto> resultDtoList = resultService.getListByUserId(userId);
            return ResponseEntity.status(200).body(GetListResultResponse.builder().message("Lấy danh sách thành công").listResult(resultDtoList).build());
        }
        catch (Exception exception) {
            return ResponseEntity.status(400).body(GetListResultResponse.builder().message("Lấy danh sách thất bại").listResult(null).build());
        }
    }

}
