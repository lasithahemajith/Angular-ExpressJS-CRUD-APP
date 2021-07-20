import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  department: Department = {
    department_name: '',
    published: false,
  };

  submitted = false;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {}

  saveDepartment(): void {
    const data = {
      department_name: this.department.department_name,
    };

    this.departmentService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newDepartment(): void {
    this.submitted = false;
    this.department = {
      department_name: '',
      published: false,
    };
  }
}
