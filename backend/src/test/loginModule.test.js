const loginModule = require('../modules/loginModule');

describe('Testing loginModule - validation', () => {
    test('try 12312312 and 1 as rut, should be false', () => {
        expect(loginModule.validate('12312312', '1')).toBeFalsy();
    });
    test('try aaaaaaaa and a as rut, should be false', () => {
      expect(loginModule.validate('aaaaaaaa', 'a')).toBeFalsy();
  });
    test('try 19938027 and 3 as rut, should be true', () => {
    expect(loginModule.validate('19938027', '3')).toBeTruthy();
    });
    test('try 19994035 and k as rut, should be true', () => {
      expect(loginModule.validate('19994035', 'k')).toBeTruthy();
    });
    test('try undefined as rut, should be error', () => {
      expect(loginModule.validate(undefined, undefined)).toBeFalsy();
    });
});

describe('Testing loginModule - credentials', () => {
  test('valid rut and filled info fields, should be true', () => {
    const req = {
      headers:{ rut: '19938027', dv: '3'},
      body:{password: '123'}
    };
    expect(loginModule.credentials(req)).toBeTruthy();
  })
  test('invalid info fields, should be false', () => {
    const req = {
      headers:{ rut: '19938029', dv: '3'},
      body:{password: '123'}
    }
    expect(loginModule.credentials(req)).toBeFalsy();
  })
  test('no info fields, should be false', () => {
    const req = {};
    expect(loginModule.credentials(req)).toBeFalsy();
  })
});