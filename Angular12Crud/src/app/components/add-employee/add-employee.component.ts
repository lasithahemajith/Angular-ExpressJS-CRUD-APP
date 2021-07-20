import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    name: '',
    nic: '',
    department_id: '',
    //published: false,
  };
  submitted = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  saveEmployee(): void {
    console.log(`response`);
    const data = {
      name: this.employee.name,
      nic: this.employee.nic,
      department_id: this.employee.department_id,
    };

    this.employeeService.create(data).subscribe(
      (response) => {
        console.log(response);

        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      name: '',
      nic: '',
      department_id: '',
      //published: false,
    };
  }
}
