import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import { Course } from "../model/Course";
import { CoursesResponse } from "../model/CoursesResponse";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl: string = "http://localhost:8080/api/v1/courses";

  constructor(private httpClient: HttpClient) { }

  public getCourses(): Observable<CoursesResponse> {
    return this.httpClient.get<CoursesResponse>(this.apiUrl);
  }

  searchCourses(description: string): Observable<CoursesResponse> {
    return this.httpClient.get<CoursesResponse>(`${this.apiUrl}/search?description=${description}`);
  }

  public saveCourse(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(this.apiUrl, course).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (err.status === 409) {
          errorMessage = 'Course with the same subject and/or course number already exists.';
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  public removeCourse(courseId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${courseId}`);
  }

}
