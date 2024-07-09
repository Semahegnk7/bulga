import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-sira-hidet-officer',
  templateUrl: './sira-hidet-officer.component.html',
  styleUrls: ['./sira-hidet-officer.component.css']
})
export class SiraHidetOfficerComponent {
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName','middleName', 'userName','phone','gender', 'actions'];
  user: any;
  id:any;
  constructor(
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
 
  getUsers() {
    this.service.getUsersByRole("PROCESS_EXPERT").subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
 
  deleteId: number;
  setId(id: any) {
    this.deleteId = id;
  }
  setEditId(id) {
    sessionStorage.setItem('userId', id);
    this.router.navigate(['/dash', 'addUser']);
  }
  viewDetail(id){
    this.service.getUserById(id).subscribe(User=>{
      this.user=User;
    })
  }

  deleteDept() {
    this.service.deleteUser(this.deleteId).subscribe((resp) => {
            this.openSnackBar("User Successfully Deleted !!!");
            this.getUsers();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface User{
  id:number;
  firstName:string;
  lastName:string;
  userName:string;
  department:string;
  gender:string;
  }