package com.example.final_assigment.service;

import com.example.final_assigment.dto.WordDto;
import com.example.final_assigment.model.Lesson;
import com.example.final_assigment.model.Word;
import com.example.final_assigment.repository.LessonRepository;
import com.example.final_assigment.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.LifecycleState;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WordService {
    private final WordRepository wordRepository;
    private final LessonRepository lessonRepository;

    public void createWord(String vocabulary, String meaning, Long lessonId) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        lesson.ifPresent(value -> wordRepository.save(Word.builder().vocabulary(vocabulary).meaning(meaning).lesson(value).build()));
    }

    public List<WordDto> getListWordByLesson(Long lessonId) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isPresent()) {
            List<Word> list = wordRepository.getAllByLesson(lesson.get());
            List<WordDto> wordDtoList = new ArrayList<>();
            for (Word word : list) {
                wordDtoList.add(WordDto.builder().id(word.getId()).meaning(word.getMeaning()).vocabulary(word.getVocabulary()).build());
            }
            return wordDtoList;
        }
        return null;
    }

}
