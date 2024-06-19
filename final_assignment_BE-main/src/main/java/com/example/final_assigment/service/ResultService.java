package com.example.final_assigment.service;

import com.example.final_assigment.dto.ResultDto;
import com.example.final_assigment.model.Assigment;
import com.example.final_assigment.model.Result;
import com.example.final_assigment.model.User;
import com.example.final_assigment.repository.AssigmentRepository;
import com.example.final_assigment.repository.ResultRepository;
import com.example.final_assigment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;

    private final AssigmentRepository assigmentRepository;

    private final UserRepository userRepository;

    public void setResult(Long assigmentId, Boolean isPass, Long userId) {
        Optional<Assigment> assigment = assigmentRepository.findById(assigmentId);
        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(user1 -> assigment.ifPresent(value -> resultRepository.save(Result.builder().isPass(isPass).assigment(value).user(user1).build())));
    }


    public List<ResultDto> getListByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        List<ResultDto> resultDtoList = new ArrayList<>();

        if (user.isPresent()) {
            List<Result> list = resultRepository.findAllByUser(user.get());
            for (Result result : list) {
                Assigment assigment = result.getAssigment();
                if (!assigment.getType().equals("test")) {
                    resultDtoList.add(ResultDto.builder().id(result.getId()).isPass(result.getIsPass()).type(assigment.getType()).build());
                }
            }
        }
        return resultDtoList;
    }

}
