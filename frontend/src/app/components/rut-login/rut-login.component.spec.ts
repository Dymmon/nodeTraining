import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';
import { Router } from '@angular/router';

import { RutLoginComponent } from './rut-login.component';

describe('RutLoginComponent', () => {
  let component: RutLoginComponent;
  let fixture: ComponentFixture<RutLoginComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutLoginComponent ],
      imports: [
        StoreModule.forRoot({rut: rutReducer}),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('rutLogin should be defined', () => {
    expect(component).toBeDefined();
  });
  it('user should update from form changes', fakeAsync(() => {
    component.signInForm.controls['rut'].setValue('199380273');
    expect(component.signInForm.value['rut']).toEqual('199380273');
  }));
  it('should do alert', fakeAsync(() => {
    component.signInForm.controls['rut'].setValue('');
    expect(component.signIn()).toBeUndefined();
  }))
  it('should be undefined', fakeAsync(() => {
    component.signInForm.controls['rut'].setValue('199380273');
    expect(component.signIn()).toBeUndefined();
  }))

});
