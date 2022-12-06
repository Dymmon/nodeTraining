import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectUserRut } from '../components/redux/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class InitGuard implements CanActivate {
  status: boolean = false;
  constructor(
    private store: Store<AppState>,
    private router: Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.select(selectUserRut)
      .subscribe(res => {
        if(res){
          this.status = true;
        }else{
          this.router.navigate(['login']);
          this.status = false;
        }
      })
    return this.status;
  }
  
}
