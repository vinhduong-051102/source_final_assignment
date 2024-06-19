package com.example.final_assigment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDto {
    private Long id;
    private String content;
    private String userName;
    private String email;
    private Integer rating;
    private Long userId;
    private Long blogId;
}
