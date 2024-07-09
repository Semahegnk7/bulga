import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/data-model/Department';
import { DepartmentService } from 'src/app/service/Department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent  implements OnInit{
  departmentForm:FormGroup;
  id:number;
  formData:any;
  update:boolean=false;
  constructor(private service:DepartmentService,private fb:FormBuilder){
this.departmentForm=this.fb.group({
  title:['',Validators.required],
  description:['',Validators.required]
})

  }
  ngOnInit(): void {
    this.setEditData();
  }
  addDepartment(){
    this.service.createDepartment(this.departmentForm.value).subscribe((resp)=>{
      alert("Successful")
    },error=>{
alert("some thing went wrong")
    });
    
  }
  setEditData(){
this.id=parseInt(sessionStorage.getItem("deptId")); 
sessionStorage.removeItem("deptId");
if(this.id){
  this.update=true
  this.service.getDepartmentById(this.id).subscribe((resp)=>{
this.formData=resp;
this.departmentForm.controls['title'].setValue(this.formData.title);
this.departmentForm.controls['description'].setValue(this.formData.description);
})
}

  }
  updateDept(){
   
    if(this.departmentForm.valid){
      const data:Department={
        id:this.id,title:this.departmentForm.controls['title'].value,
        description:this.departmentForm.controls['description'].value
      }

      this.service.updateDepartment(data,this.id).subscribe(resp=>{
        alert("successful")
        this.departmentForm.reset();
        this.update=false
            },error=>{
              alert("error")
            })
          }
    }
    

}
