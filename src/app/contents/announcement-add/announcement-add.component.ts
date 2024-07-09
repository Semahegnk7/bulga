import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.css'],
})
export class AnnouncementAddComponent {
  registrationForm: FormGroup;
  id: number;
  update: boolean = false;
  other: boolean = false;
  data: any;
  username: string;
  attachment: File = null;
  role: string;
  reportData: any;
  errorImage: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    private _snackBar: MatSnackBar
  ) {
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');

    this.registrationForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      publishDate: [''],
      postedBy: ['', Validators.required],
      status: ['Pending', Validators.required],
    });
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

  onFileSelected(event: any): void {
    const fileInput = event.target;
    const selectedFile = fileInput.files[0];

    // Check file format (replace this condition with your logic)
    if (selectedFile && !this.isValidFileFormat(selectedFile)) {
      // Clear the selected file
      fileInput.value = null;
      alert('Invalid file format. Please choose a valid file.');
    }
  }

  isValidFileFormat(file: File): boolean {
    // Replace this with your logic to check the file format
    // For example, check the file extension
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }
  file=null
  selectFile(event) {
    this.file = event.target
    const fileInput=this.file.files[0];
    if(this.isValidImageType(fileInput)){
      this.attachment = fileInput;
      this.errorImage=false;
    }
    else{
      this.errorImage=true;
      this.attachment = null;
      this.file.value=null;
    }
    
  }
  private isValidImageType(file: File): boolean {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedImageTypes.includes(file.type);
  }
  addAnnouncement() {
    if (this.registrationForm.valid && this.attachment != null) {
      const formData = new FormData();
      formData.append('announcement', JSON.stringify(this.registrationForm.value));
      formData.append('thumbnail', this.attachment);

      this.service.createAnnouncement(formData).subscribe(
        (resp) => {
          this.openSnackBar('Announcement Successfully Added!!!');
          this.attachment = null;
          this.file.value=null;
    
          this.registrationForm.reset();
        },
        (error) => {
          this.openSnackBar('Some Thing Wrong, Check Backend!!!');
        }
      );
    } else {
      this.openSnackBar('Please Fill the Form properly!!!');
    }
  }

  setEditData() {
    this.id = parseInt(sessionStorage.getItem('announcementId'));
    if (this.id) {
      sessionStorage.removeItem('announcementId');
      this.update = true;
      this.service.getAnnouncementById(this.id).subscribe((resp) => {
        console.log(resp);
        this.registrationForm.controls['title'].setValue(resp.title);
        this.registrationForm.controls['content'].setValue(resp.content);
        this.registrationForm.controls['postedBy'].setValue(resp.postedBy);
        this.registrationForm.controls['publishDate'].setValue(resp.publishDate);
        
      });
    }
  }
  updateAnnouncement() {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      formData.append('announcement', JSON.stringify(this.registrationForm.value));
      formData.append('thumbnail', this.attachment);
      this.service.updateAnnouncement(formData, this.id).subscribe(
        (resp) => {
          this.openSnackBar('Successfully Updated!!!');
          this.attachment = null;
          this.registrationForm.reset();
          this.file.value=null;
        },
        (error) => {
          this.openSnackBar('Some Thing Wrong, Check Backend!!!');
        }
      );
    } else {
      this.openSnackBar('Please Fill the Form properly!!!');
    }
  }

  ngOnInit() {
    this.setEditData();
  }
}
