import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-industry-add',
  templateUrl: './industry-add.component.html',
  styleUrls: ['./industry-add.component.css'],
})
export class IndustryAddComponent {
  registrationForm: FormGroup;
  id: number;
  update: boolean = false;
  other: boolean = false;
  data: any;
  username: string;
  attachment: File[] = new Array(2);
  role: string;
  reportData: any;
  errorAttachment1: boolean=false;
  errorAttachment2: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    private _snackBar: MatSnackBar
  ) {
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');

    this.registrationForm = this.formBuilder.group({
      industryName: ['', Validators.required],
      location: ['', Validators.required],
      contactInfo: ['', Validators.required],
      shortDescription: ['', Validators.required],
      type: ['', Validators.required],
      mission: ['', Validators.required],
      coreValues: ['', Validators.required],
      description: ['', Validators.required],
      vission: ['', Validators.required],
      leaderName: ['', Validators.required],
      position: ['', Validators.required],
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
checkImageValidity(fileName:string){
  return true;
}
  selectFile(event) {
    const file = event.target.files[0];

    if (this.isValidImageType(file)) {
      this.errorAttachment1=false;
      this.attachment[0] = file;
    } else {
      this.attachment[0] = null;
      this.errorAttachment1=true;
    }
  }
  selectPhoto(event) {
    const file = event.target.files[0];
    if (this.isValidImageType(file)) {
      this.attachment[1] = file;
      this.errorAttachment2=false;
    } else {
      this.attachment[1] = null;
      this.errorAttachment2=true;
    }
  
  }
  private isValidImageType(file: File): boolean {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedImageTypes.includes(file.type);
  }
  addIndustry() {
    if (this.registrationForm.valid && this.attachment[0]!=null && this.attachment[1]!=null) {
      const formData = new FormData();
      formData.append(
        'OtherIndustry',
        JSON.stringify(this.registrationForm.value)
      );
      formData.append('attachment', this.attachment[0]);
      formData.append('attachment', this.attachment[1]);

      this.service.createOtherIndustry(formData).subscribe(
        (resp) => {
          this.openSnackBar('Successfully Added!!!');
          this.attachment = null;
          this.registrationForm.reset();
        },
        (error) => {
          this.openSnackBar('Some Thing Wrong, Check Backend!!!');
        }
      );
    } else {
      this.openSnackBar('Please Fill the Form properly!!!');
    }
  }

  setEditData() {
    this.id = parseInt(sessionStorage.getItem('adminIndustryId'));
    if (this.id) {
      sessionStorage.removeItem('adminIndustryId');
      this.update = true;
      this.service.getIndustryById(this.id).subscribe((resp) => {
        console.log(resp);
        this.registrationForm.controls['industryName'].setValue(resp.industryName);
        this.registrationForm.controls['location'].setValue(resp.location);
        this.registrationForm.controls['contactInfo'].setValue(resp.contactInfo);
        this.registrationForm.controls['type'].setValue(resp.type);

        this.registrationForm.controls['leaderName'].setValue(resp.leaderName);
        this.registrationForm.controls['position'].setValue(resp.position);
        this.registrationForm.controls['mission'].setValue(resp.mission);
        this.registrationForm.controls['coreValues'].setValue(resp.coreValues);
        this.registrationForm.controls['description'].setValue(resp.description);
        this.registrationForm.controls['vission'].setValue(resp.vission);
        this.registrationForm.controls['shortDescription'].setValue(resp.shortDescription);
      });
    }
  }
  updateOtherIndustry() {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      formData.append(
        'OtherIndustry',
        JSON.stringify(this.registrationForm.value)
      );
      if (this.attachment != null) {
        formData.append('attachment1', this.attachment[0]);
        formData.append('attachment2', this.attachment[1]);
      }
      this.service.updateOtherIndustry(formData, this.id).subscribe(
        (resp) => {
          this.openSnackBar('Successfully Updated!!!');
          this.attachment = null;
          this.registrationForm.reset();
        },
        (error) => {
          this.openSnackBar('Some Thing Wrong, Check Backend!!!');
        }
      );
    } else {
      this.openSnackBar('Please Fill the Form properly!!!');
    }
  }

  ngOnInit() {
    this.setEditData();
  }
}
