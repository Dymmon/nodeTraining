import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public postLogin(pass: String, headers: HttpHeaders) {
    return this.http.post<any>('http://localhost:25565/v1/login/signin',
      {password: pass},{headers:headers})
  };
  public getDone(headers: HttpHeaders){
    return this.http.get<any>('http://localhost:25565/v1/login/done',
    {headers: headers})
  };
  public postSingUp(pass: String, headers: HttpHeaders){
    return this.http.post<any>('http://localhost:25565/v1/login/signup',
    {password: pass}, {headers: headers})
  }
}

