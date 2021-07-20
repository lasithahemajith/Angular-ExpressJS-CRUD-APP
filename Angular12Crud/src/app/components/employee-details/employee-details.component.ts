import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  currentEmployee: Employee = {
    name: '',
    nic: '',
    department_id: '',
  };
  message = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getEmployee(this.route.snapshot.params.id);
  }
  getEmployee(id: string): void {
    this.employeeService.get(id).subscribe(
      (data) => {
        this.currentEmployee = data;
        console.log(data);
        console.log('getting the employee succes!');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateEmployee(): void {
    const data = {
      name: this.currentEmployee.name,
      nic: this.currentEmployee.nic,
      department_id: this.currentEmployee.department_id,
      // description: this.currentTutorial.description,
      // published: status
    };

    this.message = '';

    this.employeeService
      .update(this.currentEmployee.employees_id, data)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = response.message
            ? response.message
            : 'This employee was updated successfully!';
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.employees_id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/employees']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
