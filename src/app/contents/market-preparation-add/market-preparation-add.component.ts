import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-market-preparation-add',
  templateUrl: './market-preparation-add.component.html',
  styleUrls: ['./market-preparation-add.component.css']
})
export class MarketPreparationAddComponent {


  registrationForm: FormGroup;
  id: number;
  update: boolean = false;
  other: boolean = false;
  data: any;
  constructor(private formBuilder: FormBuilder, private service: AdminService,private _snackBar: MatSnackBar) {

    this.registrationForm = this.formBuilder.group({

        firstName: ['', Validators.required],
        middleName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{9,13}$/)]], 
        userName: ['', [Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/) ]],
        password: ['', Validators.required],
        address: ['', Validators.required],
        department: ['',],
        role:['MARKET_PREPARATION'],
        gender:['',Validators.required]
       
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
  RegisterJobSeeker() {
    console.log(this.registrationForm.value)
    
    if (this.registrationForm.valid) {

      this.service.createUser(this.registrationForm.value).subscribe(resp => {
        this.openSnackBar('Successfully Added!!!');
        this.registrationForm.reset();
      }, error => {
        this.openSnackBar('Some Thing Wrong, Check Backend!!!');
      });

    }
    else {
      this.openSnackBar('Please Fill the Form properly!!!');
    }


  }

  
  setEditData(){
    this.id=parseInt(sessionStorage.getItem("userId"));
    if (this.id) {
      sessionStorage.removeItem("userId");
      this.update = true;
      this.service.getUserById(this.id).subscribe(resp => {
        this.registrationForm.controls['firstName'].setValue(resp.firstName);
        this.registrationForm.controls['middleName'].setValue(resp.middleName);
        this.registrationForm.controls['lastName'].setValue(resp.lastName);
        this.registrationForm.controls['userName'].setValue(resp.userName);
        this.registrationForm.controls['phone'].setValue(resp.phone);
        this.registrationForm.controls['gender'].setValue(resp.gender);
        this.registrationForm.controls['department'].setValue(resp.department);
        this.registrationForm.controls['address'].setValue(resp.address);
         this.registrationForm.controls['password'].setValue(resp.password);

              });

    }
  }
  updateUser(){
    if(this.registrationForm.valid){
      this.service.updateUser(this.registrationForm.value,this.id).subscribe((resp)=>{
this.openSnackBar("Updated Successfully!!!")
      },(error)=>{
        this.openSnackBar('Some Thing Wrong, Check Backend!!!');
      })
    }
    else{
      this.openSnackBar('Please Fill the Form properly!!!');
    }
  }

  ngOnInit() {
    this.setEditData();

  }

}
