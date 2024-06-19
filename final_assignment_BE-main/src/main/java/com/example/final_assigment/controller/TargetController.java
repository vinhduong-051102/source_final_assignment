package com.example.final_assigment.controller;

import com.example.final_assigment.dto.TargetDto;
import com.example.final_assigment.dto.WordDto;
import com.example.final_assigment.model.Target;
import com.example.final_assigment.request.Target.CreateTargetRequest;
import com.example.final_assigment.request.Target.EditTargetRequest;
import com.example.final_assigment.response.Lesson.GetListResponse;
import com.example.final_assigment.response.Target.CreateTargetResponse;
import com.example.final_assigment.response.Target.GetListTargetResponse;
import com.example.final_assigment.response.Target.GetTargetResponse;
import com.example.final_assigment.service.TargetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/target")
@RequiredArgsConstructor
public class TargetController {
    private final TargetService targetService;

    @GetMapping("/get_list_target")
    public ResponseEntity<?> getListTarget(@RequestParam(name = "user_id") Long userId) {
        List<TargetDto> list = targetService.getListTarget(userId);
        if (list != null) {
            return ResponseEntity.status(200).body(GetListTargetResponse.builder().listTarget(list).message("Lấy danh sách thành công").build());
        }
        return ResponseEntity.status(400).body(GetListTargetResponse.builder().listTarget(null).message("Lấy danh sách thất bại").build());
    }

    @PostMapping("/create_target")
    public ResponseEntity<?> createTarget(@RequestBody CreateTargetRequest request) {
        Target target = targetService.createTarget(request.getUserId(), request.getAmount(), request.getDayOfWeek(), request.getStudyTime());
        if (target != null) {
            return ResponseEntity.status(200).body(CreateTargetResponse.builder().message("Thêm mới thành công").build());
        }
        return ResponseEntity.status(400).body(CreateTargetResponse.builder().message("Thêm mới thất bại").build());
    }
    @PostMapping("/edit_target")
    public ResponseEntity<?> editTarget(@RequestBody EditTargetRequest request) {
        Target target = targetService.updateTarget(request.getTargetId(), request.getAmount(), request.getDayOfWeek(), request.getStudyTime());
        if (target != null) {
            return ResponseEntity.status(200).body(CreateTargetResponse.builder().message("Chỉnh sửa thành công").build());
        }
        return ResponseEntity.status(400).body(CreateTargetResponse.builder().message("Chỉnh sửa thất bại").build());
    }
    @DeleteMapping("/delete_target")
    public ResponseEntity<?> deleteTarget(@RequestParam(name = "target_id") Long targetId) {
        targetService.deleteTarget(targetId);
        return ResponseEntity.status(200).body(CreateTargetResponse.builder().message("Xoá mục tiêu thành công").build());
    }
    @GetMapping("/get_target")
    public ResponseEntity<?> getTarget(@RequestParam(name = "user_id") Long userId, @RequestParam(name = "day_of_week") Integer dayOfWeek) {
        TargetDto targetDto = targetService.getTarget(userId, dayOfWeek);
        if (targetDto != null) {
            return ResponseEntity.status(200).body(GetTargetResponse.builder().target(targetDto).message("Lấy mục tiêu thành công").build());
        }
        return ResponseEntity.status(200).body(GetTargetResponse.builder().target(null).message("Không tìm thấy mục tiêu").build());
    }
}

