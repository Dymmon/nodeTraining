import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JSEncrypt } from 'jsencrypt'
import { Store } from '@ngrx/store';
import { AppState, selectRutAndPubPem } from 'src/app/components/redux/app.reducers';
import { rutHeaders } from '../shared/rut.headers';
import { REQUIRED } from '../redux/actions/rut.actions';

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
      const pass = this.getKeyRut();
      this.store.dispatch(REQUIRED({payload:{password: pass, headers: this.headers}}));
    }else alert("Missing data");
  }

  getKeyRut(){
    var encrypt = new JSEncrypt({default_key_size: '2048'});
    encrypt.setPublicKey(this.pubPem);
    const encryptedPass = encrypt.encrypt(this.signInForm.value['pass']);
    return encryptedPass;
  }
}

