package com.example.backend.service;

import com.example.backend.model.Course;
import com.example.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.util.Streamable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class CourseService {

  private final CourseRepository courseRepository;

  public Set<Course> getAllCourses() {
    return Streamable.of(courseRepository.findAll()).toSet();
  }

  public Set<Course> searchByDescription(String description) {
    return courseRepository.findByDescriptionContaining(description);
  }

  public Course saveCourse(Course course) {
    try {
      return courseRepository.save(course);
    } catch (DataIntegrityViolationException e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Course with the same subject and/or course number already exists.");
    }
  }

  public void removeCourse(Long courseId) {
    courseRepository.deleteById(courseId);
  }

}
