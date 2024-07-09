
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin-service/admin-service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  
  dataSource=new MatTableDataSource<Department>;
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns:string[]=["id","title","description","actions"]
    constructor(private service:AdminService, private router:Router) { }
  departmentData:FormGroup;
    ngOnInit(): void {
      this.getDepartments();
    }
 
    getDepartments(){
      this.service.getUsers().subscribe((resp)=>{
        console.log(resp);
        this.dataSource.data=resp;
        
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      })
    }
    updateDepartment(){
      this.service.updateDepartment(this.departmentData.value,1).subscribe((resp)=>{

      })
    }
    deleteId: number;
    setId(id: any) {
      this.deleteId = id;
    }
    setEditId(id) {
      sessionStorage.setItem("deptId", id);
      this.router.navigate(['/dash', 'addDepartment']);
    }
  
    deleteDept() {
      this.service.deleteDepartment(this.deleteId).subscribe((resp) => {
  
        this.getDepartments();
        alert("Successfully Deleted");
      })
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
