import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { take } from 'rxjs';
import { validate } from '../shared/rut.validate';
import { AuthRutAction, ResetAction } from '../redux/actions/rut.actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-rut-sign-up',
  templateUrl: './rut-sign-up.component.html',
  styleUrls: ['./rut-sign-up.component.scss']
})
export class RutSignUpComponent implements OnInit {

  public signUpForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    const action = new ResetAction();
    this.store.dispatch(action);
    this.signUpForm = this.formBuilder.group({
      rut: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(10)]]
    })
  }

  signUp(){
    const rut = this.signUpForm.value["rut"];
    const dv = rut.slice(-1);
    const digits = rut.substring(0, rut.length - 1);

    (validate(digits, dv) && this.signUpForm.valid)?
    this.inDB(rut).subscribe(res=>{
      if(res.code === 200){
        const actionRut = new AuthRutAction(rut);
        this.store.dispatch(actionRut);
        this.router.navigate(['signup/password'])
      }else{alert("Invalid data")}
    }): alert("Invalid data");
  }
  inDB(rut: string){
    const headers = new HttpHeaders({'dv':rut.slice(-1), 'rut': rut.substring(0, rut.length - 1)});
    return this.loginService.sUpInDB(headers).pipe(take(1))
  }

}
