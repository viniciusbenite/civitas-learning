package com.example.backend.repository;

import com.example.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface CourseRepository extends JpaRepository<Course, Long> {

  @Query("SELECT c FROM Course c WHERE LOWER(c.description) LIKE LOWER(CONCAT('%', :description, '%'))")
  Set<Course> findByDescriptionContaining(@Param("description") String description);

}
