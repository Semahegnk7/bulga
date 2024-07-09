import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-pushnotification',
  templateUrl: './pushnotification.component.html',
  styleUrls: ['./pushnotification.component.css']
})
export class PushnotificationComponent implements OnInit {
  notyTypes!:string;
  users:any;
  content:string;
  subjects:string;
  dropdownSettings: IDropdownSettings;
  pushNotificationForm:FormGroup;
  user:Array<any>=[];
  userRole:any;
  pushNotification = false;
  notification:Array<{subject:string,userId:string,type:string,content:string,status:number,senderId:string}>=[] ;
  userName: string;
  constructor(private adminService:AdminService,private formbuilder:FormBuilder,private userAuthService:UserAuthService,
    private router:Router) {
    this.userRole = this.userAuthService.getRoles();
    this.userName = this.userAuthService.getUserName();

   /*  if(this.userRole !== 'System Admin.'&&this.userRole !== 'Property Dept. Head'&&this.userRole !== 'Property Div. Head'){
      this.router.navigate(['/login']);
    } */
     
   }

  submitNotification(){
    if(this.pushNotificationForm.valid&&this.user.length!=0){
      const formData = new FormData();
     
      for(let i=0; i<this.user.length; i++){
        this.notification.push({subject:this.subjects,userId:this.user[i],type:this.notyTypes,content:this.content,status:0,senderId:this.userName});
      }
      formData.append("notification",JSON.stringify(this.notification));
      formData.append("attachment",this.attachment);
      this.adminService.submitNotification(formData).subscribe((resp)=>{
      this.notification=[];
      this.pushNotificationForm.reset();
      this.attachment=null;
      alert("Successfully Sent")
      })

    }
  }
  notiType(event:any){
    this.notyTypes=event.target.value;
   }
   attachment: File = null;
   selectFile(event){
    const file = event.target.files[0];
    this.attachment = file;
  }
   subject(event){
    this.subjects=event.target.value;
   }
   contentAction(event){
    this.content=event.target.value; 
  }
   onItemSelect(item: any){
    this.user.push(item.userName);
  }
  onSelectAll(items: any){
    for(let i=0;i<items.length;i++)
    this.user.push(items[i].userName);
  }
  onDeSelectAll(items:any){
  this.user=[];
  }
    onDeSelects(item:any){
      this.user.forEach((obj, index) => {
        var removeIndex = -1;
      if (obj == item.userName) {
        removeIndex = index;
      }
      if(removeIndex!=-1){
        this.user.splice(removeIndex, 1);
      }
    });
    }
  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userName',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
    };
    this.pushNotificationForm=this.formbuilder.group({
      type:['',Validators.required],
      content:['',Validators.required],
      subject:['',Validators.required]
     })
    this.getUsers();
  }
  getUsers(){
    this.adminService.getUsers().subscribe((resp)=>{
      this.users=resp;
    })
  }
}