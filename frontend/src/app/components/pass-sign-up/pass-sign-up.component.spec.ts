import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';

import { PassSignUpComponent } from './pass-sign-up.component';

describe('PassSignUpComponent', () => {
  let component: PassSignUpComponent;
  let fixture: ComponentFixture<PassSignUpComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassSignUpComponent ],
      imports:[
        StoreModule.forRoot({rut: rutReducer}),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('passSignUp should be defined', () => {
    expect(component).toBeDefined();
  });
  it('user should update from form changes', fakeAsync(() => {
    component.signUpForm.controls['pass1'].setValue('199380273');
    component.signUpForm.controls['pass2'].setValue('199380273');
    expect(component.signUpForm.value['pass1']).toEqual('199380273');
    expect(component.signUpForm.value['pass2']).toEqual('199380273');
  }));
  it('should do alert', fakeAsync(() => {
    component.signUpForm.controls['pass1'].setValue('');
    component.signUpForm.controls['pass2'].setValue('');
    expect(component.signUp()).toBeUndefined();
  }))
  it('should do alert', fakeAsync(() => {
    component.signUpForm.controls['pass1'].setValue('');
    component.signUpForm.controls['pass2'].setValue('123');
    expect(component.signUp()).toBeUndefined();
  }))
  it('should be undefined', fakeAsync(() => {
    component.signUpForm.controls['pass1'].setValue('199380273');
    component.signUpForm.controls['pass2'].setValue('199380273');
    expect(component.signUp()).toBeUndefined();
  }))

});
