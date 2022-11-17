import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutSignUpComponent } from './rut-sign-up.component';

describe('RutSignUpComponent', () => {
  let component: RutSignUpComponent;
  let fixture: ComponentFixture<RutSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
