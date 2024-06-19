package com.example.final_assigment.repository;

import com.example.final_assigment.model.Assigment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssigmentRepository extends JpaRepository<Assigment, Long> {
}
