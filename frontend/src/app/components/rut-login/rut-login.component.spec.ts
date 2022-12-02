import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';

import { RutLoginComponent } from './rut-login.component';

describe('RutLoginComponent', () => {
  let component: RutLoginComponent;
  let fixture: ComponentFixture<RutLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutLoginComponent ],
      imports: [
        StoreModule.forRoot({rut: rutReducer}),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('rutLogin should be defined', () => {
    expect(component).toBeDefined();
  })

});
