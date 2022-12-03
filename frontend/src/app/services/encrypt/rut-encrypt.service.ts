import { Injectable } from '@angular/core';
import JSEncrypt from "jsencrypt";


@Injectable({
  providedIn: 'root'
})
export class RutEncryptService {

  constructor() { }
  public encryptPass(pubPem: string, password: string){
    var encrypt = new JSEncrypt({default_key_size: '2048'});
    encrypt.setPublicKey(pubPem);
    const encryptedPass = encrypt.encrypt(password);
    return encryptedPass;
  }
}
