import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
})
export class DepartmentDetailsComponent implements OnInit {
  currentDepartment: Department = {
    department_name: '',
    published: false,
  };
  message = '';

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getDepartment(this.route.snapshot.params.id);
  }

  getDepartment(id: string): void {
    this.departmentService.get(id).subscribe(
      (data) => {
        this.currentDepartment = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /*
  updatePublished(status: boolean): void {
    const data = {
      title: this.currentDepartment.department_name,
      published: status,
    };

    this.message = '';

    this.departmentService
      .update(this.currentDepartment.department_id, data)
      .subscribe(
        (response) => {
          this.currentDepartment.published = status;
          console.log(response);
          this.message = response.message
            ? response.message
            : 'The status was updated successfully!';
        },
        (error) => {
          console.log(error);
        }
      );
  }*/
  updateDepartment(): void {
    const data = {
      department_name: this.currentDepartment.department_name,
      //published: status,
    };

    this.message = '';

    this.departmentService
      .update(this.currentDepartment.department_id, data)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = response.message
            ? response.message
            : 'This department was updated successfully!';
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteDepartment(): void {
    this.departmentService
      .delete(this.currentDepartment.department_id)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/department']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
