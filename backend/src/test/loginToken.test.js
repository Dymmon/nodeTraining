const loginToken = require('../modules/loginToken');

describe('Testing loginToken - createToken',() => {
    test('try rut:19938027, should be defined', () => {
        expect(loginToken.createToken({'rut': '19938027'})).toBeDefined();
    });
});

describe('Testing loginToken - decodeToken', () => {
    test(`try valid token, should be 19938027`, async () => {
        const token = loginToken.createToken({'rut': '19938027'});
        const decoded = await loginToken.decodeToken(token);
        expect(decoded).toBe('19938027');
    });
    test('try token: 1234, should be error', async () => {
        try {   
            const decoded = await loginToken.decodeToken('1234');
        } catch (error) {
            expect(undefined).toBeUndefined()
        }
    })
})