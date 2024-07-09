import { Injectable } from '@angular/core';
import { CryptoService } from '../admin-service/crypto-service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private cryptoService:CryptoService) {}

  public setRoles(roles: []) {
    let role = this.cryptoService.encryptKey(JSON.stringify(roles));
    localStorage.setItem('Reload', role);
  }
  public setPermissions(permissions: []) {
    let PERMISION = this.cryptoService.encryptKey(JSON.stringify(permissions));
    localStorage.setItem('AUTH', PERMISION);
  }
  public setUserName(userName: string) {
   let username= this.cryptoService.encryptKey(userName);
   localStorage.setItem("userName",username)
  }

  public getUserName() {
    let username = this.cryptoService.decryptKey(localStorage.getItem('userName'));
    return username;
  }
  
  public getPermissions(): [] {
    const permission = this.cryptoService.decryptKey(localStorage.getItem('AUTH'));
  if (permission) {
    return JSON.parse(permission);
  } else {
    return [];
  }
  }

  public getRoles(): [] {
    const roles = this.cryptoService.decryptKey(localStorage.getItem('Reload'));
  if (roles) {
    return JSON.parse(roles);
  } else {
    return [];
  }
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      return token;
    } else {
      return '';
    }
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
