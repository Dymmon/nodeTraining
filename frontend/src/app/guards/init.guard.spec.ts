import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { rutReducer } from '../components/redux/reducers/rut.reducer';

import { InitGuard } from './init.guard';

describe('InitGuard', () => {
  let guard: InitGuard;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot({rut: rutReducer})],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
    guard = TestBed.inject(InitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should do something', () => {
    const result = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'testUrl'});
    expect(result).toBeFalsy();
  })
});
