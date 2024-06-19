package com.example.final_assigment.repository;

import com.example.final_assigment.model.Lesson;
import com.example.final_assigment.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> getAllByLesson(Lesson lesson);
}
