import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JSEncrypt } from 'jsencrypt'

import { LoginService } from 'src/app/services/login.service';
import { catchError, concatMap, of, take, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectRutAndPubPem } from 'src/app/app.reducers';
import { rutHeaders } from '../shared/rut.headers';
import { AUTHORIZED } from '../redux/actions/rut.actions';

@Component({
  selector: 'app-pass-login',
  templateUrl: './pass-login.component.html',
  styleUrls: ['./pass-login.component.scss']
})
export class PassLoginComponent implements OnInit {

  rut: string;
  pubPem: string;
  headers: HttpHeaders;
  public signInForm !: FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>) {
      this.store.select(selectRutAndPubPem).
      subscribe(res=>{
        if(res.rut){
          this.rut = res.rut; this.pubPem = res.pubPem;
        }else{this.router.navigate(['login']);}
      });
    }

  ngOnInit(): void {
    this.headers = rutHeaders(this.rut);
    this.signInForm = this.formBuilder.group({
      pass: ['', Validators.required],
    })
  }
  
  signIn(){
    if(this.signInForm.valid){
    this.getKeyRut()
    .subscribe(res=>{
      if(res["code"] === 200){
        this.store.dispatch(AUTHORIZED());
        this.router.navigate(['done']);
      }else{
        alert("Unauthorized acces")
      }
    })
  }else{
      alert("Missing data")
    }
  }
  getKeyRut(){
    var encrypt = new JSEncrypt({default_key_size: '2048'});
    encrypt.setPublicKey(this.pubPem);
    const encryptedPass = encrypt.encrypt(this.signInForm.value['pass']);
    return this.toNext(encryptedPass);
  }

  toNext(pass: any){
    return this.loginService.postLogin(pass, this.headers).pipe(take(1),
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

