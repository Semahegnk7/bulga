import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
import { UserAuthService } from '../../_services/user-auth.service';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css'],
})
export class ReportViewComponent {  
  dataSource =  new MatTableDataSource<Report>();
  dataSourceSent = new MatTableDataSource<Report>();
  dataSourceReviewed = new MatTableDataSource<Report>();
  dataSourceDraft = new MatTableDataSource<Report>();
  @ViewChild(MatPaginator) paginatorAll!: MatPaginator;
  @ViewChild(MatPaginator) paginatorD!: MatPaginator;
  @ViewChild(MatPaginator) paginatorR!: MatPaginator;
  @ViewChild(MatPaginator) paginatorS!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sortD!: MatSort;
  remark:any;
  reportData: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'attachment',
    'dateAdded',
    'lastModified',
    'status',
    'acceptanceStatus',
    'actions',
  ];
  displayedColumnSent: string[] = [
    'id',
    'name',
    'attachment',
    'dateAdded',
    'lastModified',
    'status',
    'acceptanceStatus',
    'actions',
  ];
  displayedColumnAll: string[] = [
    'id',
    'name',
    'attachment',
    'dateAdded',
    'lastModified',
       'status',
    'acceptanceStatus',
    'actions',
  ];
  displayedColumnsDraft: string[] = [
    'id',
    'name',
    'attachment',
    'dateAdded',
    'lastModified',
    'remark',
    'fRemark',
    'status',
    'acceptanceStatus',
    'actions',
  ];

  Report: any;
  id: any;
  userName: string;
  role:any;
  officeReportData: any;
  
  sent: boolean=false;
  draft:boolean=false;
  reviewed:boolean=false;
  allReport: any;
  zonalData: any;
  userData: any;


  constructor(
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar,private userAuthService:UserAuthService
  ) {
    this.userName = this.userAuthService.getUserName();
    this.role=this.userAuthService.getRoles();
 
    if(this.role==="PROCESS_EXPERT" || this.role==="EDUCATION_AND_TRAINING"|| this.role==="INDUSTRY_EXTENSION"|| 
    this.role==="MARKET_PREPARATION"|| this.role==="PLANNING"|| this.role==="CAPACITY_BUILDING"||
     this.role==="WORK_AND_DEPLOYMENT"){
      this.sent=true;
      this.draft=true;
      this.reviewed=true;
          }
  else  if(this.role.substring(0,5)==="ZONE_" || this.role==="MAYER"){
            this.sent=true;
            this.draft=false;
            this.reviewed=false;
                }
   else if (this.role==="WOREDA_COORDINATOR") {
      this.sent=true;
      this.draft=false;
      this.reviewed=true;
    }

    this.remark=new FormControl();
  }
   getReportByOffice(){
    this.service.getReportsByOffice('Trained and Employee').subscribe((resp)=>{
       this.officeReportData=resp;
        this.officeReportData.data = resp;
        this.officeReportData.paginator = this.paginatorD;
        this.officeReportData.sort = this.sort;
        const reviewedReports = [];
        const sentReports = [];
        for(let i=0;i<this.officeReportData.length;i++){
          if(this.officeReportData[i].status === 'Reviewed'){
            reviewedReports.push(this.officeReportData[i]);
          } if(this.officeReportData[i].status === 'Sent'){
            sentReports.push(this.officeReportData[i]);
          }
        }
        this.dataSourceSent.data = sentReports;
        this.dataSourceSent.paginator = this.paginatorS;
        this.dataSourceSent.sort = this.sort;
  
        this.dataSourceReviewed.data = reviewedReports;
        this.dataSourceReviewed.paginator = this.paginatorR;
        this.dataSourceReviewed.sort = this.sort;
      })
    
    
  }
  ngOnInit(): void {
    this.getReportForRole();
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

  getReportForRole(){

    if(this.role === 'PROCESS_EXPERT'|| this.role==="INDUSTRY_EXTENSION"|| this.role === 'EDUCATION_AND_TRAINING'||
    this.role === 'MARKET_PREPARATION' || this.role === 'PLANNING'|| this.role === 'CAPACITY_BUILDING'
    || this.role === 'WORK_AND_DEPLOYMENT'){
      this.getReports();
    this.getDraftReports();
    this.getReviewedReports();
    this.getSentReports();
    
    }
    if(this.role === 'WOREDA_COORDINATOR'|| this.role==='MAYER'){
      this.getReportByOffice();
    }
    if(this.role === 'ZONE_PROCESS_EXPERT'){
      this.getSentToZoneReports("PROCESS_EXPERT");
    }
    if(this.role === 'ZONE_EDUCATION_AND_TRAINING'){
      this.getSentToZoneReports("EDUCATION_AND_TRAINING");
    }
    if(this.role === 'ZONE_INDUSTRY_EXTENSION'){
      this.getSentToZoneReports("INDUSTRY_EXTENSION");
    }
    if(this.role === 'ZONE_MARKET_PREPARATION'){
      this.getSentToZoneReports("MARKET_PREPARATION");
    }
    if(this.role === 'ZONE_PLANNING'){
      this.getSentToZoneReports("PLANNING");
    }
    if(this.role === 'ZONE_CAPACITY_BUILDING'){
      this.getSentToZoneReports("CAPACITY_BUILDING");
    }
    if(this.role === 'ZONE_WORK_AND_DEPLOYMENT'){
      this.getSentToZoneReports("WORK_AND_DEPLOYMENT");
    }


  }
  getSentToZoneReports(siraHidet:string){
    this.service.getSentToZoneReports(siraHidet).subscribe((resp)=>{
      this.zonalData=resp;
      this.dataSourceSent.data=resp;
      this.dataSourceSent.paginator=this.paginatorS;
      this.dataSourceSent.sort=this.sort;
 })
  }

  getReports() {
    this.service.getReportSiraHidet(this.role).subscribe((resp) => {
      this.allReport=resp;
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginatorAll;
      this.dataSource.sort = this.sort;
    },error=>{
    });
  }
  getDraftReports() {
    this.service.reportsByStatus('Draft',this.userName).subscribe((report) => {
      this.dataSourceDraft.data = report;
      this.dataSourceDraft.paginator = this.paginatorD;
      this.dataSourceDraft.sort = this.sortD;
    });
  }
  getReviewedReports() {
    this.service.reportsByStatus('Reviewed',this.userName).subscribe((report) => {
      this.dataSourceReviewed.data = report;
      this.dataSourceReviewed.paginator = this.paginatorR;
      this.dataSourceReviewed.sort = this.sort;
    });
  }
  getSentReports() {
    this.service.reportsByStatus('Sent',this.userName).subscribe((report) => {
      this.dataSourceSent.data = report;
      this.dataSourceSent.paginator = this.paginatorS;
      this.dataSourceSent.sort = this.sort;
    });
  }
  updateAcceptanceStatus(status) {
    if(this.remark.value===null){
      this.remark.value=this.reportData.remark
    }
    const btn=document.getElementById("btn-close");
    this.service.updateAcceptanceStatus(this.remark.value,status,this.id).subscribe(reps=>{
      btn.click();
      if(status==="Accepted")
      status="Accepted";
    else{
      status="Returned Back"
    }
    if(this.role === 'WOREDA_COORDINATOR'){
      this.getReportByOffice();
    }
    if(this.role === 'ZONE_PROCESS_EXPERT'){
      this.getSentToZoneReports("PROCESS_EXPERT");
    }
    if(this.role === 'ZONE_EDUCATION_AND_TRAINING'){
      this.getSentToZoneReports("EDUCATION_AND_TRAINING");
    }
    if(this.role === 'ZONE_INDUSTRY_EXTENSION'){
      this.getSentToZoneReports("INDUSTRY_EXTENSION");
    }
    if(this.role === 'ZONE_MARKET_PREPARATION'){
      this.getSentToZoneReports("MARKET_PREPARATION");
    }
    if(this.role === 'ZONE_PLANNING'){
      this.getSentToZoneReports("PLANNING");
    }
    if(this.role === 'ZONE_CAPACITY_BUILDING'){
      this.getSentToZoneReports("CAPACITY_BUILDING");
    }
    if(this.role === 'ZONE_WORK_AND_DEPLOYMENT'){
      this.getSentToZoneReports("WORK_AND_DEPLOYMENT");
    }
this.openSnackBar("Successfully \""+status+"\" the Report!!!")
    },(error)=>{
      btn.click();
this.openSnackBar("SomeThing Went wrong!!! please try again!!!")
    })
  }
  updateStatus(status) {
    if(this.remark.value===null){
      this.remark.value=this.reportData.remark
    }
    console.log(this.remark.value)
    const btn=document.getElementById("btn-close");
    this.service.updateReportStatus(this.remark.value,status,this.id).subscribe(reps=>{
      btn.click();
      if(status==="Draft"){
        status = "Backed"
      }
      else if(status==="Draft")
      status="Reviewed";
      else{
      status="Sent"
      }
    if(this.role === 'WOREDA_COORDINATOR'){
      this.getReportByOffice();
    } else{
    this.getReports();
    this.getDraftReports();
    this.getReviewedReports();
    this.getSentReports();
    }
this.openSnackBar("Successfully \""+status+"\" the Report!!!")
    },(error)=>{
      btn.click();
this.openSnackBar("SomeThing Went wrong!!! please try again!!!")
    })
  }
  deleteId: number;
  setId(id: any) {
    this.deleteId = id;
  }
  setEditId(id) {
    sessionStorage.setItem('reportId', id);
    this.router.navigate(['/dash', 'report']);
  }
  viewDetail(id) {
    this.id=id;
    this.service.getReportById(id).subscribe((report) => {
      this.reportData = report;
    });
  }

  deleteDept() {
    this.service.deleteReport(this.deleteId).subscribe(
      (resp) => {
        this.openSnackBar('Report Successfully Deleted !!!');
        this.getReports();
      },
      (error) => {
        this.openSnackBar('Some thing went wrong Please Try Latter!!!');
        
      }
    );
  }
  applyFilterDraft(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDraft.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceDraft.paginator) {
      this.dataSourceDraft.paginator.firstPage();
    }
  }
  applyFilterReviewed(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDraft.filter = filterValue.trim().toLowerCase();

    this.dataSourceReviewed.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceReviewed.paginator) {
      this.dataSourceReviewed.paginator.firstPage();
    }
  }
  applyFilterSent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDraft.filter = filterValue.trim().toLowerCase();

    this.dataSourceSent.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceSent.paginator) {
      this.dataSourceSent.paginator.firstPage();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface Report {
  id: number;
  name: string;
  remark: string;
  dateAdded: string;
  fRemark: string;
  lastModified: string;
  attachment: string;
}
