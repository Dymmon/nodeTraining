import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';

import { RutSignUpComponent } from './rut-sign-up.component';

describe('RutSignUpComponent', () => {
  let component: RutSignUpComponent;
  let fixture: ComponentFixture<RutSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutSignUpComponent ],
      imports: [
        StoreModule.forRoot({rut: rutReducer}),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('rutSingUp should be defined', () => {
    expect(component).toBeDefined();
  })

});
