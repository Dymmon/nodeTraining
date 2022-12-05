import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';

import { PassLoginComponent } from './pass-login.component';

describe('PassLoginComponent', () => {
  let component: PassLoginComponent;
  let fixture: ComponentFixture<PassLoginComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassLoginComponent ],
      imports: [
        StoreModule.forRoot({rut: rutReducer}),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('PassLogin should be defined', () => {
    expect(component).toBeDefined();
  });
  it('user should update from form changes', fakeAsync(() => {
    component.signInForm.controls['pass'].setValue('199380273');
    expect(component.signInForm.value['pass']).toEqual('199380273');
  }));
  it('should do alert', fakeAsync(() => {
    component.signInForm.controls['pass'].setValue('');
    expect(component.signIn()).toBeUndefined();
  }))
  it('should be undefined', fakeAsync(() => {
    component.signInForm.controls['pass'].setValue('199380273');
    expect(component.signIn()).toBeUndefined();
  }))

});
