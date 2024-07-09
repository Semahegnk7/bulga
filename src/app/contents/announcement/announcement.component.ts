import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
announceData: any;
  deletedId: number;
constructor(private service:AdminService,private router:Router){
   
}
ngOnInit(): void {
 this.getAnnouncements();
}
getAnnouncements(){
  this.service.announcements().subscribe((response)=>{
    this.announceData=response;
  })
}
setEditId(id) {
  sessionStorage.setItem('announcementId', id);
  this.router.navigate(['/dash', 'addAnnouncement']);
}
updateStatus(status,id){
  this.service.updateAnnouncementStatus(status,id).subscribe((resp)=>{
    this.getAnnouncements();

  })
 }
 setDeleteId(id){
this.deletedId=id;
 }
 deleteAnnouncement(){
    this.service.deleteAnnouncement(this.deletedId).subscribe(resp=>{
      this.getAnnouncements();
    })
 }
}
