import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[DatePipe]
})
export class RegistrationComponent {
  @ViewChild('seekerFile') seekerFile: ElementRef;
  registrationForm: FormGroup;
  id: number;
  update: boolean = false;
  other: boolean = false;
  kebeles: any;
  goths: any;
  kebele: string;
  fileInputDesc:string="Choose File";
  jobSeekerLetter: File = null;
  selectedFile: File | null = null;
  jobSeeker: any;
  submit: boolean=false;
  constructor(private formBuilder: FormBuilder, private service: AdminService,private _snackBar:MatSnackBar,private datePipe: DatePipe) {
    this.currentDate = this.getCurrentDate();
    this.registrationForm = this.formBuilder.group({
      basicInformation: formBuilder.group({
        firstName: ['', Validators.required],
        middleName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{9,13}$/)]], 
        userName: ['', [Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/) ]],
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
        gender: ['', Validators.required],
        password: ['1234'],
        employeeStatus: ['SEEKER', Validators.required],
        description: [''],
        jobSeekerLetter: [''],
        houseWife: [''],
        isDisabled: [''],
        returnFromArab: [''],
        registrationDate:[this.currentDate]
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
  onSelectFile(event){
    const file = event.target.files[0];
    this.fileInputDesc=event.target.files[0].name;
    this.jobSeekerLetter = file;
  }
  
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
    // Function to handle changes in the date of birth input
  dateOfBirthFormate: string=null;
  graduatedDateFormate: string=null;
  onDateOfBirthChange(event: any,formControlName:string): void {
    const selectedDate: Date = event.value;
    if(formControlName==='dateOfBirth'){
      this.dateOfBirthFormate = this.formatDate(selectedDate);
    }
    if(formControlName==='graduatedDate'){
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
      const formData = new FormData();
      formData.append("jobSeeker",JSON.stringify(data));

      formData.append("letter",this.jobSeekerLetter)
      this.submit=true;
      this.service.createJobSeeker(formData).subscribe(
        (resp) => {

             this.openSnackBar('Congratulation you have Successfully Registered');
          this.registrationForm.reset();
          this.jobSeekerLetter=null;
             this.dateOfBirthFormate=null;
          this.graduatedDateFormate=null;
          this.submit=false
          this.seekerFile.nativeElement.value = null;
          
        },
        (error) => {
          this.openSnackBar('Something Went wrong!!!');
           this.submit=false
        }
      );
    } else {
      this.openSnackBar('Please fill the forms properly');
      this.submit=false
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
onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

 
  ngOnInit() {
    this.getKebele();
  }
}
