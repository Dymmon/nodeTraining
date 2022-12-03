import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login/login.service';
import { RutHeadersService } from 'src/app/services/headers/rut-headers.service';
import * as rutActions from '../actions/rut.actions'
import { AppState, selectUserPass, selectUserRut } from '../app.reducers';

@Injectable()
export class RutEffects {

  password: string;
  rut: string;
  token: string;
  headers: HttpHeaders;


  login$ = createEffect(() => this.actions$.pipe(
    ofType(rutActions.REQUIRED),
    exhaustMap(() =>{
      const headersService = new RutHeadersService();
      this.headers = headersService.rutHeaders(this.rut);
      return this.loginService.postLogin(this.password, this.headers).pipe(
        map(res => {
          this.token = res.token;
          return rutActions.AUTHTOKEN({payload: {token: this.token}})
        }),catchError(() => of()))
      })
    )
  );


  done$ = createEffect(()=> this.actions$.pipe(
    ofType(rutActions.AUTHTOKEN),
    exhaustMap(() =>{
      const headers = new HttpHeaders({'authorization': this.token});
      return this.loginService.getDone(headers).pipe(
        map(res => {
          (res['code'] === 200)? this.router.navigate(['done']): this.router.navigate(['login']);
          return rutActions.AUTHORIZED();
        }),catchError(() => of()))
      })
    )
  );


  register$ = createEffect(() => this.actions$.pipe(
    ofType(rutActions.REGISTER),
    exhaustMap(() =>{
      return this.loginService.postSignUp(this.password, this.headers).pipe(
        map(res => {
          return rutActions.AUTHTOKEN({payload: {token: this.token}})
        }),catchError(() => of()))
      })));


  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.select(selectUserPass)
    .subscribe(res =>{
      this.password = res;
      this.store.select(selectUserRut).subscribe(res => this.rut = res);
    })}
}