package com.example.final_assigment.model;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Target {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long amount;

    @Column
    private Integer studyTime;

    @Column
    private Integer dayOfWeek;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
