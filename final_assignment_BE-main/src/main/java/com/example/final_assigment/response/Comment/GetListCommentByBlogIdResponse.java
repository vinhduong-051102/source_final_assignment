package com.example.final_assigment.response.Comment;

import com.example.final_assigment.dto.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetListCommentByBlogIdResponse {
    private String message;
    private List<CommentDto> list;
}
