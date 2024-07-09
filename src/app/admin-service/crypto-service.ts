import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
    providedIn: 'root',
  })

export class CryptoService {
title = 'crypto';

encryptKey(key:string){
    let encryptedKey = CryptoJS.AES.encrypt(key, 'IAMSkey').toString();
    return encryptedKey;
}

decryptKey(enryptedKey:string){
    let decryptedKey = CryptoJS.AES.decrypt(enryptedKey, 'IAMSkey').toString(CryptoJS.enc.Utf8)
    return decryptedKey;
}
}