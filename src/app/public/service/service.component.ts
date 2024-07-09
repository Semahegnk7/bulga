import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  industries: any;
 industryPage:number=0;
  rawData: any;
  constructor(private service:AdminService,private router:Router) {   
   
    
}



  ngOnInit(): void {
    this.getIndustries();
  }
  getIndustries(){
    this.service.getActiveIndustries().subscribe(resp=>{
      this.industries=resp;
      this.rawData=resp;
          })
  }

  setIndustryId(id){
    sessionStorage.setItem("industryId",id);
    this.router.navigate(['/industry']);
  }
  filterData(event:any){
    this.industries = this.rawData.filter(e =>e.industryName.toLowerCase().includes(event.target.value.toLowerCase())||
    e.location.toLowerCase().includes(event.target.value.toLowerCase())
    ||e.type.toLowerCase().includes(event.target.value.toLowerCase()));
    
  }

}
