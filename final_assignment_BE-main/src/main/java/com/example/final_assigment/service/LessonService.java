package com.example.final_assigment.service;

import com.example.final_assigment.dto.AssigmentDto;
import com.example.final_assigment.dto.LessonDto;
import com.example.final_assigment.dto.WordDto;
import com.example.final_assigment.model.Assigment;
import com.example.final_assigment.model.Lesson;
import com.example.final_assigment.model.User;
import com.example.final_assigment.model.Word;
import com.example.final_assigment.repository.LessonRepository;
import com.example.final_assigment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;

    public Lesson createLesson(String title, String description, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(value -> lessonRepository.save(Lesson.builder().title(title).description(description).user(value).build())).orElse(null);
    }

    public List<LessonDto> getListByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            List<LessonDto> lessonDtos = new ArrayList<>();
            List<Lesson> list = lessonRepository.findAllByUser(user.get());
            for (Lesson lesson : list) {
                List<Word> wordList = lesson.getWordList();
                List<Assigment> assigmentList = lesson.getAssigmentList();
                List<WordDto> wordDtos = new ArrayList<>();
                List<AssigmentDto> assigmentDtos = new ArrayList<>();
                LessonDto lessonDto = new LessonDto();
                lessonDto.setId(lesson.getId());
                lessonDto.setTitle(lesson.getTitle());
                lessonDto.setDescription(lesson.getDescription());

                for (Word word : wordList) {
                    wordDtos.add(WordDto.builder().id(word.getId()).vocabulary(word.getVocabulary()).meaning(word.getMeaning()).build());
                }
                for (Assigment assigment : assigmentList) {
                    assigmentDtos.add(AssigmentDto.builder().id(assigment.getId()).type(assigment.getType()).isComplete(assigment.getIsCompleted()).build());
                }
                lessonDto.setAssigmentList(assigmentDtos);
                lessonDto.setWordList(wordDtos);
                lessonDtos.add(lessonDto);
            }
            return lessonDtos;
        }
        return null;
    }

}
