import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
  url!: string;
  sysUsers: any;
  jobSeekers: any;
  trained: any;
  hired: any;
  pendingJobSeekers: any;
  admins: any;
  sirHidet: any;
  zonalUsers: any;
  woredaCoordinator: any;
  mayer: any;
  role:any;
  permit: boolean=false;
  zonalCount:number=0;
  planning:number=0;
  educationAndTraining:number=0;
  marketAndPreparation:number=0;

workAndDep:number=0;
capacityBuild:number=0;
  industryExtensionCount:number=0;
  reportByOffice: any;
  constructor(private routers: Router, private service: AdminService,private userAuthService:UserAuthService) {
   this.role=this.userAuthService.getRoles();
   if(this.role=='PROCESS_EXPERT'|| this.role==='WOREDA_COORDINATOR'){
    this.permit=true;
   }
  }
  changeUrl(url: any) {
    this.url = url;
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.url = this.routers.url;
    }, 100);
    this.getJobSeekers();
    this.getTrainedSeekers();
    this.getHiredSeekers();
    this.getJobSeeker();

    this.getUsers();
    this.getAdmin();
    this.getWoredaCoordinator();
    this.getSiraHidet();
    this.getMayer();
    this.getReportsByUsername();
    this.getReportsByOffice();
  }
  getUsers() {
    let zonalUser=[]
    this.service.getUsers().subscribe((resp) => {
      this.sysUsers = resp;
      for (let i = 0; i < resp.length; i++) {
    if(resp[i].role.substring(0,5)==='ZONE_') {
   zonalUser.push(resp[i].role);
this.zonalCount++;
    }  
    if(resp[i].role==='INDUSTRY_EXTENSION') {
        this.industryExtensionCount++;
       }   
       if(resp[i].role==='EDUCATION_AND_TRAINING') {
        this.educationAndTraining++;
       } 
       if(resp[i].role==='PLANNING') {
        this.planning++;
       } 
       if(resp[i].role==='CAPACITY_BUILDING') {
        this.capacityBuild++;
       } 
       if(resp[i].role==='WORK_AND_DEPLOYMENT') {
        this.workAndDep++;
       } 
       if(resp[i].role==='MARKET_PREPARATION') {
        this.marketAndPreparation++;
       }     
      }
      this.zonalUsers=zonalUser;
      
    });
  }
  getJobSeekers() {
    this.service.getJobSeekers().subscribe((jobSeeker) => {
      this.jobSeekers = jobSeeker;
    });
  }
  getTrainedSeekers() {
    this.service
      .getJobSeekersByEmploymentStatus('TRAINED')
      .subscribe((trained) => {
        this.trained = trained;
      });
  }
  getHiredSeekers() {
    this.service.getJobSeekersByEmploymentStatus('HIRED').subscribe((hired) => {
      this.hired = hired;
    });
  }
  getJobSeeker() {
    this.service
      .getJobSeekersByEmploymentStatus('SEEKER')
      .subscribe((seeker) => {
        this.pendingJobSeekers = seeker;
      });
  }

  getAdmin() {
    this.service.getUsersByRole('ADMIN').subscribe((admin) => {
      this.admins = admin;
    });
  }
 
  getSiraHidet() {
    this.service.getUsersByRole('PROCESS_EXPERT').subscribe((admin) => {
      this.sirHidet = admin;
    });
  }
  getWoredaCoordinator() {
    this.service.getUsersByRole('WOREDA_COORDINATOR').subscribe((admin) => {
      this.woredaCoordinator = admin;
    });
  }
  getMayer() {
    this.service.getUsersByRole('MAYER').subscribe((admin) => {
      this.mayer = admin;
    });
  }

  reportData:any;
  sentReport:number=0;
  draftReport:number=0;
  reviewedReport:number=0;
  acceptedReport:number=0;
  pendingReport:number=0;
  rejectedReport:number=0;
  woredaRole: any=null;
  getReportsByUsername(){
    this.woredaRole=this.role
    if(this.role.substring(0,5)==='ZONE_'){
      const roles=this.role;
      this.woredaRole=roles.substring(5,roles.length);
    }
  this.service.getReportSiraHidet(this.woredaRole).subscribe((report)=>{
    this.reportData=report;
    for (let i = 0; i < report.length; i++) {
      if(report[i].status==='Sent'){
        this.sentReport++;
      }
      if(report[i].status==='Draft'){
        this.draftReport++;
      }
      if(report[i].status==='Reviewed'){
        this.reviewedReport++;
      }
      if(report[i].acceptanceStatus==='Pending'){
        this.pendingReport++;
      }
      if(report[i].acceptanceStatus==='Accepted'){
        this.acceptedReport++;
      }
      if(report[i].acceptanceStatus==='Rejected'){
        this.rejectedReport++;
      }
      
    }
  })
  }
  reportByOfficeReviewed:number=0;
  reportByOfficeSent:number=0;
  reportByOfficeAccepted:number=0;
  reportByOfficeRejected:number=0;
  reportByOfficePending:number=0;
  getReportsByOffice(){
    this.service.getReportsByOffice("Trained and Employee").subscribe((resp)=>{
this.reportByOffice=resp;
for (let i = 0; i < resp.length; i++) {
  if(resp[i].status==='Sent'){
    this.reportByOfficeSent++;
  }
  if(resp[i].status==='Reviewed'){
    this.reportByOfficeReviewed++;
  }
  if(resp[i].acceptanceStatus==='Pending' && resp[i].status==='Sent'){
    this.reportByOfficePending++;
  }
  if(resp[i].acceptanceStatus==='Accepted'&& resp[i].status==='Sent'){
    this.reportByOfficeAccepted++;
  }
  if(resp[i].acceptanceStatus==='Rejected'&& resp[i].status==='Sent'){
    this.reportByOfficeRejected++;
  }
}
    });
    
  }
  
}
