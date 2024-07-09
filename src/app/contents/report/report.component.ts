import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  registrationForm: FormGroup;
  id: number;
  update: boolean = false;
  other: boolean = false;
  data: any;
  username: string;
  attachment: File = null;
  role: string;
  reportData:any;
  constructor(private formBuilder: FormBuilder, private service: AdminService,private _snackBar: MatSnackBar) {
    this.username = sessionStorage.getItem('username');
    this.role=sessionStorage.getItem('role')

    this.registrationForm = this.formBuilder.group({

        name: ['', Validators.required],
        remark: ['', Validators.required],
        uploadedBy: [this.username],
        siraHidet:[this.role],
         office:['Trained and Employee'],
        woreda:['Bulga City'],
        zone:['North Shewa'],
       
      });
     
this.registrationForm.controls['uploadedBy'].disable();   
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
    selectFile(event){
      const file = event.target.files[0];
      this.attachment = file;
    }
    setDefaultValue(){
      this.registrationForm.controls['office'].setValue('Trained and Employee');
      this.registrationForm.controls['woreda'].setValue('Bulga City'); 
       this.registrationForm.controls['zone'].setValue('North Shewa');

    }
    addReport() {
  
    if (this.registrationForm.valid && this.attachment != null) {
      this.registrationForm.controls['uploadedBy'].enable(); 
      const formData = new FormData();
      formData.append("report",JSON.stringify(this.registrationForm.value));
      formData.append("attachment",this.attachment);

      this.service.createReport(formData).subscribe(resp => {
        this.openSnackBar('Successfully Added!!!');
        this.registrationForm.controls['uploadedBy'].disable(); 
        this.attachment=null;
        this.registrationForm.reset();
        this.setDefaultValue();
      }, error => {
        this.registrationForm.controls['uploadedBy'].disable();         
        this.openSnackBar('Some Thing Wrong, Check Backend!!!');
      });

    }
    else {
      this.openSnackBar('Please Fill the Form properly!!!');
    }


  }

  
  setEditData(){
    this.id=parseInt(sessionStorage.getItem("reportId"));
    if (this.id) {
      sessionStorage.removeItem("reportId");
      this.update = true;
      this.service.getReportById(this.id).subscribe(resp => {
        this.registrationForm.controls['name'].setValue(resp.name);
        this.registrationForm.controls['remark'].setValue(resp.remark);
        this.registrationForm.controls['uploadedBy'].setValue(resp.uploadedBy);
        this.registrationForm.controls['siraHidet'].setValue(resp.siraHidet);
        if(resp.attachment)
        this.registrationForm.controls['attachment'].setValue(resp.attachment);
              });

    }
  }
  updateReport(){
    if (this.registrationForm.valid ) {
      this.registrationForm.controls['uploadedBy'].enable(); 
      const formData = new FormData();
      formData.append("report",JSON.stringify(this.registrationForm.value));
      formData.append("attachment",this.attachment);
      this.service.updateReport(formData,this.id).subscribe(resp => {
        this.openSnackBar('Successfully Updated!!!');
        this.registrationForm.controls['uploadedBy'].disable(); 
        this.attachment=null;
        this.registrationForm.reset();
        this.setDefaultValue();
        
      }, error => {
        this.registrationForm.controls['uploadedBy'].disable();         
        this.openSnackBar('Some Thing Wrong, Check Backend!!!');
      });

    }
    else {
      this.openSnackBar('Please Fill the Form properly!!!');
    }
  }

  ngOnInit() {
    this.setEditData();

  }

}
