const sharedPasswords = require('../shared/passwords')

describe('Testing sharedPasswords - compare',() => {
    const hash = '$2a$10$OBVh.78b0CAFL/e9B7mJmuvpDRHtp0xedFlQgevSEQphcSZrTJBEy';
    test('compare 123 with hash, should be true', ()=> {
        expect(sharedPasswords.compare('123', hash)).toBeTruthy()})
    }
)

describe('Testing sharedPasswords - encrypt',() => {
    test('generate pubPem and privPem, should be defined', ()=> {
        expect(sharedPasswords.encrypt()).toBeDefined()})
    }
)