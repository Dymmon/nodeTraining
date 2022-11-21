import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JSEncrypt } from 'jsencrypt'

import { LoginService } from 'src/app/services/login.service';
import { catchError, concatMap, of, take, throwError } from 'rxjs';

@Component({
  selector: 'app-pass-login',
  templateUrl: './pass-login.component.html',
  styleUrls: ['./pass-login.component.scss']
})
export class PassLoginComponent implements OnInit {

  public signInForm !: FormGroup ;
  constructor(
    private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService, private url: ActivatedRoute) { }

  ngOnInit(): void {
    this.consecutiveValid()
    .subscribe(res=>{
      if(res.code != 200) this.router.navigate(['login']);
    })
    this.signInForm = this.formBuilder.group({
      pass: ['', Validators.required],
    })
  }
  
  signIn(){
    if(this.signInForm.valid){
    this.getKeyRut()
    .subscribe(res=>{
      if(res["code"] === 200){
        this.router.navigate(['done'],{queryParams:{token: res['token']}});
      }else{
        alert("Unauthorized acces")
      }
    })
  }else{
      alert("Missing data")
    }
  }
  inDB(rut: string){
    const headers = new HttpHeaders({'dv':rut.slice(-1), 'rut': rut.substring(0, rut.length - 1)});
    return this.loginService.lInDB(headers).pipe(take(1))
  }
  getKeyRut(){
    return this.url.queryParams.pipe(take(1),
    concatMap((result)=>{
      if(result['rut']){
        const rut = result['rut'];
        const headers = new HttpHeaders({
          'dv': rut.slice(-1),
          'rut': rut.substring(0, rut.length - 1)
        });
        return this.loginService.getPubPem(headers).pipe(take(1),
        concatMap((result) =>{
          if(result.pubPem){
            var encrypt = new JSEncrypt({default_key_size: '2048'});
            encrypt.setPublicKey(result.pubPem);
            const encryptedPass = encrypt.encrypt(this.signInForm.value['pass']);
            const headers = new HttpHeaders({
              'dv': result.dv,
              'rut': result.rut
            });
            return this.consecutiveReqs1(encryptedPass, headers)
          }
          return of({})
        })
        )
      }
      return of({});
    }));
  }

  consecutiveReqs1(pass: any, headers: HttpHeaders){
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

  consecutiveValid(){
    return this.url.queryParams.pipe(take(1),
      concatMap((result) =>{
        if(result){
          const rut = result['rut'];
          return this.inDB(rut); 
        }
        return of({});
      }),
      catchError(err => throwError(err))
    );
  }
}
