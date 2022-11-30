const loginModule = require('../modules/loginModule');

describe('Testing loginModule - validation', () => {
    test('try 12312312 and 1 as rut, should be false', () => {
        expect(loginModule.validate('12312312', '1')).toBeFalsy();
      });
    
    test('try 19938027 and 3 as rut, should be true', () => {
    expect(loginModule.validate('19938027', '3')).toBeTruthy();
    });
});