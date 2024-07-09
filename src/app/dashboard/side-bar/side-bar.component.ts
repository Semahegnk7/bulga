import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  url!: string;
  role:string;
  constructor(private routers: Router) {
    this.role=sessionStorage.getItem("role");
    if(!this.role){
      this.routers.navigate(['/home']);
    }

  }
  changeUrl(url: any) {
    this.url = url;


  }
  logOutUser(){
    sessionStorage.clear();
    this.routers.navigate(['/home']);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.url = this.routers.url;
    }, 100);
  }
}
