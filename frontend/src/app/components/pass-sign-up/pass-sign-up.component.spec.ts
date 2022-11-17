import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassSignUpComponent } from './pass-sign-up.component';

describe('PassSignUpComponent', () => {
  let component: PassSignUpComponent;
  let fixture: ComponentFixture<PassSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
