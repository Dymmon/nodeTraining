import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public lInDB(rut: HttpHeaders){
    const response = of({code: 200, pubPem: 'pubPem'});
    return response;
    // return this.http.get<any>('http://localhost:25565/v1/login/loginrutindb',
    // {headers: rut});
  }
  public sUpInDB(rut: HttpHeaders){
    const response = of({code: 200, pubPem: 'pubPem'});
    return response;
    // return this.http.get<any>('http://localhost:25565/v1/login/suprutindb',
    // {headers: rut});
  }
  public postLogin(pass: any, headers: HttpHeaders) {
    const response = of({token: 'token'});
    return response;
    // return this.http.post<any>('http://localhost:25565/v1/login/signin',
    //   {password: pass},{headers:headers})
  }
  public getDone(headers: HttpHeaders){
    const response = of({code: 200, message: "Done", token : 'token'});
    return response;
    // return this.http.get<any>('http://localhost:25565/v1/login/done',
    // {headers: headers})
  }
  public postSignUp(pass: any, headers: HttpHeaders){
    const response = of({token: 'token'});
    return response;
    // return this.http.post<any>('http://localhost:25565/v1/login/signup',
    // {password: pass}, {headers: headers})
  }
}

