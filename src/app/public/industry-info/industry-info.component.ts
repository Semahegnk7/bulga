import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin-service/admin-service';
import { SystemSettingComponent } from '../../contents/system-setting/system-setting.component';

@Component({
  selector: 'app-industry-info',
  templateUrl: './industry-info.component.html',
  styleUrls: ['./industry-info.component.css']
})
export class IndustryInfoComponent {
  industryData: any;

   constructor(private service:AdminService){
    this.getIndustryById();

  }

  getIndustryById(){
    let industryId = sessionStorage.getItem("industryId");
    if(industryId)
    this.service.getIndustryById(industryId).subscribe((resp)=>{
      this.industryData = resp;
      console.log(this.industryData)
    })
  }

}
