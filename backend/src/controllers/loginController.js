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

const loginRutInDB = (req,res) =>{
    const response = signInModule.rutInDB(req, res);
    return response;
}

const signUpRutInDB = (req, res) =>{
    const response = signUpModule.rutInDB(req, res);
    return response;
}

const signIn = (req,res) =>{
    const response = signInModule.signIn(req, res);
    return response;
};

const getPubPem = (req, res) =>{
    const response = signInModule.getPubPem(req, res);
    return response;
}

module.exports = {
    checkCredentials,
    signUp,
    signUpRutInDB,
    loginRutInDB,
    signIn,
    getPubPem
};