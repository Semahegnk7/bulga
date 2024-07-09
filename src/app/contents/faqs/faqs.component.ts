import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {

  dataSource = new MatTableDataSource<Faqs>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name','email', 'message','dateSent', 'actions'];
  Faqs: any;
  id:any;
  constructor(
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFaqss();
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
 
  getFaqss() {
    this.service.getFaqss().subscribe((resp) => {
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
    sessionStorage.setItem('FaqsId', id);
    this.router.navigate(['/dash', 'addZoneCoordinator']);
  }
  viewDetail(id){
    this.service.getFaqsById(id).subscribe(Faqs=>{
      this.Faqs=Faqs;
    })
  }

  deleteDept() {
    this.service.deleteContactUs(this.deleteId).subscribe((resp) => {
            this.openSnackBar("Faqs Successfully Deleted !!!");
            this.getFaqss();
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
export interface Faqs{
  id:number;
  name:string;
  email:string;
  message:string;
  dateSent:string;
  replied:string
  }