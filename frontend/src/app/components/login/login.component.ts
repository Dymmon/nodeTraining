import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { catchError, concatMap, of, take, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public signInForm !: FormGroup ;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      pass: ['', Validators.required],
    })
  }
  
  signIn(){
    const rut = this.signInForm.value["rut"];
    if(this.signInForm.valid){
      const headers = new HttpHeaders({
        'dv': rut.slice(-1),
        'rut': rut.substring(0, rut.length - 1)
      })
      this.consecutiveReqs(this.signInForm.value["pass"], headers).subscribe(res=>{
        if(res["code"] === 200){
          this.router.navigate(['done'],{queryParams:{token: res['token']}});
        }else{
          alert("Unauthorized acces")
        }
      });
    }else{
      alert("Missing data")
    }
  }
  consecutiveReqs(pass:String, headers: HttpHeaders){
    return this.loginService.postLogin(pass, headers).pipe(take(1),
      concatMap((result) =>{
        if(result){
          const header = new HttpHeaders({'authorization': result.token});
          return this.loginService.getDone(header); 
        }
        return of({});
      }),
      catchError(err => throwError(err))
    );
  }
}
