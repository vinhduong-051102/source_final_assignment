package com.example.final_assigment.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String userName;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Lesson> lessonList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Chat> chatList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Target> targetList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Result> resultList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> commentList;
}
