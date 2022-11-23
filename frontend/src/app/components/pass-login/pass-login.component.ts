import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JSEncrypt } from 'jsencrypt'

import { LoginService } from 'src/app/services/login.service';
import { catchError, concatMap, of, take, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { rutHeaders } from '../shared/rut.headers';
import { AuthRutAction } from '../redux/actions/rut.actions';

@Component({
  selector: 'app-pass-login',
  templateUrl: './pass-login.component.html',
  styleUrls: ['./pass-login.component.scss']
})
export class PassLoginComponent implements OnInit {

  rut: string;
  headers: HttpHeaders;
  public signInForm !: FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>) {
      this.store.select('rut').subscribe(res=>{
        (res)?this.rut = res: this.router.navigate(['login']);
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
        const actionRut = new AuthRutAction('Authorized');
        this.store.dispatch(actionRut);
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
    return this.loginService.getPubPem(this.headers).pipe(take(1),
    concatMap((result)=>{
      if(result.pubPem){
        var encrypt = new JSEncrypt({default_key_size: '2048'});
        encrypt.setPublicKey(result.pubPem);
        const encryptedPass = encrypt.encrypt(this.signInForm.value['pass']);
        return this.toNext(encryptedPass);
      }
      return of({});
    }))
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

