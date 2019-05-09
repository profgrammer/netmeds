import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arr = Array;
  employees: any[] = [];
  pages: number;
  @Input() searchTerm: string;
  @Input() num;
  currentPage: number;
  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.reset();
  }

  reset():void{
    this.getEmployees();
    this.num = 5;
    this.currentPage = 1;
    this.searchTerm = "";
  }

  changePage(index: number): void{
    this.employeeService.getPaginatedEmployees(index, this.num).subscribe(employees => {
      window.scroll(0,0);
      console.log(employees);
      this.employees = employees['employees']['docs'];
      this.pages = employees['employees']['pages'];
      this.currentPage = index;
      console.log(this.employees);
    });
  }

  getEmployees():void{
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees['employees']['docs'];
      this.pages = employees['employees']['pages'];
      console.log(this.employees);
    });
  }

  deleteEmployee(employee: any):void{
    this.employees = this.employees.filter(e => e['_id'] !== employee['_id']);
    console.log(this.employees);
    this.employeeService.deleteEmployee(employee).subscribe(
      res => {alert("Successfully deleted")},
      err => console.log(err)
    );
  }

  searchEmployees(): void{
    console.log(this.searchTerm);
    if(!this.searchTerm.trim()) return;
    this.employeeService.searchEmployee(this.searchTerm).subscribe(
      employees => { 
        console.log(employees); 
        this.employees = employees;
        this.pages = 1;
      }
    )
  }

  clear():void{
    this.reset();
  }

  changeList():void{
    this.employeeService.getPaginatedEmployees(1, this.num).subscribe(employees => {
      console.log(employees);
      this.employees = employees['employees']['docs'];
      this.pages = employees['employees']['pages'];
      this.currentPage = 1;
      console.log(this.employees);
    });
  }

}



