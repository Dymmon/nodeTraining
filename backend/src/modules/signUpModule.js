const validate = require("../modules/loginModule");
const loginToken = require("../modules/loginToken");
const userModel = require("../models/user");

function signUp(req, res){
    if(!validate.credentials(req)) return res.status(500).send({message: "Missing info"});
    const user = new userModel({
        rut: req.headers.rut,
        dv: req.headers.dv,
        password: req.body.password
    })
    console.log("****")
    user.save((err) =>{
        if(err) return res.status(500).send({message: `Error creating new user: ${err}`})
        return res.status(200).send({token: loginToken.createToken(user)})
    })
};

module.exports = {signUp};