import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  notification: any;
  showBackToHome=false;
  constructor(private router:Router,private adminService:AdminService){
    this.onWindowResize();
      this.getNotification();
    }
logout(){
    sessionStorage.removeItem("role");
    this.router.navigate(['/home']);
    
}
getNotification(){
  this.adminService.getSomeNotification().subscribe((resp)=>{
    this.notification = resp;
  })
}
 
public getWidth:number;
  public getHieght:any;
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getWidth=window.innerWidth;
    if(this.getWidth<576){
      this.showBackToHome=true;
    }
    else{
      this.showBackToHome=false
    }
    this.getHieght=window.innerHeight;

  }

}
