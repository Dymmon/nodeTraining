import { HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RutHeadersService } from './rut-headers.service';

describe('RutHeadersService', () => {
  let service: RutHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Testing headers', () => {
    it('try valid rut, should be equal to defined prototipe', () => {
      const headers = new HttpHeaders({rut: '19938027',dv: '3'});
      const json1 = JSON.stringify(headers);
      const json2 = JSON.stringify(service.rutHeaders('199380273'));
      expect(json2).toEqual(json1);
    });
    it('try void rut, should be equal to defined prototipe', () => {
      const headers = new HttpHeaders({rut: '11111111',dv: '1'});
      const json1 = JSON.stringify(headers);
      const json2 = JSON.stringify(service.rutHeaders(''));
      expect(json2).toEqual(json1);
    });
  });
});
