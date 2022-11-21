import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public lInDB(rut: HttpHeaders){
    return this.http.get<any>('http://localhost:25565/v1/login/loginrutindb',
    {headers: rut});
  }
  public sUpInDB(rut: HttpHeaders){
    return this.http.get<any>('http://localhost:25565/v1/login/suprutindb',
    {headers: rut});
  }
  public postLogin(pass: any, headers: HttpHeaders) {
    return this.http.post<any>('http://localhost:25565/v1/login/signin',
      {password: pass},{headers:headers})
  }
  public getPubPem(rut: HttpHeaders){
    return this.http.get<any>('http://localhost:25565/v1/login/getpubpem',
    {headers: rut})
  }
  public getDone(headers: HttpHeaders){
    return this.http.get<any>('http://localhost:25565/v1/login/done',
    {headers: headers})
  }
  public postSignUp(pass: String, headers: HttpHeaders){
    return this.http.post<any>('http://localhost:25565/v1/login/signup',
    {password: pass}, {headers: headers})
  }
}

