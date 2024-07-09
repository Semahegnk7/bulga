import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service:AdminService){

  }
  ngOnInit(): void {
  }
 

}