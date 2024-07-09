import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AdminService } from 'src/app/admin-service/admin-service';
import { CryptoService } from 'src/app/admin-service/crypto-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginForm:FormGroup;
  url!:string;
  loggingIn: boolean;
  error: boolean;
  register:any;
  loggedIn: boolean=false;
  settingData:any;
  publicReg:any;

  constructor(private router:Router,private userService:UserService, private userAuthService:UserAuthService, private cryptoService:CryptoService,
    
    private formbuilder:FormBuilder,private service:AdminService) {
      this.getSettings(); 
    this.url=router.url;
    if(sessionStorage.getItem("role")){
      this.loggedIn=true

    };

   
    
  }
  removeMassage(){
    this.error = false;
  }
  ngOnInit(): void {
       this.loginForm = this.formbuilder.group({
      userName:['', Validators.required ],
      password:['', Validators.required ]

    });
  }
  getSettings(){
    this.service.getSettings().subscribe(resp=>{
      this.settingData=resp;
      this.publicReg=this.settingData[0].publicReg;

    })
  }

  changeUrl(url:string){
  this.url=url;

  }

  signIn(loginForm: FormGroup) {
    if(loginForm.valid){
        this.loggingIn = true; 
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUserName(response.user.userName);

        let userRole = this.cryptoService.encryptKey(response.user.role);
        
        const role = response.user.role;
        sessionStorage.setItem("role",role);
        sessionStorage.setItem('username',response.user.userName)
        
       
    
        this.error = false;
        if (role === 'ADMIN'|| role=='WOREDA_COORDINATOR'|| role=='PROCESS_EXPERT'||role=='MAYER') {
          this.loggingIn = false;
          this.router.navigate(['/dash','dashboard']).then(()=>window.location.reload());
        } 
        else if(role==='EDUCATION_AND_TRAINING' ||role==='INDUSTRY_EXTENSION'
        ||role==='MARKET_PREPARATION' ||role==='PLANNING' ||role==='CAPACITY_BUILDING' ||role==='WORK_AND_DEPLOYMENT' || role.substring(0,5)==='ZONE_'){
          this.loggingIn = false;
          this.router.navigate(['/dash','user-dashboard']).then(()=>window.location.reload());
        }
        else if (role=='ZONE_PROCESS_EXPERT' ||'ZONE_INDUSTRY_EXTENSION') {
          this.loggingIn = false;
          this.router.navigate(['/dash','zDashboard']).then(()=>window.location.reload());
        }
      },
      (error) => {console.log(error);
        this.loggingIn = false;
        this.error = true;
      }
    );
  }


  }}