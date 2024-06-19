package com.example.final_assigment.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String vocabulary;

    @Column
    private String meaning;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

}
