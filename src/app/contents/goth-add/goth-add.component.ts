import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';
@Component({
  selector: 'app-goth-add',
  templateUrl: './goth-add.component.html',
  styleUrls: ['./goth-add.component.css'],
})
export class GothAddComponent {
  departmentForm: FormGroup;
  id: number;
  formData: any;
  update: boolean = false;
  kebeles: any;
  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.departmentForm = this.fb.group({
      gothName: ['', Validators.required],
      kebeleName: ['', Validators.required],
      description: ['', Validators.required],
      id: [''],
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
    this.getKebeles();
    this.setEditData();
  }
  addDepartment() {
    console.log(this.departmentForm.value);
    if (this.departmentForm.valid) {
      this.service.createGoth(this.departmentForm.value).subscribe(
        (resp) => {
          this.openSnackBar('Congratulation! Successfully Submited!!!');
        },
        (error) => {
          this.openSnackBar('Error! Please check your backend!!!');
        }
      );
    } else {
      this.openSnackBar('Please fill the required fields!!!');
    }
  }
  setEditData() {
    this.id = parseInt(sessionStorage.getItem('gothId'));
    sessionStorage.removeItem('gothId');
    if (this.id) {
      this.update = true;
      this.service.getGothById(this.id).subscribe((resp) => {
        this.formData = resp;
        this.departmentForm.controls['gothName'].setValue(
          this.formData.gothName
        );
        this.departmentForm.controls['kebeleName'].setValue(
          this.formData.kebeleName
        );
        this.departmentForm.controls['description'].setValue(
          this.formData.description
        );
      });
    }
  }
  getKebeles() {
    this.service.getKebeles().subscribe((resp) => {
      this.kebeles = resp;
    });
  }
  updateDept() {
    if (this.departmentForm.valid) {
      this.departmentForm.controls['id'].setValue(this.id);
      this.service.updateGoth(this.departmentForm.value).subscribe(
        (resp) => {
          this.openSnackBar('Goth Successfully Updated!!!');
          this.departmentForm.reset();
          this.update = false;
        },
        (error) => {
          this.openSnackBar('Error!!! ' + error + ' 403 FORBIDDEN');
        }
      );
    }
  }
}
