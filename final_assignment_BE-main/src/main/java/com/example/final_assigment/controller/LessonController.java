package com.example.final_assigment.controller;

import com.example.final_assigment.dto.AssigmentDto;
import com.example.final_assigment.dto.LessonDto;
import com.example.final_assigment.dto.WordDto;
import com.example.final_assigment.model.Assigment;
import com.example.final_assigment.model.Lesson;
import com.example.final_assigment.request.Assigment.CreateAssigmentRequest;
import com.example.final_assigment.request.Lesson.CreateRequest;
import com.example.final_assigment.request.Lesson.MarkCompleteRequest;
import com.example.final_assigment.response.Lesson.CreateResponse;
import com.example.final_assigment.response.Lesson.GetListResponse;
import com.example.final_assigment.response.Lesson.MarkCompleteResponse;
import com.example.final_assigment.service.AssigmentService;
import com.example.final_assigment.service.LessonService;
import com.example.final_assigment.service.WordService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/lesson")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;
    private final WordService wordService;
    private final RestTemplate restTemplate;
    private final AssigmentService assigmentService;

    @PostMapping("/create")
    public ResponseEntity<?> createLesson(@RequestBody CreateRequest request) {
        try {
            Lesson lesson = lessonService.createLesson(request.getTitle(), request.getDescription(), request.getUserId());
            if (lesson != null) {
                assigmentService.createAssigment(lesson.getId(), "listen");
                assigmentService.createAssigment(lesson.getId(), "speak");
                assigmentService.createAssigment(lesson.getId(), "read");
                assigmentService.createAssigment(lesson.getId(), "test");
                request.getWordList().forEach(word -> {
                    wordService.createWord(word.getVocabulary(), word.getMeaning(), lesson.getId());
                });

                return ResponseEntity.status(200).body(CreateResponse.builder().message("Thêm mới thành công").build());
            }
            return ResponseEntity.status(400).body(CreateResponse.builder() .message("Thêm mới thất bại").build());
        }
        catch (Exception exception) {
            System.out.println(exception.getMessage());
            return ResponseEntity.status(400).body(CreateResponse.builder().message("Thêm mới thất bại").build());
        }

    }

    @GetMapping("/get_list")
    public ResponseEntity<?> getList(@RequestParam(name = "user_id") Long userId) {
        List<LessonDto> lessonList = lessonService.getListByUserId(userId);
        if (lessonList != null) {
            return ResponseEntity.status(200).body(GetListResponse.builder().lessonList(lessonList).message("Lấy danh sách thành công").build());
        }
        return ResponseEntity.status(400).body(GetListResponse.builder().lessonList(null).message("Lấy danh sách thất bại").build());
    }

    @GetMapping("/get_list_word")
    public ResponseEntity<?> getListWord(@RequestParam(name = "lesson_id") Long lessonId) {
        List<WordDto> list = wordService.getListWordByLesson(lessonId);
        if (list != null) {
            return ResponseEntity.status(200).body(GetListResponse.builder().lessonList(list).message("Lấy danh sách thành công").build());
        }
        return ResponseEntity.status(400).body(GetListResponse.builder().lessonList(null).message("Lấy danh sách thất bại").build());
    }

    @PutMapping("/mark_complete")
    public ResponseEntity<?> markComplete(@RequestBody MarkCompleteRequest request) {
        assigmentService.markComplete(request.getAssigmentId());
        return ResponseEntity.status(200).body(MarkCompleteResponse.builder().message("Bài tập đã hoàn thành").build());
    }

}
