import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutLoginComponent } from './rut-login.component';

describe('RutLoginComponent', () => {
  let component: RutLoginComponent;
  let fixture: ComponentFixture<RutLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
