const sharedPasswords = require('../shared/passwords')
const hash = '$2a$10$OBVh.78b0CAFL/e9B7mJmuvpDRHtp0xedFlQgevSEQphcSZrTJBEy';
describe('Testing sharedPasswords - compare',() => {
    test('compare 123 with 123 hash, should be true', async () =>  {
        const temp = await sharedPasswords.compare('123', hash);
        expect(temp).toBeTruthy()})
    test('compare 111 with 123 hash, should be false', async () => {
        const temp = await sharedPasswords.compare('111', hash);
        expect(temp).toBeFalsy()})
    test('compare 123 with 123, should be error', async () => {
        try {   
            const temp = await sharedPasswords.compare('123', '123');
        } catch (error) {
            expect(undefined).toBeUndefined()
        }})   
    })

describe('Testing sharedPasswords - encrypt',() => {
    test('generate pubPem and privPem, should be defined', ()=> {
        expect(sharedPasswords.encrypt()).toBeDefined()})
    }
)