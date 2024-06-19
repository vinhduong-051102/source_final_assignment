package com.example.final_assigment.controller;

import com.example.final_assigment.dto.CommentDto;
import com.example.final_assigment.request.Comment.CreateCommentRequest;
import com.example.final_assigment.request.Comment.GetListCommentRequest;
import com.example.final_assigment.response.Comment.GetListCommentByBlogIdResponse;
import com.example.final_assigment.response.Lesson.CreateResponse;
import com.example.final_assigment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/get_list_comment")
    public ResponseEntity<?> getListCommentByBlogId(@RequestParam(name = "blog_id") Long blogId) {
        List<CommentDto> list = commentService.getListCommentByBlogId(blogId);
        if (list != null) {
            return ResponseEntity.status(200).body(GetListCommentByBlogIdResponse.builder().list(list).message("Lấy danh sách bình luận thành công").build());
        }
        return ResponseEntity.status(400).body(GetListCommentByBlogIdResponse.builder().list(null).message("Lấy danh sách bình luận thất bại").build());
    }

    @GetMapping("/get_all_comment")
    public ResponseEntity<?> getAllComment() {
        List<CommentDto> list = commentService.getAllComment();
        if (list != null) {
            return ResponseEntity.status(200).body(GetListCommentByBlogIdResponse.builder().list(list).message("Lấy danh sách bình luận thành công").build());
        }
        return ResponseEntity.status(400).body(GetListCommentByBlogIdResponse.builder().list(null).message("Lấy danh sách bình luận thất bại").build());
    }

    @PostMapping("/create_comment")
    public ResponseEntity<?> createComment(@RequestBody CreateCommentRequest request) {
        commentService.createComment(request.getBlogId(), request.getUserId(), request.getContent(), request.getRating());
        return ResponseEntity.status(200).body(CreateResponse.builder() .message("Thêm mới thành công").build());
    }
}
