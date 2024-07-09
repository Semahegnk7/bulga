import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';
import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-trained-seekers',
  templateUrl: './trained-seekers.component.html',
  styleUrls: ['./trained-seekers.component.css'],
})
export class TrainedSeekersComponent {
  dataSource = new MatTableDataSource<JobSeeker>();
  dataExport = new MatTableDataSource<JobSeeker>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'middleName',
    'userName',
    'phone',
    'trainedEndDate',
    'trainingType',
    'graduatedDate',
    'actions',
  ];
  displayedColumnExport: string[] = ['id', 'fullName', 'userName','gender','age','graduatedDate', 'kebele','educationalLevel','phone','trainingType','trainedStartDate','trainedEndDate','TrainedFor','houseWife','returnFromArab','isDisabled'];
 
  jobSeeker: any;
  updateStatusForm: FormGroup;
  isChecked: any;
  id: any;
  userRole: any;
  columnRangeName: any;
  toValue: string;
  fromValue: string;
 totalMale: number =0;
totalFemale:  number =0;
grandTotal: number =0;
trainedSeekerData:any;
  constructor(
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,private userAuthService:UserAuthService
  ) {
    this.userRole=this.userAuthService.getRoles();
    this.updateStatusForm = fb.group({
      employedDate: ['', Validators.required],
      employedAt: ['', Validators.required],
      employeeStatus: ['HIRED'],
      employmentType: [''],
      terminationDate: [''],
     
    });
  }
  
filterValue:any="";
filterRange:boolean=false;
columnName: string;
  applyFilters(event: any) {
    this.columnName = event;
  }
  setFromValue(event){
    const filterValue = (event.target as HTMLInputElement).value.toString();
   this.fromValue = filterValue;
  }
  setToValue(event){
    const filterValue = (event.target as HTMLInputElement).value.toString();
    this.toValue = filterValue;
   }
   setColumnName(event){
    this.columnRangeName = event;
   }
  applyFilterByColumn(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.toString();
    this.filterValue = filterValue;
    if(filterValue){
      this.filterRange=false;
      const employeeStatus="TRAINED";
      this.service.filterJobSeekerData(this.columnName,this.filterValue,employeeStatus).subscribe((resp)=>{
        this.trainedSeekerData = resp;
        this.totalMale = this.trainedSeekerData.filter(e => e.gender === 'Male').length;
        this.totalFemale = this.trainedSeekerData.filter(e => e.gender === 'Female').length;
        this.grandTotal = resp.length;
        this.dataSource.data = resp;
        this.dataExport.data = resp;
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
  
  }
  filterByRange(){
    if(this.fromValue && this.toValue && this.columnRangeName){
      this.filterRange=true;
      this.filterValue="";
      const employeeStatus="TRAINED";
      this.service.filterJobSeekerDataByRange(this.columnRangeName,this.fromValue, this.toValue,employeeStatus).subscribe((resp)=>{
        this.trainedSeekerData = resp;
        this.totalMale = this.trainedSeekerData.filter(e => e.gender === 'Male').length;
        this.totalFemale = this.trainedSeekerData.filter(e => e.gender === 'Female').length;
        this.grandTotal = resp.length;
        this.dataSource.data = resp;
        this.dataExport.data = resp;
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
  
  }
 printData(id:any){
      const printContents = document.getElementById(id).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();

}
  
  public openPDF() {
    // Get the table element
    let table: HTMLTableElement = document.getElementById("jobSeekerTable") as HTMLTableElement;
    
    // Use html2pdf to generate the PDF
    if (table) {
       const options = {
        margin: 10,
        filename: 'Trained_Job_Seeker.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };
  
      html2pdf().from(table).set(options).save();
    } else {
      console.log("Error: Table not found");
    }
  }
  exportExcel() {
    let wb = XLSX.utils.book_new();
  
    // Ensure the table id is correct
    let table: HTMLTableElement = document.getElementById("jobSeekerTable") as HTMLTableElement;
  
    if (table) {
  
      // Extract data from Angular Material table
      let rows = table.querySelectorAll('tbody mat-row');
      let data = [];
      rows.forEach(row => {
        let rowData = [];
        row.querySelectorAll('mat-cell').forEach(cell => {
          rowData.push(cell.textContent.trim());
        });
        data.push(rowData);
        
      });
    
      // Create worksheet and append data
      let ws = XLSX.utils.aoa_to_sheet([['ID', 'Full Name', 'UserName','Gender','Age','Graduated Date','kebele','educationalLevel','phone','trainingType','trainingStartDate','trainedEndDate','TrainedFor','houseWife','returnFromArab','isDisabled'], ...data]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      
      // Generate Excel file
      let wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      let url = URL.createObjectURL(new Blob([wbout], { type: "application/octet-stream" }));
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "Trained Job Seeker.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      console.error("Table with id 'jobSeekerTable' not found.");
    }
  }


  
  ngOnInit(): void {
    this.getJobSeekers();
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
  changeValidator(event) {
    if (event.value === 'Contract') {
      this.updateStatusForm.controls['terminationDate'].setValidators([
        Validators.required,]);
    } else {
      this.updateStatusForm.controls['terminationDate'].clearValidators();
    }
    this.updateStatusForm.controls['terminationDate'].updateValueAndValidity();
  }
  saveUpdateStatus() {
    if (this.updateStatusForm.valid) {
      this.service
        .updateJobSeekerHired(this.updateStatusForm.value, this.id)
        .subscribe(
          (resp) => {
            this.openSnackBar('Successfully Updated');
            const btnClose=document.getElementById("btn-close");
            btnClose.click();
            this.getJobSeekers();
          },
          (error) => {
            this.openSnackBar(
              'Something Went wrong, please check your backend'
            );
          }
        );
    } else {
      this.openSnackBar('Please Fill the form Properly');
    }
  }
  onSlideToggleChange(event) {
    this.isChecked = event.checked;
  }

  getJobSeekers() {
    this.service
      .getJobSeekersByEmploymentStatus('TRAINED')
      .subscribe((resp) => {
        this.dataSource.data = resp;
        this.trainedSeekerData=resp;
        this.dataExport.data=resp;
        this.totalMale = this.trainedSeekerData.filter(e => e.gender === 'Male').length;
        this.totalFemale = this.trainedSeekerData.filter(e => e.gender === 'Female').length;
        this.grandTotal = resp.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       /*  let timeDiff = Math.abs(Date.now() - this.dataSource.data.dateOfBirth[0].getTime());
let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
console.log(age) */
      });
  }

  backId: number;
  setId(id: any) {
    this.backId = id;
  }
  setEditId(id) {
    sessionStorage.setItem('jobSeekerId', id);
    this.router.navigate(['/dash', 'addJobSeeker']);
  }
  viewDetail(id) {
    this.id = id;
    this.service.getJobSeekerById(id).subscribe((jobSeeker) => {
      this.jobSeeker = jobSeeker;
      console.log(this.jobSeeker);
    });
  }
updatedData:any;
  BackTrainedToSeeker() {
    this.service.getJobSeekerById(this.backId).subscribe((resp)=>{
      this.updatedData=resp;
      this.updatedData.employeeStatus='SEEKER'
      
       this.service.updateJobSeeker(this.updatedData,this.backId).subscribe((resp) => {
      this.openSnackBar('JobSeeker Successfully updated !!!');
      this.getJobSeekers();
    });

    })
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataExport.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface JobSeeker {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  age: string;
  educationalLevel: string;
  gender: string;
  graduatedDate: string;
  description: string;
}
