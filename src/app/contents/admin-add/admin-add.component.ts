import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent {
  registrationForm: FormGroup;
  id: number;
  update: boolean = false;
  constructor(private formBuilder: FormBuilder, private service: AdminService,private _snackBar:MatSnackBar) {

    this.registrationForm = this.formBuilder.group({

      basicInformation: formBuilder.group({
        firstName: ['', Validators.required],
        middleName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{9,13}$/)]], 
        userName: ['', [Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/) ]],
        educationalLevel: ['', Validators.required],
        department: ['', Validators.required],
        employeeStatus: ['', Validators.required],
        position: ['', Validators.required]
      }),
      additionalInformation: this.formBuilder.group({
        experience: ['', Validators.required],
        role: ['ADMIN'],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        hireDate: ['', Validators.required],
        terminationDate: ['',],
        password:['',Validators.required]
      }),
    });
  }
  submitAdmin() {
    console.log(this.registrationForm.value)
    this.registrationForm.get('additionalInformation.role').setValue('ADMIN');
    
    if (this.registrationForm.valid) {
      
      const data:any = {
         firstName: this.registrationForm.controls['basicInformation'].value.firstName,
        middleName: this.registrationForm.controls['basicInformation'].value.middleName,
        lastName: this.registrationForm.controls['basicInformation'].value.lastName,
        userName: this.registrationForm.controls['basicInformation'].value.userName,
        phone: this.registrationForm.controls['basicInformation'].value.phone,
        educationalLevel: this.registrationForm.controls['basicInformation'].value.educationalLevel,
        department: this.registrationForm.controls['basicInformation'].value.department,
        employeeStatus: this.registrationForm.controls['basicInformation'].value.employeeStatus,
        position: this.registrationForm.controls['basicInformation'].value.position,

        experience: this.registrationForm.controls['additionalInformation'].value.experience,
        gender: this.registrationForm.controls['additionalInformation'].value.gender,
        role: "ADMIN",
        address: this.registrationForm.controls['additionalInformation'].value.address,
        dateOfBirth: this.registrationForm.controls['additionalInformation'].value.dateOfBirth,
        hireDate: this.registrationForm.controls['additionalInformation'].value.hireDate,
        terminationDate: this.registrationForm.controls['additionalInformation'].value.terminationDate,
        password: this.registrationForm.controls['additionalInformation'].value.password,
      } 
      this.service.createUser(data).subscribe(resp => {

        this.getAdmins();

        this.openSnackBar("SuccessFull Registered");
        this.registrationForm.reset();
      },error=>{
        this.openSnackBar("SomeThing Went Wrong");
      });

    }
    else {
      this.openSnackBar("Please fill the forms properly")
    }


  }

  data: any;
  getAdmins() {
    this.service.getUsers().subscribe(resp => {
      this.data = resp;
      console.log(resp)
    })
  }
  deptData:any;
/*   getDepartments(){
    this.service.getDepartments().subscribe((resp)=>{
      this.deptData=resp;
    }); */
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    openSnackBar(msg) {
      this._snackBar.open(msg, '', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  ngOnInit() {
    this.getAdmins();
    this.setEditedData();
  }

  

  setEditedData() {
    this.id = parseInt(sessionStorage.getItem("adminId"))
    sessionStorage.removeItem("adminId");
   

    if (this.id) {
      this.update = true;
      this.service.getUserById(this.id).subscribe(resp => {
        this.data = resp;

        this.registrationForm.get('basicInformation.firstName').setValue(this.data.firstName)
        this.registrationForm.get('basicInformation.firstName').setValue(this.data.firstName);
        this.registrationForm.get('basicInformation.middleName').setValue(this.data.middleName);
        this.registrationForm.get('basicInformation.lastName').setValue(this.data.lastName);
        this.registrationForm.get('basicInformation.userName').setValue(this.data.userName);
        this.registrationForm.get('basicInformation.phone').setValue(this.data.phone);
        this.registrationForm.get('basicInformation.educationalLevel').setValue(this.data.educationalLevel);
        this.registrationForm.get('basicInformation.department').setValue(this.data.department);
        this.registrationForm.get('basicInformation.employeeStatus').setValue(this.data.employeeStatus);
        this.registrationForm.get('basicInformation.position').setValue(this.data.position);


        this.registrationForm.get('additionalInformation.experience').setValue(this.data.experience);
        this.registrationForm.get('additionalInformation.gender').setValue(this.data.gender);
        this.registrationForm.get('additionalInformation.address').setValue(this.data.address);
        this.registrationForm.get('additionalInformation.password').setValue(this.data.password);
        this.registrationForm.get('additionalInformation.dateOfBirth').setValue(this.data.dateOfBirth);
        this.registrationForm.get('additionalInformation.hireDate').setValue(this.data.hireDate);
        this.registrationForm.get('additionalInformation.terminationDate').setValue(this.data.terminationDate);




      });

    }
  }

  updateInfo() {
    this.registrationForm.get('additionalInformation.role').setValue('ADMIN');
    if (this.registrationForm.valid) {
      const data: any = {
        id: this.id,
        firstName: this.registrationForm.controls['basicInformation'].value.firstName,
        middleName: this.registrationForm.controls['basicInformation'].value.middleName,
        lastName: this.registrationForm.controls['basicInformation'].value.lastName,
        userName: this.registrationForm.controls['basicInformation'].value.userName,
        phone: this.registrationForm.controls['basicInformation'].value.phone,
        educationalLevel: this.registrationForm.controls['basicInformation'].value.educationalLevel,
        department: this.registrationForm.controls['basicInformation'].value.department,
        employeeStatus: this.registrationForm.controls['basicInformation'].value.employeeStatus,
        position: this.registrationForm.controls['basicInformation'].value.position,

        experience: this.registrationForm.controls['additionalInformation'].value.experience,
        gender: this.registrationForm.controls['additionalInformation'].value.gender,
        role: "ADMIN",
        address: this.registrationForm.controls['additionalInformation'].value.address,
        dateOfBirth: this.registrationForm.controls['additionalInformation'].value.dateOfBirth,
        hireDate: this.registrationForm.controls['additionalInformation'].value.hireDate,
        terminationDate: this.registrationForm.controls['additionalInformation'].value.terminationDate,
      }
      this.service.updateUser(data, this.id).subscribe(resp => {

        this.openSnackBar("SuccessFully Updated")
        this.update = false;
        this.registrationForm.reset();
      });

    } else {
      this.openSnackBar("Please fill the form properly!!!");
    }
  }
}
