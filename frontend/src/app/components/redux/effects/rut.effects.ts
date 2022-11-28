import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { rutHeaders } from '../../shared/rut.headers';
import { AUTHORIZED, AUTHTOKEN, REQUIRED } from '../actions/rut.actions';
import { AppState, selectUserPass, selectUserRut, selectUserToken } from '../app.reducers';

@Injectable()
export class RutEffects {
  password: string;
  rut: string;
  token: string;
  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(REQUIRED),
    exhaustMap(action =>{
      const headers = rutHeaders(this.rut);
      return this.loginService.postLogin(this.password, headers).pipe(
        map(res => {
          this.token = res.token;
          return AUTHTOKEN({payload: {token: this.token}})}),
        catchError(error => of())
        )}
    )
  )
);
  done$ = createEffect(()=> this.actions$.pipe(
    ofType(AUTHTOKEN),
    exhaustMap(action =>{
      const headers = new HttpHeaders({'authorization': this.token});
      return this.loginService.getDone(headers).pipe(
        map(res => {
          (res['code'] === 200)? this.router.navigate(['done']): this.router.navigate(['login']);
          return AUTHORIZED();
        }),
        catchError(error => of())
      )
    })

  ))
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private store: Store<AppState>
  ) {this.store.select(selectUserPass)
    .subscribe(res =>{
      this.password = res;
      this.store.select(selectUserRut).subscribe(res => this.rut = res);
    })}
}