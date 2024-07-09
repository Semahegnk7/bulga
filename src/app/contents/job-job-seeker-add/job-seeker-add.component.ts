import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-job-seeker-add',
  templateUrl: './job-seeker-add.component.html',
  styleUrls: ['./job-seeker-add.component.css'],
  providers: [DatePipe],
})
export class JobJobSeekerAddComponent {
  registrationForm: FormGroup;
  id: number;
  submit:boolean=false;
  update: boolean = false;
  other: boolean = false;
  kebeles: any;
  goths: any;
  kebele: string;
  data: any;
  fileInputDesc: string;
  jobSeekerLetter: File = null;
  empStatus: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
  ) {
    this.currentDate = this.getCurrentDate();

    this.registrationForm = this.formBuilder.group({
      basicInformation: formBuilder.group({
        firstName: ['', Validators.required],
        middleName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{9,13}$/)]],
        userName: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/),
          ],
        ],
        educationalLevel: ['', Validators.required],
        department: [''],
        graduatedDate: ['', Validators.required],
        graduatedAt: ['', Validators.required],
        kebeleName: ['', Validators.required],
        gothName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
      }),
      additionalInformation: this.formBuilder.group({
        experience: [''],
        role: ['SEEKER'],
        gender: ['', Validators.required],
        password: [''],
        employeeStatus: ['SEEKER', Validators.required],
        description: [''],
        jobSeekerLetter: [''],
        houseWife: [''],
        isDisabled: [''],
        returnFromArab: [''],
        registrationDate: [this.currentDate],
      }),
    });
  }
  currentDate: string;
  getCurrentDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'yyyy-MM-dd');
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
  onSelectFile(event) {
    const file = event.target.files[0];
    this.fileInputDesc = event.target.files[0].name;
    this.jobSeekerLetter = file;
  }
  updateJobSeeker() {
    const basicInformationGroup = this.registrationForm.get('basicInformation');
    if(this.changeGraduatedDate)
    if (basicInformationGroup) {
      const graduatedDateControl = basicInformationGroup.get('graduatedDate');
      if (graduatedDateControl) {
        graduatedDateControl.setValue(this.graduatedDateFormate);
      }
      const birthDateControl = basicInformationGroup.get('dateOfBirth');
      if(this.changeBirthDate)
      if (birthDateControl) {
        birthDateControl.setValue(this.dateOfBirthFormate);
      }
    }
    if (this.registrationForm.valid) {
      const data: any = {
        firstName:
          this.registrationForm.controls['basicInformation'].value.firstName,
        middleName:
          this.registrationForm.controls['basicInformation'].value.middleName,
        lastName:
          this.registrationForm.controls['basicInformation'].value.lastName,
        userName:
          this.registrationForm.controls['basicInformation'].value.userName,
        phone: this.registrationForm.controls['basicInformation'].value.phone,
        educationalLevel:
          this.registrationForm.controls['basicInformation'].value
            .educationalLevel,
        department:
          this.registrationForm.controls['basicInformation'].value.department,
        dateOfBirth:
          this.registrationForm.controls['basicInformation'].value.dateOfBirth,
        graduatedDate:
          this.registrationForm.controls['basicInformation'].value
            .graduatedDate,
        graduatedAt:
          this.registrationForm.controls['basicInformation'].value.graduatedAt,
        kebeleName:
          this.registrationForm.controls['basicInformation'].value.kebeleName,
        gothName:
          this.registrationForm.controls['basicInformation'].value.gothName,
        experience:
          this.registrationForm.controls['additionalInformation'].value
            .experience,
        gender:
          this.registrationForm.controls['additionalInformation'].value.gender,
        role: 'JOB_SEEKER',
        jobSeekerLetter:
          this.registrationForm.controls['additionalInformation'].value
            .jobSeekerLetter,
        password:
          this.registrationForm.controls['additionalInformation'].value
            .password,
        employeeStatus:this.empStatus,
        description:
          this.registrationForm.controls['additionalInformation'].value
            .description,

        houseWife:
          this.registrationForm.controls['additionalInformation'].value
            .houseWife,
        isDisabled:
          this.registrationForm.controls['additionalInformation'].value
            .isDisabled,
        returnFromArab:
          this.registrationForm.controls['additionalInformation'].value
            .returnFromArab,
      };
      this.service.updateJobSeeker(data, this.id).subscribe(
        (resp) => {
          this.openSnackBar('Successfully Updated');
        },
        (error) => {
          this.openSnackBar('Something Went Wrong, Check Backend');
        }
      );
    } else {
      this.openSnackBar('Please fill the form properly');
    }
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  // Function to handle changes in the date of birth input
  dateOfBirthFormate: string = null;
  graduatedDateFormate: string = null;
  changeBirthDate:boolean=false;
  changeGraduatedDate:boolean=false;
  onDateOfBirthChange(event: any, formControlName: string): void {
    const selectedDate: Date = event.value;
    if (formControlName === 'dateOfBirth') {
      this.changeBirthDate=true;
      this.dateOfBirthFormate = this.formatDate(selectedDate);
    }
    if (formControlName === 'graduatedDate') {
      this.changeGraduatedDate=true;
      this.graduatedDateFormate = this.formatDate(selectedDate);
    }
  }
  RegisterJobSeeker() {
    const basicInformationGroup = this.registrationForm.get('basicInformation');
    if (basicInformationGroup) {
      const graduatedDateControl = basicInformationGroup.get('graduatedDate');
      if (graduatedDateControl) {
        graduatedDateControl.setValue(this.graduatedDateFormate);
      }
      const birthDateControl = basicInformationGroup.get('dateOfBirth');
      if (birthDateControl) {
        birthDateControl.setValue(this.dateOfBirthFormate);
      }
    }
    this.registrationForm.get('additionalInformation.employeeStatus').setValue('SEEKER');
    if (this.registrationForm.valid && this.jobSeekerLetter!=null) {
      const data: any = {
        firstName:
          this.registrationForm.controls['basicInformation'].value.firstName,
        middleName:
          this.registrationForm.controls['basicInformation'].value.middleName,
        lastName:
          this.registrationForm.controls['basicInformation'].value.lastName,
        userName:
          this.registrationForm.controls['basicInformation'].value.userName,
        phone: this.registrationForm.controls['basicInformation'].value.phone,
        educationalLevel:
          this.registrationForm.controls['basicInformation'].value
            .educationalLevel,
        department:
          this.registrationForm.controls['basicInformation'].value.department,
        dateOfBirth:
          this.registrationForm.controls['basicInformation'].value.dateOfBirth,
        graduatedDate:
          this.registrationForm.controls['basicInformation'].value
            .graduatedDate,
        graduatedAt:
          this.registrationForm.controls['basicInformation'].value.graduatedAt,
        kebeleName:
          this.registrationForm.controls['basicInformation'].value.kebeleName,
        gothName:
          this.registrationForm.controls['basicInformation'].value.gothName,
        experience:
          this.registrationForm.controls['additionalInformation'].value
            .experience,
        gender:
          this.registrationForm.controls['additionalInformation'].value.gender,

        jobSeekerLetter:
          this.registrationForm.controls['additionalInformation'].value
            .jobSeekerLetter,
        password:
          this.registrationForm.controls['additionalInformation'].value
            .password,
        employeeStatus:
          this.registrationForm.controls['additionalInformation'].value
            .employeeStatus,
        description:
          this.registrationForm.controls['additionalInformation'].value
            .description,
        returnFromArab:
          this.registrationForm.controls['additionalInformation'].value
            .returnFromArab,
        isDisabled:
          this.registrationForm.controls['additionalInformation'].value
            .isDisabled,
        houseWife:
          this.registrationForm.controls['additionalInformation'].value
            .houseWife,
        registrationDate:
          this.registrationForm.controls['additionalInformation'].value
            .registrationDate,
      };
      this.submit=true;
      const formData = new FormData();
      formData.append('jobSeeker', JSON.stringify(data));

      formData.append('letter', this.jobSeekerLetter);
      this.service.createJobSeeker(formData).subscribe(
        (resp) => {
          this.openSnackBar('Congratulation you have Successfully Registered');
          this.registrationForm.reset();
          this.graduatedDateFormate = null;
          this.dateOfBirthFormate = null;
          this.submit=false;
        },
        (error) => {
          this.openSnackBar('Something Went wrong!!!');
          this.submit=false;
        }
      );
    } else {
      this.openSnackBar('Please fill the forms properly');
      this.submit=false;
    }
  }
  setKebele(event) {
    this.getGothsByKebeleName(event);
  }

  getKebele() {
    this.service.getKebeles().subscribe((resp) => {
      this.kebeles = resp;
    });
  }
  getGothsByKebeleName(kebele) {
    this.service.getGotByKebeleName(kebele).subscribe((response) => {
      this.goths = response;
    });
  }
  setEditData() {
    this.id = parseInt(sessionStorage.getItem('jobSeekerId'));
    if (this.id) {
      sessionStorage.removeItem('jobSeekerId');
      this.update = true;
      this.service.getJobSeekerById(this.id).subscribe((resp) => {
        this.data = resp;
        this.empStatus=  this.data.employeeStatus;
        console.log( this.empStatus)

        this.registrationForm
          .get('basicInformation.firstName')
          .setValue(this.data.firstName);
        this.registrationForm
          .get('basicInformation.middleName')
          .setValue(this.data.middleName);
        this.registrationForm
          .get('basicInformation.lastName')
          .setValue(this.data.lastName);
        this.registrationForm
          .get('basicInformation.userName')
          .setValue(this.data.userName);
        this.registrationForm
          .get('basicInformation.phone')
          .setValue(this.data.phone);
        this.registrationForm
          .get('basicInformation.educationalLevel')
          .setValue(this.data.educationalLevel);
        this.registrationForm
          .get('basicInformation.department')
          .setValue(this.data.department);
        this.registrationForm
          .get('basicInformation.graduatedDate')
          .setValue(this.data.graduatedDate);
        this.registrationForm
          .get('basicInformation.graduatedAt')
          .setValue(this.data.graduatedAt);
        this.registrationForm
          .get('basicInformation.kebeleName')
          .setValue(this.data.kebeleName);
        this.registrationForm
          .get('basicInformation.gothName')
          .setValue(this.data.gothName);
        this.registrationForm
          .get('basicInformation.dateOfBirth')
          .setValue(this.data.dateOfBirth);

        this.registrationForm
          .get('additionalInformation.employeeStatus')
          .setValue(this.data.employeeStatus);

        this.registrationForm
          .get('additionalInformation.experience')
          .setValue(this.data.experience);
        this.registrationForm
          .get('additionalInformation.gender')
          .setValue(this.data.gender);
        this.registrationForm
          .get('additionalInformation.description')
          .setValue(this.data.description);
        this.registrationForm
          .get('additionalInformation.jobSeekerLetter')
          .setValue(this.data.jobSeekerLetter);

        this.registrationForm
          .get('additionalInformation.houseWife')
          .setValue(this.data.houseWife);
        this.registrationForm
          .get('additionalInformation.isDisabled')
          .setValue(this.data.isDisabled);
        this.registrationForm
          .get('additionalInformation.returnFromArab')
          .setValue(this.data.returnFromArab);
      });
    }
  }

  ngOnInit() {
    this.getKebele();
    this.setEditData();
  }
}
