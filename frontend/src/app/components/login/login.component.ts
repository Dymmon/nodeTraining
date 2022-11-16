import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      rut: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      pass: ['', Validators.required],
    })
  }
  signIn(){
    const pass = this.signInForm.value["pass"];
    const rut = this.signInForm.value["rut"];
    if(this.signInForm.valid){
      const dv = rut.slice(-1);
      const digits = rut.substring(0, rut.length - 1);
      const headers = new HttpHeaders({
        'rut': digits,
        'dv': dv
      })
      this.http.post<any>('http://localhost:25565/v1/login/signin',
      {password: pass},{headers:headers}).subscribe(res=>{
      if(res["token"]){
        alert("SignIn Successfull");
        this.signInForm.reset();
        const header = new HttpHeaders({'authorization': res['token']})
        this.http.get<any>('http://localhost:25565/v1/login/done',
        {headers: header}).subscribe(response=>{
          if(response["code"] === 200){
            this.router.navigate(['done'],{queryParams:{token: res['token']}});
          }else{
            alert("Unauthorized acces")
          }
        })
      }else{
        alert("Invalid Username or password")
      }
    },err=>{
      alert("Something went wrong")
    })
    }else{
      alert("Missing data")
    }
  }

}
