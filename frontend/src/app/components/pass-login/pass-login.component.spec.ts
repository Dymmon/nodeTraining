import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';

import { PassLoginComponent } from './pass-login.component';

describe('PassLoginComponent', () => {
  let component: PassLoginComponent;
  let fixture: ComponentFixture<PassLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassLoginComponent ],
      imports: [
        StoreModule.forRoot({rut: rutReducer}),
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('PassLogin should be defined', () => {
    expect(component).toBeDefined();
  })

});
