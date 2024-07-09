import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.css']
})
export class IndustriesComponent {

  industries: any;

  constructor(private service:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.getIndustries();
  }
  getIndustries(){
    this.service.getIndustries().subscribe(resp=>{
      this.industries=resp;
    })
  }

  setIndustryId(id){
    sessionStorage.setItem("adminIndustryId",id);
    this.router.navigate(['/dash','industryInfo']);
  }
  setEditId(id){
    sessionStorage.setItem("adminIndustryId",id);
    this.router.navigate(['/dash','addIndustry']);
  }
  updateStatus(status,id){
    this.service.updateIndustryStatus(status,id).subscribe((resp)=>{
      alert("successfully update the Visibility!!!");
      this.getIndustries();
    },error=>{
      alert("Some thing went Wrong!!!")
    })
  }

}