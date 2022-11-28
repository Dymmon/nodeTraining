import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { concatMap, of, take } from 'rxjs';
import { JSEncrypt } from 'jsencrypt'
import { Store } from '@ngrx/store';
import { AppState, selectRutAndPubPem } from 'src/app/components/redux/app.reducers';
import { rutHeaders } from '../shared/rut.headers';


@Component({
  selector: 'app-pass-sign-up',
  templateUrl: './pass-sign-up.component.html',
  styleUrls: ['./pass-sign-up.component.scss']
})
export class PassSignUpComponent implements OnInit {

  rut: string;
  pubPem: string;
  headers: HttpHeaders;
  public signUpForm !: FormGroup;
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
    this.signUpForm = this.formBuilder.group({
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
    })
  }

  signUp(){
    const pass = this.signUpForm.value["pass1"];
    (pass === this.signUpForm.value["pass2"])?this.getKeyRut()
    .subscribe(res =>{
      alert("Signup Successfull");
      this.router.navigate(['login']);
    })
    :alert("Invalid credentials");
  }

  getKeyRut(){
    var encrypt = new JSEncrypt({default_key_size: '2048'});
    encrypt.setPublicKey(this.pubPem);
    const encryptedPass = encrypt.encrypt(this.signUpForm.value['pass1']);
    return this.loginService.postSignUp(encryptedPass, this.headers);
  }
}
