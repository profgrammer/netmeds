import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() employee: any;

  editEmployee: FormGroup;
  allSkills: string[];
  skills: string[];
  submitted: boolean = false;
  success: boolean = false;
  photoRemoved = false;
  imageUrl: string;
  photoChanged: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private location: Location,
    private route: ActivatedRoute,
    private builder: FormBuilder
    ) { }

  ngOnInit() {
    this.editEmployee = this.builder.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      skills: [''],
      dob: ['', Validators.required],
      profilePhoto: [''],
    });

    var id: string = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id).subscribe(employee => {
      console.log(employee); 
      this.employee = employee['employee'];
      this.skills = this.employee['skills'];
      this.editEmployee.get('name').setValue(this.employee.name);
      this.editEmployee.get('salary').setValue(this.employee.salary);
      this.editEmployee.get('dob').setValue(this.employee.dob);
      this.imageUrl = this.employeeService.image_url + this.employee.profilePhoto;
    });
  }

  modifySkills(skill: string, checked: boolean){
    if(!checked) this.skills = this.skills.filter(s => s !== skill);
    else this.skills.push(skill);
    console.log(this.skills);
  }
  
  onFileSelect(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.editEmployee.get('profilePhoto').setValue(file);
      this.photoRemoved = false;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => { 
        this.imageUrl = reader.result.toString(); 
      }
      this.photoRemoved = false;
      this.photoChanged = true;
      console.log(this.photoRemoved);
    }
  }

  removePhoto(){
    this.editEmployee.get('profilePhoto').setValue(null);
    this.imageUrl = null;
    this.photoRemoved = true;
    console.log(this.photoRemoved);
  }

  goBack(): void{
    this.location.back();
  }

  deleteEmployee(employee){
    this.employeeService.deleteEmployee(employee).subscribe(res => this.goBack());
  }

  submitForm(){
    this.submitted = true;
    if(this.editEmployee.invalid) return;
    var formData = new FormData();
    formData.append('name', this.editEmployee.get('name').value);
    formData.append('salary', this.editEmployee.get('salary').value);
    formData.append('dob', this.editEmployee.get('dob').value);
    for (var i = 0;i < this.skills.length;i++){
      formData.append(`skills[${i}]`, this.skills[i]);
    }
    if(this.photoRemoved) {console.log("Remove photo"); formData.append('removeDp', 'true');}
    else if(this.photoChanged){
      formData.append('profilePhoto', this.editEmployee.get('profilePhoto').value);
    }
    this.employeeService.editEmployee(formData, this.employee._id).subscribe(
      res => {this.success = true; console.log(res); alert("Successfully updated")},
      err => console.log(err)
    )
  }  

}
