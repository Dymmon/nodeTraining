import { TestBed } from '@angular/core/testing';

import { RutValidateService } from './rut-validate.service';

describe('RutValidateService', () => {
  let service: RutValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Testing validate', () => {
    it('try 12312312 and 1 as rut, should be false', () => {
        expect(service.validate('12312312', '1')).toBeFalsy();
    });
    it('try aaaaaaaa and a as rut, should be false', () => {
      expect(service.validate('aaaaaaaa', 'a')).toBeFalsy();
    });
    it('try 19938027 and 3 as rut, should be true', () => {
    expect(service.validate('19938027', '3')).toBeTruthy();
    });
    it('try 19994035 and k as rut, should be true', () => {
      expect(service.validate('19994035', 'k')).toBeTruthy();
    });
    it('try undefined as rut, should be error', () => {
      expect(service.validate(undefined, undefined)).toBeFalsy();
    });
  });
  
});

