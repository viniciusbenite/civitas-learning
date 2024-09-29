import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { of } from 'rxjs';
import { CoursesComponent } from './courses.component';
import { CourseService } from '../service/CourseService';
import { CoursesResponse } from '../model/CoursesResponse';
import { MatDialogModule } from '@angular/material/dialog';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseService: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    const courseServiceSpy = jasmine.createSpyObj('CourseService', ['getCourses', 'searchCourses', 'removeCourse']);

    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: CourseService, useValue: courseServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;

    // Initialize the form control
    component.form = new FormGroup({
      input: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should search courses successfully', () => {
    // Mock the response from the searchCourses method
    const mockResponse: CoursesResponse = {
      total: 1,
      content: [{ id: 1, subject: 'Math', courseNumber: '101', description: 'Basic Math' }]
    };

    // Set up the spy to return the mock response
    courseService.searchCourses.and.returnValue(of(mockResponse));

    // Set the search input
    component.form.get('input')?.setValue('Math');

    // Call the searchCourses method
    component.searchCourses();

    // Verify the results
    expect(courseService.searchCourses).toHaveBeenCalledWith('Math');
    expect(component.totalCourses).toBe(1);
    expect(component.courses.length).toBe(1);
    expect(component.courses[0].subject).toBe('Math');
  });

  // it('should handle search error and call getCourses', () => {
  //   // Mock an error response
  //   courseService.searchCourses.and.returnValue(of({ error: 'Error occurred' }));
  //
  //   // Spy on getCourses to verify it's called after an error
  //   spyOn(component, 'getCourses');
  //
  //   // Set the search input
  //   component.form.get('input')?.setValue('Math');
  //
  //   // Call the searchCourses method
  //   component.searchCourses();
  //
  //   // Verify that getCourses is called after the error
  //   expect(component.getCourses).toHaveBeenCalled();
  // });
});
