import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../redux/reducers/rut.reducer';

import { DoneComponent } from './done.component';

describe('DoneComponent', () => {
  let component: DoneComponent;
  let fixture: ComponentFixture<DoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneComponent ],
      imports: [StoreModule.forRoot({rut: rutReducer})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Done should be defined', ()=>{
    expect(component).toBeDefined();
  })

});
