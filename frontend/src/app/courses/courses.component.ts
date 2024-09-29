import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { Course } from "../model/Course";
import { CourseService } from "../service/CourseService";
import { catchError, map, of, Subscription } from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddCourseDialogComponent} from "../add-course-dialog/add-course-dialog.component";
import {CoursesResponse} from "../model/CoursesResponse";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  courses: Course[] = [];
  totalCourses: number = 0;

  deleteResponse: string = '';

  form: FormGroup = new FormGroup({
    input: new FormControl(''),
  });

  displayedColumns: string[] = ['actions', 'id', 'subject', 'courseNumber', 'description'];

  constructor(private addCourseDialog: MatDialog,
              private courseService: CourseService,) {  }

  ngOnInit(): void {
    this.getCourses(); // initial load


  }

  getCourses(): Subscription {
    return this.courseService.getCourses().pipe(
      map((response: CoursesResponse) => {
        this.totalCourses = response.total;
        this.courses = response.content;
      }),
      catchError(err => {
        console.log('Error fetching courses.', err)

        return of([]);
      })
    ).subscribe();
  }

  searchCourses(): Subscription {
    const searchParam = this.form.get('input')?.value || '';
    console.log(searchParam);

    return this.courseService.searchCourses(searchParam).pipe(
      map((response: CoursesResponse) => {
        this.totalCourses = response.total;
        this.courses = response.content;
      }),
      catchError(err => {
        console.log('Error filtering courses.', err)
        this.getCourses();

        return of([]);
      })
    ).subscribe();
  }

  onAddCourseClick(): void {
    const dialogRef = this.addCourseDialog.open(AddCourseDialogComponent, {
      width: '75%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Call foobar if the dialog result indicates success
        this.getCourses();
      }
    });
  }

  onRemoveCourseClick(courseId: string): void {
    console.log(courseId);
    this.courseService.removeCourse(courseId).pipe(
      map(response => {
        console.log('Course deleted.', response);
        this.getCourses();
      }),
      catchError(err => {
        console.log('Error deleting course.', err);

        return of();
      })
    ).subscribe();
  }

}
