import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {
  departments?: Department[];
  currentDepartment: Department = {};
  currentIndex = -1;
  name = '';

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.retrieveDepartments();
  }
  retrieveDepartments(): void {
    this.departmentService.getAll().subscribe(
      (data) => {
        this.departments = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveDepartments();
    this.currentDepartment = {};
    this.currentIndex = -1;
  }

  setActiveDepartment(department: Department, index: number): void {
    this.currentDepartment = department;
    this.currentIndex = index;
  }

  removeAllDepartments(): void {
    this.departmentService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchName(): void {
    this.currentDepartment = {};
    this.currentIndex = -1;

    this.departmentService.findByName(this.name).subscribe(
      (data) => {
        this.departments = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
