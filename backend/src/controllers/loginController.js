const loginModule = require("../modules/loginModule");
const signUpModule = require("../modules/signUpModule");
const signInModule = require("../modules/signInModule")

const checkCredentials = (req, res) =>{
    const response = loginModule.credentials(req, res);
    return response;
};

const signUp = (req,res) =>{
    const response = signUpModule.signUp(req,res);
    return response;
};

const rutInDB = (req,res) =>{
    const response = signInModule.rutInDB(req, res);
    return response;
}

const signIn = (req,res) =>{
    const response = signInModule.signIn(req,res);
    return response;
};

module.exports = {
    checkCredentials,
    signUp,
    rutInDB,
    signIn
};