package com.example.final_assigment.service;

import com.example.final_assigment.model.Assigment;
import com.example.final_assigment.model.Lesson;
import com.example.final_assigment.repository.AssigmentRepository;
import com.example.final_assigment.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AssigmentService {
    private final AssigmentRepository assigmentRepository;
    private final LessonRepository lessonRepository;

    public Assigment createAssigment(Long lessonId, String type) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        return lesson.map(value -> assigmentRepository.save(Assigment.builder().lesson(value).isCompleted(false).type(type).build())).orElse(null);
    }

    public void markComplete(Long assigmentId) {
        Optional<Assigment> assigment = assigmentRepository.findById(assigmentId);
        if (assigment.isPresent()) {
            assigment.get().setIsCompleted(true);
            assigmentRepository.save(assigment.get());
        }
    }
}
