import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';

import { PassSignUpComponent } from './pass-sign-up.component';

describe('PassSignUpComponent', () => {
  let component: PassSignUpComponent;
  let fixture: ComponentFixture<PassSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassSignUpComponent ],
      imports:[
        StoreModule.forRoot({rut: rutReducer}),
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('passSignUp should be defined', () => {
    expect(component).toBeDefined();
  })

});
