const User = require("../models/user");
const service = require("../modules/loginToken")

function signUpService(req){
    const user = new User({
        rut: req.headers.rut,
        dv: req.headers.dv,
        password: req.body.password
    })
    
    user.save((err) =>{
        if(err) return {response: `Error creating new user: ${err}`};
        return {response: service.createToken(user)};
    })
    return "aaaa";
}

module.exports = {signUpService};

