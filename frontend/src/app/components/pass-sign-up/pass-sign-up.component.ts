import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectRutAndPubPem } from 'src/app/components/redux/app.reducers';
import { RutHeadersService } from 'src/app/services/headers/rut-headers.service';
import { RutEncryptService } from 'src/app/services/encrypt/rut-encrypt.service';
import { REGISTER } from '../redux/actions/rut.actions';


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
    private store: Store<AppState>) {
      this.store.select(selectRutAndPubPem).
      subscribe(res=>{
        this.rut = res.rut;
        this.pubPem = res.pubPem;
      });
    }

  ngOnInit(): void {
    const headersService = new RutHeadersService();
    this.headers = headersService.rutHeaders(this.rut);
    this.signUpForm = this.formBuilder.group({
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
    });
  }

  signUp(){
    const password = this.signUpForm.value["pass1"];
    if(password === this.signUpForm.value["pass2"]){
      const passService = new RutEncryptService();
      const pass = passService.encryptPass(this.pubPem, password);
      this.store.dispatch(REGISTER({payload:{password: pass, headers: this.headers}}));
      this.router.navigate(['login']);
    }else alert("Invalid credentials");
  }
}
