import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassLoginComponent } from './pass-login.component';

describe('PassLoginComponent', () => {
  let component: PassLoginComponent;
  let fixture: ComponentFixture<PassLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
