import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  @Input() employee: any;
  constructor(public employeeService: EmployeeService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id).subscribe(res => {console.log(res); this.employee = res['employee']});
  }

}
