package com.example.final_assigment.model;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean isPass;

    @ManyToOne
    @JoinColumn(name = "assigment_id")
    private Assigment assigment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
