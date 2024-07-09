import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  dataSource = new MatTableDataSource<Admin>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'middleName',
    'lastName',
    'dob',
    'email',
    'phone',
    'address',
    'actions',
  ];
  userName: string;
  constructor(private service: AdminService, private router: Router) {
    this.userName = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
    this.getAdminBs();
  }
  adminData: any[] = [];
  getAdminBs() {
    this.service.getUsers().subscribe((resp) => {
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].role === 'ADMIN') {
          this.adminData.push(resp[i]);
        }
      }
      this.dataSource.data = this.adminData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  deleteId: number;
  setId(id: any) {
    this.deleteId = id;
  }
  setEditId(id) {
    sessionStorage.setItem('adminId', id);
    this.router.navigate(['/dash', 'addAdmin']);
  }

  deleteAdmin() {
    this.service.deleteUser(this.deleteId).subscribe((resp) => {
      this.getAdminBs();
      alert('Successfully Deleted');
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
export interface Admin {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
}
