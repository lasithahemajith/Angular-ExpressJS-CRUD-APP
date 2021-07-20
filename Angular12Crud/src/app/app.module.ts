import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDepartmentComponent,
    DepartmentDetailsComponent,
    DepartmentsListComponent,
    AddEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeesListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
