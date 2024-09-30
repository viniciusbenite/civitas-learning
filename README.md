# Civitas

This application allows users to manage courses by providing functionality to search, add, and delete courses. It also includes input validation and duplicate prevention.

## Features

- **Search Courses**: Users can search for a course by partial or full description (e.g., typing "Bio" will find "Introduction to Biology").
- **Delete a Course**: Users can delete a course from the list of courses.
- **Insert a New Course**: Users can add a new course, provided it meets validation rules.
- **Validation Rules**:
  - **Course Number** must be a three-digit, zero-padded integer (e.g., "033").
  - Prevent inserting duplicate courses based on a combination of **subject** and **course number**.

---

## Getting Started

### Prerequisites

Before using the application, ensure that the following are set up:

- **Backend**: Spring Boot backend service for handling course data.
- **Frontend**: Angular to interact with the backend.
- **Database**: An in-memory H2 database is configured with pre-loaded data for test purpouses.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/course-management.git
2. Go to the application folder and use docker compose to start the application:
   ```bash
   docker-compose build && docker-compose up
3. Alternatively, compile and run the backend repository using Maven and frontend repository using npm.
4. Go to localhost:4200 to access the application.

### Usage
1. Search for a Course
    Steps:
        - Navigate to the search bar in the application.
   
        - Enter a keyword (e.g., "Bio") and press Enter or click "Search".
   
        - The system will display matching courses based on your keyword input.

3. Insert a New Course
    Steps:
       - Navigate to the "Add New Course" form.
   
       - Fill in the following fields:
            Description: Full name of the course (e.g., "Introduction to Physics").
            Subject: The subject of the course (e.g., "PHY").
            Course Number: A three-digit, zero-padded number (e.g., "101").

   - Click "Add" to submit.

5. Delete a Course
    Steps:
        - Search for the course or locate it in the course list.
   
        - Click the "Delete" button next to the course.
   
        - Confirm the deletion in the popup dialog.

### Validation Rules

    Course Number: The course number must be exactly three digits and zero-padded.
        Examples:
            "101" → Valid
            "033" → Valid
            "33" → Invalid (will raise: "Course number must be a three-digit, zero-padded integer.")

    Duplicate Courses: A course is considered a duplicate if the same subject and course number combination exists.
        Example:
            Adding Physics 101 when Physics 101 already exists will raise an error: "Duplicate course: A course with this subject and number already exists."
