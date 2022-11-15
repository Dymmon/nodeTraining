import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public signInForm !: FormGroup ;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      rut: [''],
      pass: [''],
    })
  }
  signIn(){
    const pass = this.signInForm.value["pass"];
    if(this.signInForm.value["rut"] && this.signInForm.value["pass"]){
      let rut = this.signInForm.value["rut"];
      const dv = rut.slice(-1);
      rut = rut.substring(0, rut.length - 1);
      const headers = new HttpHeaders({
        'rut': rut,
        'dv': dv
      })
      this.http.post<any>('http://localhost:25565/v1/login/signin',
      {password: pass},{headers:headers}).subscribe(res=>{
      if(res["token"]){
        alert("SignIn Successfull");
        this.signInForm.reset();
        this.router.navigate(['login'])
      }else{
        alert("Invalid Username or password")
      }
    },err=>{
      alert("Something went wrong")
      console.log(err);
    })
    }else{
      alert("Missing data")
    }
  }

}
