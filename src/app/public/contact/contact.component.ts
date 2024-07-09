import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin-service/admin-service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private fb: FormBuilder, private service: AdminService, private _snackBar: MatSnackBar) {
    this.getSettings();
    this.contactForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      message: ['', Validators.required],
    })
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
  settingData: any;


  ngOnInit(): void {

  }
  getSettings(){
    this.service.getSettings().subscribe(resp=>{
      this.settingData=resp;
      console.log(this.settingData)

    })

}
  submit() {
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {
      this.service.createContactUs(this.contactForm.value).subscribe((response) => {
        this.openSnackBar("Your Inqury is Successfull Submitted Thank you!!!");
        this.contactForm.reset();
      }, (error) => {
        this.openSnackBar("Something Went Wrong on the Backend")
      })
    }

    else {
      this.openSnackBar("Please fill the required Forms")
    }
  }

}
