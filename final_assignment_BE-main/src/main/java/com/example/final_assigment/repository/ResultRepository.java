package com.example.final_assigment.repository;

import com.example.final_assigment.model.Assigment;
import com.example.final_assigment.model.Result;
import com.example.final_assigment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findAllByUser(User user);
}
