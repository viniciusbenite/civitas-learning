CREATE TABLE COURSE (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255),
    course_number VARCHAR(255),
    description VARCHAR(255),
    CONSTRAINT unique_subject UNIQUE (subject),
    CONSTRAINT unique_course_number UNIQUE (course_number)
);
