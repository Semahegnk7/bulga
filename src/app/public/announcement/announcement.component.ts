import { Component, OnInit, Pipe } from '@angular/core';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})

export class AnnouncementComponent implements OnInit {
  announcementData: any;
  announcementPage:number=0
  filteredData: any;
  rawData: any;
 
  constructor(private service:AdminService) { }

  ngOnInit(): void {
   this.getActiveAnnouncements();
  }
  getActiveAnnouncements(){
    this.service.getActiveAnnouncements().subscribe(resp=>{
      this.announcementData=resp;
      this.rawData=resp;
    })
  }
  filterData(event:any){
    this.announcementData = this.rawData.filter(e =>e.title.toLowerCase().includes(event.target.value.toLowerCase())||
    e.postedBy.toLowerCase().includes(event.target.value.toLowerCase())
    || e.publishDate.toLowerCase().includes(event.target.value.toLowerCase()));
    
  }
}

