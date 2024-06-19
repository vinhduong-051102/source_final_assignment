package com.example.final_assigment.service;

import com.example.final_assigment.model.Blog;
import com.example.final_assigment.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;

    public void createBlog(Long id, String title, Integer type) {
        blogRepository.save(Blog.builder().id(id).title(title).type(type).build());
    }

    public void deleteListBlogById(List<Long> listId) {
        blogRepository.deleteAllById(listId);
    }

}
