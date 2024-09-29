package com.example.backend.service;

import com.example.backend.model.Course;
import com.example.backend.repository.CourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class CourseServiceTest {

  @Autowired
  private CourseRepository courseRepository;

  @Autowired
  private CourseService courseService;

  @BeforeEach
  void setUp() {
    courseRepository.deleteAll();
  }

  @Test
  void testGetAllCourses() {
    Course course1 = new Course(null, "Math", "101", "Basic Math");
    Course course2 = new Course(null, "Science", "102", "Basic Science");
    courseRepository.save(course1);
    courseRepository.save(course2);

    Set<Course> result = courseService.getAllCourses();

    assertEquals(2, result.size());
  }

  @Test
  void testSearchByDescription() {
    Course course1 = new Course(null, "Math", "101", "Basic Math");
    Course course2 = new Course(null, "Science", "102", "Advanced Science");
    courseRepository.save(course1);
    courseRepository.save(course2);

    Set<Course> result = courseService.searchByDescription("Science");

    assertEquals(1, result.size());
    assertTrue(result.contains(course2));
  }

  @Test
  void testSaveCourseSuccess() {
    Course course = new Course(null, "Math", "101", "Basic Math");

    Course savedCourse = courseService.saveCourse(course);

    assertNotNull(savedCourse.getId());
    assertEquals("Math", savedCourse.getSubject());
    assertEquals("101", savedCourse.getCourseNumber());
  }

  @Test
  void testSaveCourseDuplicate() {
    Course course1 = new Course(null, "Math", "101", "Basic Math");
    courseService.saveCourse(course1);

    Course course2 = new Course(null, "Math", "101", "Basic Math Duplicate");

    ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> courseService.saveCourse(course2));
    assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
    assertEquals("Course with the same subject and/or course number already exists.", exception.getReason());
  }

  @Test
  void testRemoveCourse() {
    Course course = new Course(null, "Math", "101", "Basic Math");
    Course savedCourse = courseService.saveCourse(course);
    Long courseId = savedCourse.getId();

    courseService.removeCourse(courseId);

    Optional<Course> deletedCourse = courseRepository.findById(courseId);
    assertFalse(deletedCourse.isPresent());
  }

}



