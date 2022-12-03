import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectRutAndPubPem } from 'src/app/components/redux/app.reducers';
import { RutHeadersService } from 'src/app/services/headers/rut-headers.service';
import { REQUIRED } from '../redux/actions/rut.actions';
import { RutEncryptService } from 'src/app/services/encrypt/rut-encrypt.service';

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
          this.rut = res.rut;
          this.pubPem = res.pubPem;
        }else{this.router.navigate(['login']);}
      });
    }

  ngOnInit(): void {
    const headersService = new RutHeadersService();
    this.headers = headersService.rutHeaders(this.rut);
    this.signInForm = this.formBuilder.group({
      pass: ['', Validators.required],
    })
  }
  
  signIn(){
    if(this.signInForm.valid){
      const passService = new RutEncryptService();
      const pass = passService.encryptPass(this.pubPem, this.signInForm.value['pass']);
      this.store.dispatch(REQUIRED({payload:{password: pass, headers: this.headers}}));
    }else alert("Missing data");
  }
}
