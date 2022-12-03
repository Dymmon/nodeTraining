import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/components/redux/app.reducers';
import { AUTHRUT, RESET } from '../redux/actions/rut.actions';
import { RutHeadersService } from 'src/app/services/headers/rut-headers.service';

@Component({
  selector: 'app-rut-login',
  templateUrl: './rut-login.component.html',
  styleUrls: ['./rut-login.component.scss']
})
export class RutLoginComponent implements OnInit {

  public signInForm !: FormGroup ;
  rut: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.store.dispatch(RESET());
    this.signInForm = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]]
    })
  }
  
  signIn(){
    this.rut = this.signInForm.value["rut"];
    (this.signInForm.valid)? this.inDB()
    .subscribe(res=>{
      if(res.code === 200){
        this.store.dispatch(AUTHRUT({payload:{rut:this.rut, pubPem: res.pubPem}}));
        this.router.navigate(['login/password']);
      }else{alert("Missing data")}})
    : alert("Missing data");
  }

  inDB(){
    const headersService = new RutHeadersService();
    const headers = headersService.rutHeaders(this.rut);
    return this.loginService.lInDB(headers).pipe(take(1))
  }
}
