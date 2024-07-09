import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent {
  dataSource = new MatTableDataSource<Kebele>();
  dataExport = new MatTableDataSource<Kebele>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('kebeleData') kebeleData: ElementRef;
  displayedColumns: string[] = ['id', 'kebeleName', 'description', 'actions'];
  displayedColumnExport: string[] = ['id', 'kebeleName', 'description'];
  constructor(
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  KebeleData: FormGroup;

  ngOnInit(): void {
    this.getKebeles();
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
  saveKebele() {
    this.service
      .createKebele(this.KebeleData.value)
      .subscribe((resp) => {
        this.openSnackBar('Successfully Added!!!');
      });
  }
  getKebeles() {
    this.service.getKebeles().subscribe((resp) => {
      this.dataSource.data = resp;
this.dataExport.data=resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataExport.sort=this.sort;
    });
  }
  updateKebele() {
    this.service
      .updateKebele(this.KebeleData.value)
      .subscribe((resp) => {});
  }
  deleteId: number;
  setId(id: any) {
    this.deleteId = id;
  }
  setEditId(id) {
    sessionStorage.setItem('kebeleId', id);
    this.router.navigate(['/dash', 'addKebele']);
  }

  deleteDept() {
    this.service.deleteKebele(this.deleteId).subscribe((resp) => {
            this.openSnackBar("Kebele Successfully Deleted !!!");
            this.getKebeles();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataExport.filter=filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  printData(id:any){
  
    const printContents = document.getElementById(id).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
    
  
  }
   public openPDF() {
    // Get the table element
    let table: HTMLTableElement = document.getElementById("kebeleData") as HTMLTableElement;
    
    // Use html2pdf to generate the PDF
    if (table) {
       const options = {
        margin: 10,
        filename: 'kebele data.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
  
      html2pdf().from(table).set(options).save();
    } else {
      console.log("Error: Table not found");
    }
  }
  exportExcel() {
    let wb = XLSX.utils.book_new();
  
    // Ensure the table id is correct
    let table: HTMLTableElement = document.getElementById("kebeleData") as HTMLTableElement;
  
    if (table) {
  
      // Extract data from Angular Material table
      let rows = table.querySelectorAll('tbody mat-row');
      let data = [];
      rows.forEach(row => {
        let rowData = [];
        row.querySelectorAll('mat-cell').forEach(cell => {
          rowData.push(cell.textContent.trim());
        });
        data.push(rowData);
        
      });
    
      // Create worksheet and append data
      let ws = XLSX.utils.aoa_to_sheet([['ID', 'Goth Name', 'Kebele Name', 'Description'], ...data]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      
      // Generate Excel file
      let wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      let url = URL.createObjectURL(new Blob([wbout], { type: "application/octet-stream" }));
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "Goth data.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      console.error("Table with id 'kebeleData' not found.");
    }
  }
}
export interface Kebele{
  id:number;
  kebeleName:string;
  description:string;
  }