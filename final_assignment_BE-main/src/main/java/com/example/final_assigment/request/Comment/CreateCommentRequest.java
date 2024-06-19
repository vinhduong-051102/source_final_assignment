package com.example.final_assigment.request.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateCommentRequest {
    private Long blogId;
    private String content;
    private Long userId;
    private Integer rating;
}
