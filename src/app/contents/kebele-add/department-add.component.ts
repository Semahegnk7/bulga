import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css'],
})
export class DepartmentAddComponent implements OnInit {
  departmentForm: FormGroup;
  id: number;
  formData: any;
  update: boolean = false;
  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.departmentForm = this.fb.group({
      kebeleName: ['', Validators.required],
      description: ['', Validators.required],
      id:[''],
    });
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  ngOnInit(): void {
    this.setEditData();
  }
  addDepartment() {
    console.log(this.departmentForm.value)
    if(this.departmentForm.valid){
      this.service.createKebele(this.departmentForm.value).subscribe(
        (resp) => {
          this.openSnackBar('Congratulation! Successfully Submited!!!');
        },
        (error) => {
          this.openSnackBar('Error! Please check your backend!!!');
        }
      );
    }else{
      this.openSnackBar("Please fill the required fields!!!");
    }
   
  }
  setEditData() {
    this.id = parseInt(sessionStorage.getItem('kebeleId'));
    sessionStorage.removeItem('kebeleId');
    if (this.id) {
      this.update = true;
      this.service.getKebeleById(this.id).subscribe((resp) => {
        this.formData = resp;
        this.departmentForm.controls['kebeleName'].setValue(this.formData.kebeleName);
        this.departmentForm.controls['description'].setValue(
          this.formData.description
        );
      });
    }
  }
  updateDept() {
    if (this.departmentForm.valid) {
      this.departmentForm.controls['id'].setValue(this.id);
      this.service.updateKebele(this.departmentForm.value).subscribe(
        (resp) => {
          this.openSnackBar("Kebele Successfully Updated!!!")
          this.departmentForm.reset();
          this.update = false;
        },
        (error) => {
          this.openSnackBar("Error!!! "+error+" 403 FORBIDDEN");
        }
      );
    }
  }
}
