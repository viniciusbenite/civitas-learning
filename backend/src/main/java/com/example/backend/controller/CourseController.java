package com.example.backend.controller;

import com.example.backend.model.Course;
import com.example.backend.model.ListResponse;
import com.example.backend.service.CourseService;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api/v1")
public class CourseController {

  private final CourseService courseService;

  @GetMapping("courses")
  public ResponseEntity<ListResponse> getCourses() {
    Set<Course> courses = courseService.getAllCourses();

    ListResponse response = ListResponse.builder()
      .total(courses.size())
      .content(courses)
      .build();

    return ResponseEntity.ok(response);
  }

  @GetMapping("courses/search")
  public ResponseEntity<ListResponse> searchCourses(@RequestParam String description) {
    Set<Course> courses = courseService.searchByDescription(description);

    ListResponse response = ListResponse.builder()
      .total(courses.size())
      .content(courses)
      .build();

    return ResponseEntity.ok(response);
  }

  @PostMapping("courses")
  public ResponseEntity<Object> createCourse(@Valid @RequestBody Course course) {
    try {
      Course createdCourse = courseService.saveCourse(course);

      return ResponseEntity.ok(createdCourse);
    } catch (ResponseStatusException e) {
      return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
    }
  }

  @DeleteMapping("courses/{courseId}")
  public ResponseEntity<Void> deleteCourse(@NonNull @PathVariable Long courseId) {
    courseService.removeCourse(courseId);

    return ResponseEntity.noContent().build();
  }

}
