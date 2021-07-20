import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'department', pathMatch: 'full' },

  { path: 'department', component: DepartmentsListComponent },
  { path: 'department/:id', component: DepartmentDetailsComponent },
  { path: 'adddepartment', component: AddDepartmentComponent },

  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'addemployee', component: AddEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

/*@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})*/
export class AppRoutingModule {}
