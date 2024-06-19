package com.example.final_assigment.service;

import com.example.final_assigment.dto.CommentDto;
import com.example.final_assigment.model.Blog;
import com.example.final_assigment.model.Comment;
import com.example.final_assigment.model.User;
import com.example.final_assigment.repository.BlogRepository;
import com.example.final_assigment.repository.CommentRepository;
import com.example.final_assigment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BlogRepository blogRepository;

    public void createComment(Long blogId, Long userId, String content, Integer rating) {
        Optional<Blog> blog = blogRepository.findById(blogId);
        Optional<User> user = userRepository.findById(userId);
        if (blog.isPresent() && user.isPresent()) {
            commentRepository.save(Comment.builder().user(user.get()).blog(blog.get()).content(content).rating(rating).build());
        }
    }
    public List<CommentDto> getListCommentByBlogId(Long blogId) {
        Optional<Blog> blog = blogRepository.findById(blogId);
        if (blog.isPresent()) {
            List<Comment> list = commentRepository.findAllByBlog(blog.get());
            List<CommentDto> dtoList = new ArrayList<>();
            for (Comment comment: list) {
                dtoList.add(CommentDto.builder().id(comment.getId()).email(comment.getUser().getEmail()).userName(comment.getUser().getUserName()).content(comment.getContent()).rating(comment.getRating()).build());
            }
            return dtoList;
        }
        return null;
    }
    public List<CommentDto> getAllComment() {
        List<Comment> list = commentRepository.findAll();
        List<CommentDto> dtoList = new ArrayList<>();
        for (Comment comment: list) {
            dtoList.add(CommentDto.builder().id(comment.getId()).email(comment.getUser().getEmail()).userName(comment.getUser().getUserName()).content(comment.getContent()).rating(comment.getRating()).userId(comment.getUser().getId()).blogId(comment.getBlog().getId()).build());
        }
        return dtoList;

    }
}
