package com.example.final_assigment.controller;

import com.example.final_assigment.request.Blog.CreateBlogRequest;
import com.example.final_assigment.request.Blog.DeleteListBlogRequest;
import com.example.final_assigment.response.Lesson.CreateResponse;
import com.example.final_assigment.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/blog")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @PostMapping("/create")
    public ResponseEntity<?> createBlog(@RequestBody CreateBlogRequest request) {
        blogService.createBlog(request.getId(), request.getTitle(), request.getType());
        return ResponseEntity.status(200).body(CreateResponse.builder() .message("Thêm mới thành công").build());
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteListBlog(@RequestBody DeleteListBlogRequest request) {
        blogService.deleteListBlogById(request.getListBlogId());
        return ResponseEntity.status(200).body(CreateResponse.builder() .message("Xoá blog thàng công").build());
    }

}
