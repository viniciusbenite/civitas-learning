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

    component.form = new FormGroup({
      input: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should search courses successfully', () => {
    const mockResponse: CoursesResponse = {
      total: 1,
      content: [{ id: 1, subject: 'Math', courseNumber: '101', description: 'Basic Math' }]
    };

    courseService.searchCourses.and.returnValue(of(mockResponse));

    component.form.get('input')?.setValue('Math');

    component.searchCourses();

    expect(courseService.searchCourses).toHaveBeenCalledWith('Math');
    expect(component.totalCourses).toBe(1);
    expect(component.courses.length).toBe(1);
    expect(component.courses[0].subject).toBe('Math');
  });

});
