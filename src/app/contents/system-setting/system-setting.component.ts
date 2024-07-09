import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent  implements OnInit{
  settingData:any;
  isChecked: any;
  contactMeForm:FormGroup;
  publicReg:boolean=false;
  id: any;
  homeData: any;
  constructor(private fb:FormBuilder,private service:AdminService){
    this.contactMeForm=fb.group({
      address:[''],
      phone:[''],
      compEmail:[''],
      publicReg:['']
    })

  }
  ngOnInit(): void {
    this.getSettings();
    this.getHomeInfo();
  }
  
 getHomeInfo(){
  this.service.getHomeInfo().subscribe((resp)=>{
    this.homeData=resp;
    console.log(this.homeData)
  })
 }
  getSettings(){
    this.service.getSettings().subscribe(resp=>{
      this.settingData=resp;
      this.publicReg=this.settingData[0].publicReg;
      this.id=this.settingData[0].id;

    })
  }
  onSlideToggleChange(event){
   this.contactMeForm.controls['publicReg'].setValue(event.checked)
    this.service.updateReg(this.contactMeForm.value,this.id).subscribe((resp=>{

    }))
  }
}
