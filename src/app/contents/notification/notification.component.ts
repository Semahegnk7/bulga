import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notification: any;
  rowData:any;
  constructor(
    private service: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
   this.getNotificationByUserName();
  }
  getNotificationByUserName(){
    this.service.getNotificationByUserName().subscribe((resp)=>{
      this.notification=resp;
      this.rowData=resp;
    })

  }
  filterData(event:any){
this.notification=this.rowData.filter(e=>e.timestamp.toLowerCase().includes(event.target.value.toLowerCase())||
e.senderId.toLowerCase().includes(event.target.value.toLowerCase())||
e.subject.toLowerCase().includes(event.target.value.toLowerCase()));
  }
  markAsRead(id:any){
    this.service.setToSeen(id).subscribe((resp)=>{
      this.getNotificationByUserName();
    })
  }
  deleteNotification(id:any){
    this.service.deleteNotification(id).subscribe((resp)=>{
      this.getNotificationByUserName();
    })
  }

}
