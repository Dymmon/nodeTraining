const User = require("../models/user");
const service = require("../modules/loginToken")

function signUp(req, res){
    const user = new User({
        rut: req.headers.rut,
        dv: req.headers.dv,
        password: req.body.password
    })

    user.save((err) =>{
        if(err) return res.status(500).send({message: `Error creating new user: ${err}`})

        return res.status(200).send({token: service.createToken(user)})
    })
}

function signIn(req, res){
    User.find({rut: req.headers.rut}, (err, user) =>{
        if(err) return res.status(500).send({message: err});
        if(!user) return res.status(404).send({message: "User not found"});

        req.user = user;
    })
}

module.exports = {signUp, signIn}