import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-goth',
  templateUrl: './goth.component.html',
  styleUrls: ['./goth.component.css']
})
export class GothComponent implements AfterViewInit {
  [x: string]: any;

  dataSource = new MatTableDataSource<Goth>();
  dataExport= new MatTableDataSource<Goth>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('jobSeekerTable') jobSeekerTable: ElementRef;
  columnName:string;
  displayedColumns: string[] = ['id', 'gothName','kebeleName', 'description', 'actions'];
  constructor(
    private service: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
 
  departmentData: FormGroup;
  

 
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  ngAfterViewInit(): void {
    this.getGoths();
  }
  saveDepartment() {
    this.service
      .createGoth(this.departmentData.value)
      .subscribe((resp) => {
        this.openSnackBar('Successfully Added!!!');
      });
  }
  getGoths() {
    this.service.getGoths().subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataExport.data=resp;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataExport.sort=this.sort;
    });
  }
  updateDepartment() {
    this.service
      .updateGoth(this.departmentData.value)
      .subscribe((resp) => {});
  }
  deleteId: number;
  setId(id: any) {
    this.deleteId = id;
  }
  setEditId(id) {
    sessionStorage.setItem('gothId', id);
    this.router.navigate(['/dash', 'addGoth']);
  }

  deleteDept() {
    this.service.deleteGoth(this.deleteId).subscribe((resp) => {
            this.openSnackBar("Goth Successfully Deleted !!!");
            this.getGoths();
    });
  }
 
filterColumn:any="";
filterValue:any="";
  applyFilters(event: any) {
    this.columnName = event;
    this.filterColumn=event;
  }
  applyFilterByColumn(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.toString();
    this.filterValue=filterValue;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let columnValue = null;
      if(data[this.columnName]){  columnValue = data[this.columnName].toString()};
      if (columnValue) {
        return columnValue.trim().toLowerCase().includes(filter);
      } else {
        this.filterValue="";
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataExport.filter=filterValue.trim().toLowerCase();
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
  let table: HTMLTableElement = document.getElementById("jobSeekerTable") as HTMLTableElement;
  
  // Use html2pdf to generate the PDF
  if (table) {
     const options = {
      margin: 10,
      filename: 'Goth_Report.pdf',
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
  let table: HTMLTableElement = document.getElementById("jobSeekerTable") as HTMLTableElement;

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
    console.error("Table with id 'jobSeekerTable' not found.");
  }
}
}

export interface Goth{
  id:number;
  gothName:string;
  kebeleName:string;
  description:string;
  }