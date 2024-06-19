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
public class Blog {
    @Id
    private Long id;

    @Column
    private String title;

    @Column
    private Integer type;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
    private List<Comment> commentList;
}
