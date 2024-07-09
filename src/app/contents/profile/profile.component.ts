import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AdminService } from 'src/app/admin-service/admin-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loginForm: FormGroup;
  changePasswordForm: any;
  passworderror: boolean = false;
  userName: string;
  success: boolean = false;
  isfilled: boolean = false;
  samePassword: boolean = false;
  error: boolean = false;
  userData: any;
  role: any;
  resetPassword: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    private userService: UserService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {
    this.userName = this.userAuthService.getUserName();
    this.role = this.userAuthService.getRoles();
    this.resetPassword = formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getUserData() {
    this.userService.getuserByUsername(this.userName).subscribe((resp) => {
      this.userData = resp;
    });
  }

  changePassword(formData) {
    if (formData.valid) {
      if (
        this.loginForm.controls['password'].value !==
        this.changePasswordForm.controls['newPassword'].value
      ) {
        if (
          this.changePasswordForm.controls['newPassword'].value ===
          this.changePasswordForm.controls['confirmPassword'].value
        ) {
          this.loginForm.controls['userName'].setValue(this.userName);

          this.userService.login(this.loginForm.value).subscribe(
            (response: any) => {
              let newPassword =
                this.changePasswordForm.controls['newPassword'].value;
              this.service.changePassword(this.userName, newPassword).subscribe(
                (resp) => {
                  this.success = true;
                  this.error = false;
                  this.isfilled = false;
                  this.samePassword = false;
                  alert(
                    'Password Changed Successfully, Please Login in agian!'
                  );
                  this.router.navigate(['/home']);
                  sessionStorage.clear();
                },
                (error) => {
                  this.success = false;
                  this.error = true;
                  this.isfilled = false;
                  this.samePassword = false;
                }
              );
            },
            (error) => {
              this.success = false;
              this.error = true;
              this.isfilled = false;
              this.samePassword = false;
            }
          );
        }
      } else {
        this.success = false;
        this.error = false;
        this.samePassword = true;
        this.isfilled = false;
      }
    } else {
      this.success = false;
      this.error = false;
      this.isfilled = true;
      this.samePassword = false;
    }
  }

  checkPassword() {
    if (
      this.changePasswordForm.controls['newPassword'].value !==
      this.changePasswordForm.controls['confirmPassword'].value
    ) {
      this.passworderror = true;
    } else if (
      this.changePasswordForm.controls['newPassword'].value ===
      this.changePasswordForm.controls['confirmPassword'].value
    ) {
      this.passworderror = false;
    }
  }
  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    });
    this.getUserData();
  }

  restPasswordFunc() {
    console.log(this.resetPassword.value);
    console.log(this.resetPassword.valid)
    if (this.resetPassword.valid) {
      this.service
        .resetPassword(
          this.resetPassword.controls['userName'].value,
          this.resetPassword.controls['password'].value
        )
        .subscribe(
          (resp) => {
            alert('Successfully reset the password');
          },
          (error) => {
            alert('Something went wrong');
          }
        );
    } else {
      alert('Please Fill Out All the forms');
    }
  }
}
