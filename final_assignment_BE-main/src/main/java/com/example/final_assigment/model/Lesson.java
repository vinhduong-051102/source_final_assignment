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
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String title;

    @Column
    private String description;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    private List<Word> wordList;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    private List<Assigment> assigmentList;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
