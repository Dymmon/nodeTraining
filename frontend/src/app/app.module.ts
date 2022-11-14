import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Componente1 } from './components/componente1/componente1.component';
import { Componente2Component } from './components/componente2/componente2.component'

@NgModule({
  declarations: [
    AppComponent,
    Componente1,
    Componente2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
