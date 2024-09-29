import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Course} from "../model/Course";
import {CourseService} from "../service/CourseService";

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrl: './add-course-dialog.component.css'
})
export class AddCourseDialogComponent {

  form!: FormGroup;
  responseError: string = '';

  constructor(private dialogRef: MatDialogRef<AddCourseDialogComponent>,
              private formBuilder: FormBuilder,
              private courseService: CourseService,) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      courseNumber: ['', [Validators.required, Validators.pattern(/^\d{3}$/)] ],
      description: ['', Validators.required]
    });
  }

  onAdd(): void {
    if (this.form.valid) {
      const course: Course = {
        subject: this.form.get('subject')?.value,
        courseNumber: this.form.get('courseNumber')?.value,
        description: this.form.get('description')?.value,
      }

      this.courseService.saveCourse(course).subscribe({
        next: (response) => {
          this.dialogRef.close({ success: true });
        },
        error: (err) => {
          console.error('Save course failed', err);
          this.responseError = err.message;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  validate(): void {

  }

  get courseNumber() {
    return this.form.get('courseNumber');
  }

}
