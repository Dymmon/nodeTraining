const loginToken = require('../modules/loginToken');

describe('Testing loginToken - createToken',() => {
    test('try rut:19938027, should be defined', () => {
        expect(loginToken.createToken({'rut': '19938027'})).toBeDefined();
    })
});
describe('Testing loginToken - createToken', () =>{
    const token = loginToken.createToken({'rut': '19938027'});
    test(`try token: ${token}, should be 19938027`, () => {
        expect(loginToken.decodeToken(token)).resolves.toBe('19938027');
    })
});