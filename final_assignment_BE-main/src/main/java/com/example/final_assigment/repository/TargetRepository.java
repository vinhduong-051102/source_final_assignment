package com.example.final_assigment.repository;

import com.example.final_assigment.model.Target;
import com.example.final_assigment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TargetRepository extends JpaRepository<Target, Long> {
    List<Target> findAllByUser(User user);

    @Query("SELECT t FROM Target t WHERE t.user.id = :userId AND t.dayOfWeek = :dayOfWeek")
    Optional<Target> findByUserAndDayOfWeek(@Param("userId") Long userId, @Param("dayOfWeek") Integer dayOfWeek);
}
