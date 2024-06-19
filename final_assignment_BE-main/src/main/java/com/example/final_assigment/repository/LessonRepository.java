package com.example.final_assigment.repository;

import com.example.final_assigment.model.Lesson;
import com.example.final_assigment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findAllByUser(User user);
}
