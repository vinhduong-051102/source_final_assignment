package com.example.final_assigment.service;

import com.example.final_assigment.dto.TargetDto;
import com.example.final_assigment.model.Target;
import com.example.final_assigment.model.User;
import com.example.final_assigment.repository.TargetRepository;
import com.example.final_assigment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TargetService {
    private final TargetRepository targetRepository;
    private final UserRepository userRepository;

    public List<TargetDto> getListTarget(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            List<Target> list = targetRepository.findAllByUser(user.get());
            List<TargetDto> targetDtoList = new ArrayList<>();
            for (Target target : list) {
                TargetDto targetDto = TargetDto.builder().id(target.getId()).amount(target.getAmount()).dayOfWeek(target.getDayOfWeek()).studyTime(target.getStudyTime()).build();
                targetDtoList.add(targetDto);
            }
            return targetDtoList;
        }
        return null;
    }

    public Target createTarget(Long userId, Long amount, Integer dayOfWeek, Integer studyTime) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(value -> targetRepository.save(Target.builder().amount(amount).dayOfWeek(dayOfWeek).studyTime(studyTime).user(value).build())).orElse(null);
    }

    public void deleteTarget(Long targetId) {
        targetRepository.deleteById(targetId);
    }

    public Target updateTarget(Long targetId, Long amount, Integer dayOfWeek, Integer studyTime) {
        Optional<Target> oldTarget = targetRepository.findById(targetId);
        return oldTarget.map(target -> targetRepository.save(Target.builder().user(target.getUser()).studyTime(studyTime).dayOfWeek(dayOfWeek).amount(amount).id(target.getId()).build())).orElse(null);
    }

    public TargetDto getTarget(Long userId, Integer dayOfWeek) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Optional<Target> target = targetRepository.findByUserAndDayOfWeek(user.get().getId(), dayOfWeek);
            if (target.isPresent()) {
                return TargetDto.builder().id(target.get().getId()).dayOfWeek(target.get().getDayOfWeek()).amount(target.get().getAmount()).studyTime(target.get().getStudyTime()).build();
            }
        }
        return null;
    }

}
