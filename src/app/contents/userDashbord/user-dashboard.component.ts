import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {


  url!: string;
  role:any;
  userName:string;
  reportData:any;
  sentReport:number=0;
  draftReport:number=0;
  reviewedReport:number=0;
  acceptedReport:number=0;
  pendingReport:number=0;
  woredaRole: any=null;
  rejectedReport: number=0;
  constructor(private routers: Router, private service: AdminService,private userAuthService:UserAuthService) {
this.role=this.userAuthService.getRoles();
this.userName=this.userAuthService.getUserName();
  }
  changeUrl(url: any) {
    this.url = url;
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.url = this.routers.url;
    }, 100);
    this.getReportsByUsername();
  }
getReportsByUsername(){
  this.woredaRole=this.role;
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
    if(report[i].acceptanceStatus==='Pending' && report[i].status==='Sent'){
      this.pendingReport++;
    }
    if(report[i].acceptanceStatus==='Accepted'&& report[i].status==='Sent'){
      this.acceptedReport++;
    }
    if(report[i].acceptanceStatus==='Rejected'&&report[i].status==='Sent')
    this.rejectedReport++;
    
  }
})
}

  
}