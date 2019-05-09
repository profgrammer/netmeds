import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  skills: string[] = [];
  submitted: boolean = false;
  success: boolean = false;
  addEmployee: FormGroup;
  constructor(public employeeService: EmployeeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addEmployee = this.formBuilder.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      skills: [''],
      dob: ['', Validators.required],
      profilePhoto: ['']
    });
  }

  onFileSelect(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.addEmployee.get('profilePhoto').setValue(file);
    }
  }

  dateChange(event){
    console.log(event.target.value);
  }

  modifySkills(skill, checked): void{
    if(checked) this.skills.push(skill);
    else this.skills = this.skills.filter(s => s !== skill);
  }

  submitForm(): void{
    
    this.submitted = true;
    if(this.addEmployee.invalid) return;
    this.success = true;
    var formData = new FormData();
    formData.append('name', this.addEmployee.get('name').value);
    formData.append('salary', this.addEmployee.get('salary').value);
    formData.append('dob', this.addEmployee.get('dob').value);
    for (var i = 0;i < this.skills.length;i++){
      formData.append(`skills[${i}]`, this.skills[i]);
    }
    if(typeof this.addEmployee.get('profilePhoto') !== 'string'){
      formData.append('profilePhoto', this.addEmployee.get("profilePhoto").value);
    }
    this.employeeService.addEmployee(formData).subscribe(res => {
      if(res) {this.success = true; alert("Added successfully")}
    })
  }

}
