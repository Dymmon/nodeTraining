import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoneComponent } from './components/done/done.component';
import { ErrorComponent } from './components/error/error.component';
import { RutLoginComponent } from './components/rut-login/rut-login.component';
import { PassLoginComponent } from './components/pass-login/pass-login.component';
import { RutSignUpComponent } from './components/rut-sign-up/rut-sign-up.component';
import { PassSignUpComponent } from './components/pass-sign-up/pass-sign-up.component';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from './components/redux/reducers/rut.reducer';

@NgModule({
  declarations: [
    AppComponent,
    DoneComponent,
    ErrorComponent,
    RutLoginComponent,
    PassLoginComponent,
    RutSignUpComponent,
    PassSignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot({rut: rutReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
