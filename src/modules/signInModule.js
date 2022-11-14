const service = require("../modules/loginToken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

function signIn(req, res){
    userModel.findOne({rut: req.headers.rut}, (err, user) =>{
        if(err) return res.status(500).send({message: err});
        if(!user) return res.status(404).send({message: "User not found"});
        req.user = user;
        bcrypt.compare(req.body.password, user.password, function(err, response){
            if(err) return res.status(500).send({message: `Error while loggin: ${err}`});
            if(response){
                return res.status(200).send({
                    message: 'sign in',
                    token: service.createToken(user)
                });
            }
            return res.status(500).send({message: 'Wrong user or password'});
        })
    })
}

module.exports = {signIn};