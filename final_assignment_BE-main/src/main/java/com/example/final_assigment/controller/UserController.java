package com.example.final_assigment.controller;

import com.example.final_assigment.model.User;
import com.example.final_assigment.request.User.SigninRequest;
import com.example.final_assigment.request.User.SignupRequest;
import com.example.final_assigment.response.User.SigninResponse;
import com.example.final_assigment.response.User.SignupResponse;
import com.example.final_assigment.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public SignupResponse signup(@RequestBody SignupRequest request) {
        userService.createUser(request.getUserName(), request.getEmail(), request.getPassword());
        return SignupResponse.builder().message("Đăng kí thành công").build();
    }

    @PostMapping("/signin")
    public SigninResponse signin(@RequestBody SigninRequest request) {
        User userLogin = userService.getUserByEmailAndPassword(request.getEmail(), request.getPassword());
        if (userLogin != null) {
            return SigninResponse.builder()
                    .userName(userLogin.getUserName())
                    .id(userLogin.getId())
                    .message("Chào mừng " + userLogin.getUserName() + " trở lại")
                    .build();
        }
        return SigninResponse.builder()
                .userName(null)
                .id(null)
                .message("Đăng nhập thất bại kiểm tra lại email và mật khẩu")
                .build();
    }

}
