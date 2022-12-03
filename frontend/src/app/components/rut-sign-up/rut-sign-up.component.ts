import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { take } from 'rxjs';
import { RutValidateService } from 'src/app/services/validate/rut-validate.service';
import { AppState } from 'src/app/components/redux/app.reducers';
import { Store } from '@ngrx/store';
import { AUTHRUT, RESET } from '../redux/actions/rut.actions';
import { RutHeadersService } from 'src/app/services/headers/rut-headers.service';

@Component({
  selector: 'app-rut-sign-up',
  templateUrl: './rut-sign-up.component.html',
  styleUrls: ['./rut-sign-up.component.scss']
})
export class RutSignUpComponent implements OnInit {

  rut: string;
  public signUpForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.store.dispatch(RESET());
    this.signUpForm = this.formBuilder.group({
      rut: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(10)]]
    })
  }

  signUp(){
    this.rut = this.signUpForm.value["rut"];
    const dv = this.rut.slice(-1);
    const digits = this.rut.substring(0, this.rut.length - 1);
    const validate = new RutValidateService();

    (validate.validate(digits, dv) && this.signUpForm.valid)?
    this.inDB().subscribe(res=>{
      if(res.code === 200){
        this.store.dispatch(AUTHRUT({payload:{rut:this.rut, pubPem: res.pubPem}}));
        this.router.navigate(['signup/password'])
      }else{alert("Invalid data")}
    }): alert("Invalid data");
  }
  inDB(){
    const headersService = new RutHeadersService();
    const headers =  headersService.rutHeaders(this.rut);
    return this.loginService.sUpInDB(headers).pipe(take(1))
  }

}
