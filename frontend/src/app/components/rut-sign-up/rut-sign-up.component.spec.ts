import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';

import { RutSignUpComponent } from './rut-sign-up.component';

describe('RutSignUpComponent', () => {
  let component: RutSignUpComponent;
  let fixture: ComponentFixture<RutSignUpComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutSignUpComponent ],
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

    fixture = TestBed.createComponent(RutSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('rutSingUp should be defined', () => {
    expect(component).toBeDefined();
  });
  it('user should update from form changes', fakeAsync(() => {
    component.signUpForm.controls['rut'].setValue('199380273');
    expect(component.signUpForm.value['rut']).toEqual('199380273');
  }));
  it('should do alert', fakeAsync(() => {
    component.signUpForm.controls['rut'].setValue('');
    expect(component.signUp()).toBeUndefined();
  }))
  it('should be undefined', fakeAsync(() => {
    component.signUpForm.controls['rut'].setValue('199380273');
    expect(component.signUp()).toBeUndefined();
  }))

});
