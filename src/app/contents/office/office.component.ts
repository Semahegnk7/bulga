import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent {
  dataSource = new MatTableDataSource<Kebele>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  officeForm: FormGroup;
  subOfficeForm: FormGroup;
  displayedColumns: string[] = ['id', 'kebeleName', 'description','parent', 'actions'];
update: any;
  id: any;
  subOfficeData: any;
  subofficeId: any;
  officeDelete: boolean;
  constructor(
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb:FormBuilder
  ) {

    this.officeForm = this.fb.group({
      officeName: ['', Validators.required],
      description: ['', Validators.required],
      parent:['MAYER'],
      
    });
    this.subOfficeForm = this.fb.group({
      officeName: ['', Validators.required],
      description: ['', Validators.required],
      parentId:['',Validators.required],
      
    });

    this.officeForm.controls['parent'].disable();

  }


  ngOnInit(): void {
    this.getOffices();
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
  saveOffice() {
    if(this.officeForm.valid)
    {
      this.officeForm.controls['parent'].setValue('MAYER');
      this.officeForm.controls['parent'].enable();
    this.service
      .createOffice(this.officeForm.value)
      .subscribe((resp) => {
        let btnClose = document.getElementById('btn-close');
        btnClose.click();
        this.openSnackBar('Successfully Added!!!');
        this.getOffices();
        this.officeForm.controls['parent'].disable();
        this.officeForm.reset();
      },(err)=>{
        this.officeForm.controls['parent'].disable();
      });
    }
  }
  saveSubOffice() {
    if(this.subOfficeForm.valid)
    {
    this.service
      .createSubOffice(this.subOfficeForm.value)
      .subscribe((resp) => {
        let btnClose = document.getElementById('btn-close-sub');
        btnClose.click();
        this.openSnackBar('Successfully Added!!!');
        this.getSubofficeInfo(this.subofficeId);
        this.officeForm.reset();
      },(err)=>{
      });
    }
  }
  getOffices() {
    this.service.getOffices().subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  updateOffice() {
    if(this.officeForm.valid){
      this.officeForm.controls['parent'].setValue('MAYER')
      this.officeForm.controls['parent'].enable();
      this.service
      .updateOffice(this.officeForm.value,this.id)
      .subscribe((resp) => {
        let btnClose = document.getElementById('btn-close');
        btnClose.click();
        this.openSnackBar("Office Successfully Updated !!!");
        this.getOffices();
        this.officeForm.controls['parent'].disable();
      },(Error)=>{
        this.officeForm.controls['parent'].disable();
      });
    }
  }
  updateSubOffice() {
    if(this.subOfficeForm.valid){
      this.service
      .updateSubOffice(this.subOfficeForm.value,this.id)
      .subscribe((resp) => {
        let btnClose = document.getElementById('btn-close-sub');
        btnClose.click();
        this.openSnackBar("Office Successfully Updated !!!");
        this.getSubofficeInfo(this.subofficeId);
        this.subOfficeForm.reset();
      },(Error)=>{
      });
    }
  }
  deleteId: number;
  setId(id: any,office:string) {
    if(office === 'office'){
      this.officeDelete = true;
    }
    else{
      this.officeDelete = false;
    }
    this.deleteId = id;
  }
  getSubofficeInfo(id){
    this.subofficeId = id;
  
    this.subOfficeForm.controls['parentId'].setValue(id);
    this.service.getOfficeByParentId(id).subscribe((resp)=>{
      this.subOfficeData = resp;
    })
  }

  setEditId(id) {
    this.id=id;
    this.update = true;
    this.service.getOfficeById(id).subscribe((resp)=>{
      this.officeForm.controls['officeName'].setValue(resp.officeName);
      this.officeForm.controls['description'].setValue(resp.description);
      this.officeForm.controls['parent'].setValue(resp.parent);
    })
  }
  setSubOfficeEditId(id) {
    this.id=id;
    this.update = true;
    this.service.getSubOfficeById(id).subscribe((resp)=>{
      this.subOfficeForm.controls['officeName'].setValue(resp.officeName);
      this.subOfficeForm.controls['description'].setValue(resp.description);
      this.subOfficeForm.controls['parentId'].setValue(resp.parentId);
    })
  }
  addNew(){
    this.update = false;
  }
  deleteDept() {
    this.service.deleteOffice(this.deleteId).subscribe((resp) => {
            this.openSnackBar("Office Successfully Deleted !!!");
            this.getOffices();
    });
  }
  deleteOfficeDept() {
    this.service.deleteSubOffice(this.deleteId).subscribe((resp) => {
            this.openSnackBar("Office Successfully Deleted !!!");
            this.getSubofficeInfo(this.subofficeId);
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
export interface Kebele{
  id:number;
  kebeleName:string;
  description:string;
  }