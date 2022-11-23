import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoneComponent } from './components/done/done.component';
import { ErrorComponent } from './components/error/error.component';
import { PassLoginComponent } from './components/pass-login/pass-login.component';
import { PassSignUpComponent } from './components/pass-sign-up/pass-sign-up.component';
import { RutLoginComponent } from './components/rut-login/rut-login.component';
import { RutSignUpComponent } from './components/rut-sign-up/rut-sign-up.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: RutLoginComponent},
  {path: 'login/password', component: PassLoginComponent},
  {path:'signup', component: RutSignUpComponent},
  {path: 'signup/password', component: PassSignUpComponent},
  {path:'done',component: DoneComponent },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
