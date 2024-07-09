import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 /*  PATH_OF_API = 'http://192.168.1.221:9090/JSIS'; */
  /* PATH_OF_API = 'http://localhost:9090/JSIS'; */
  PATH_OF_API = 'http://localhost:8085';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  token = localStorage.getItem('jwtToken');
  
  requestHeaders = new HttpHeaders({ 'Content-Type':  'application/json',
  'Authorization': 'Bearer '+ this.token });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData:any) {
   
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public refreshToken() {
    return this.httpclient.get(this.PATH_OF_API + '/refershToken');
  }
  getuserByUsername(username:any):Observable<any>{
    return this.httpclient.get(this.PATH_OF_API+'/getUserByUsername/'+username);
  }

  getIp(){
    return this.httpclient.get("https://ipapi.co/json")
  }
  public register(formData:any,roleID:number):Observable<any> {
    return this.httpclient.post(this.PATH_OF_API + '/saveUser/'+roleID, formData, {
      headers: this.requestHeader,
    });
  }

  //Register Verification Code to API
  public verifyUser(code):Observable<any> {
    return this.httpclient.post(this.PATH_OF_API + '/verifyUser', code, {
      headers: this.requestHeader
    });
  }
  public getcodebyusername(userName:string) {
    return this.httpclient.get(this.PATH_OF_API + '/getcodebyusername/'+ userName, {
      headers: this.requestHeader
    });
  }
  public forgotPassword(userName:any):Observable<any> {
    return this.httpclient.post(this.PATH_OF_API + '/forgotPassword', userName, {
      headers: this.requestHeader,
    });
  }
public logoutUser(userName:string,date?:string){
  return this.httpclient.put(this.PATH_OF_API + '/logoutUser/'+ userName,date, {
    headers: this.requestHeader
  });
}
  getVerificationCodeByEmail(formData:any):Observable<any> {
    return this.httpclient.put(this.PATH_OF_API + '/verifyCode', formData, {
      headers: this.requestHeader
    });
  }
  public addAnnouncement(announcement): Observable<any> {
    return   this.httpclient.post(this.PATH_OF_API + '/saveAnnouncement', announcement)
  }
  fetchAnnouncementById(id):Observable<any >{
    return this.httpclient.get(this.PATH_OF_API + '/fetchAnnouncementById/'+id)
  }
  updateAnnouncement(id,formData:FormData):Observable<any>{
return this.httpclient.put(this.PATH_OF_API + '/updateAnnouncement/'+id,formData)
  }
  getAnnouncements(): Observable<any> {
    return   this.httpclient.get(this.PATH_OF_API +'/announcements',  {
      headers: this.requestHeaders,
    });
  }

public deleteAnnouncement(id, userName):Observable<any>{
  return this.httpclient.delete(this.PATH_OF_API + '/deleteAnnouncement/'+id+'/'+userName);
}


  public roleMatch(allowedRoles:any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
