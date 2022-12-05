import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RutHeadersService } from '../headers/rut-headers.service';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('postLogin should be defined', () => {
    const headersService = new RutHeadersService();
    const headers = headersService.rutHeaders('');
    expect(service.postLogin('111',headers)).toBeDefined();
  });
  it('postSignUp should be defined', () => {
    const headersService = new RutHeadersService();
    const headers = headersService.rutHeaders('');
    expect(service.postSignUp('111',headers)).toBeDefined();
  });
  it('getDone should be defined', () => {
    const headersService = new RutHeadersService();
    const headers = headersService.rutHeaders('');
    expect(service.getDone(headers)).toBeDefined();
  });
});
