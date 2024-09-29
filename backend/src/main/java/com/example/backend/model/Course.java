package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "COURSE", uniqueConstraints = {
  @UniqueConstraint(columnNames = {"subject", "courseNumber"})
})
@NoArgsConstructor
@AllArgsConstructor
public class Course {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull(message = "Subject cannot be null")
  private String subject;

  @NotNull(message = "courseNumber cannot be null")
  @Pattern(regexp = "^\\d{3}$", message = "courseNumber must be formatted as a three-digit, zero-padded integer")
  private String courseNumber;

  @NotNull(message = "description cannot be null")
  private String description;
}
