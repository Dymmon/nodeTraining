import { TestBed } from '@angular/core/testing';

import { RutEncryptService } from './rut-encrypt.service';

describe('RutEncryptService', () => {
  let service: RutEncryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutEncryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Testing encrypt', () => {
    it('testing encrypt pass "1234" with given pubPem, lenght should be 344', () => {
      const pubPem = '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv8Ffsw7dLpIA2adeFRah\n' +
      'eFbueN7PLfCpzIoxPCXg0+c7ZO9IjbfX+FIWIGhWf6j/hhaagkoXoNthTWOk5tRS\n' +
      'sSSp3OWh576TiO7XNe1YvGfBBshKAvxWiIYXilxv+crL8Qj1VlD+F/ZZzyKHxyN9\n' +
      '5aaCfsiqJaASrQRRGsD6hw4qYOfsbD4sBjBOi6HnQUi8CDpyxj+GaDd9oHAeI7As\n' +
      'tccPH48T9fUL/ogx979sy2LPgv7afiI1gA17FA250GL3XpEZENqAOhE+MCka6iJv\n' +
      '0h9ajsvRcfaSsTHb+suW8/VB3TPUkQg78nd4lRTZKxh2aye1zazqWdtMJqxg31W9\n' +
      'twIDAQAB\n' +
      '-----END PUBLIC KEY-----\n'
      const encryptedPass = service.encryptPass(pubPem, '1234').toString();
      expect(encryptedPass.length).toBe(344);
    })
  } )
});
