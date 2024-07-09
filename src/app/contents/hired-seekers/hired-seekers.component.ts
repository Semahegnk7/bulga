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


@Component({
  selector: 'app-hired-seekers',
  templateUrl: './hired-seekers.component.html',
  styleUrls: ['./hired-seekers.component.css']
})

export class HiredSeekersComponent {

  dataSource = new MatTableDataSource<JobSeeker>();
  dataExport = new MatTableDataSource<JobSeeker>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName','middleName', 'userName','age','phone','employmentDate', 'actions'];
  displayedColumnExport: string[] = ['id', 'fullName', 'userName','gender','phone','employedAt','employedDate','educationalLevel','kebele','age','graduatedDate', 'trainedEndDate','employeeStatus','terminationDate','houseWife','returnFromArab','isDisabled'];
  
  jobSeeker: any;
  id: any;

  columnRangeName: any;
  toValue: string;
  fromValue: string;
 totalMale: number =0;
totalFemale:  number =0;
grandTotal: number =0;
hiredSeekerData:any;
  constructor(
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar, private fb:FormBuilder
  ) {
    
  
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
        const employeeStatus="HIRED";
        this.service.filterJobSeekerData(this.columnName,this.filterValue,employeeStatus).subscribe((resp)=>{
          this.hiredSeekerData = resp;
          this.totalMale = this.hiredSeekerData.filter(e => e.gender === 'Male').length;
          this.totalFemale = this.hiredSeekerData.filter(e => e.gender === 'Female').length;
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
        const employeeStatus="HIRED";
        this.service.filterJobSeekerDataByRange(this.columnRangeName,this.fromValue, this.toValue,employeeStatus).subscribe((resp)=>{
          this.hiredSeekerData = resp;
          this.totalMale = this.hiredSeekerData.filter(e => e.gender === 'Male').length;
          this.totalFemale = this.hiredSeekerData.filter(e => e.gender === 'Female').length;
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
          filename: 'Hired_Job_Seeker.pdf',
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
        let ws = XLSX.utils.aoa_to_sheet([['ID', 'Full Name', 'UserName','Gender','phone','employedAt','employedDate','educationalLevel','kebele','Age','Graduated Date','trainedEndDate','employeeStatus','terminationDate','houseWife','returnFromArab','isDisabled'], ...data]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        
        // Generate Excel file
        let wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        let url = URL.createObjectURL(new Blob([wbout], { type: "application/octet-stream" }));
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "Hired Job Seeker.xlsx";
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
  
  getJobSeekers() {
    this.service.getJobSeekersByEmploymentStatus("HIRED").subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataExport.data=resp;
      this.hiredSeekerData=resp;
this.totalMale = this.hiredSeekerData.filter(e => e.gender === 'Male').length;
this.totalFemale = this.hiredSeekerData.filter(e => e.gender === 'Female').length;
this.grandTotal=resp.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataExport.sort=this.sort;
    });
  }
  
  deleteId: number;
  setId(id: any) {
    this.deleteId = id;
  }
  setEditId(id) {
    sessionStorage.setItem('jobSeekerId', id);
    this.router.navigate(['/dash', 'addJobSeeker']);
  }
  viewDetail(id){
    this.id=id;
    this.service.getJobSeekerById(id).subscribe(jobSeeker=>{
      this.jobSeeker=jobSeeker;
    })
  }

  deleteDept() {
    this.service.deleteJobSeeker(this.deleteId).subscribe((resp) => {
            this.openSnackBar("JobSeeker Successfully Deleted !!!");
            this.getJobSeekers();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataExport.filter= filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface JobSeeker{
  id:number;
  firstName:string;
  lastName:string;
  userName:string;
  age:string;
  educationalLevel:string;
  gender:string;
  graduatedDate:string;
  description:string;
  }