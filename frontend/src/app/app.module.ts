import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from "./courses/courses.component";
import { AppRoutingModule } from "./app.routing.module";
import { BrowserModule } from "@angular/platform-browser";
import {MatToolbar} from "@angular/material/toolbar";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {provideHttpClient} from "@angular/common/http";
import {AddCourseDialogComponent} from "./add-course-dialog/add-course-dialog.component";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    AddCourseDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatToolbar,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    ReactiveFormsModule,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatInput,
    MatLabel,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatError
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
