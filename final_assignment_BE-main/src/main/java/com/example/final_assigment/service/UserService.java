package com.example.final_assigment.service;


import com.example.final_assigment.model.User;
import com.example.final_assigment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmailAndPassword(String email, String password) {
        Optional<User> userLogin = userRepository.findByEmailAndPassword(email, password);
        return userLogin.orElse(null);
    }

    public String createUser(String userName, String email, String password) {
        userRepository.save(
                User.builder()
                        .userName(userName)
                        .email(email)
                        .password(password)
                        .build()
        );

        return "Đăng kí thành công";
    }
}
