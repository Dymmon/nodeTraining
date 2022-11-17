const service = require("../modules/loginToken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

async function rutInDB(req, res){
    try {
        const user = await userModel.findOne({rut: req.headers.rut, dv:req.headers.dv});
        return (user? res.send({code:200}) : res.send({code:500}));
    } catch (error) {
        return res.status(500).send({code: 500, message: error});
    }
}

async function signIn(req, res){
    try {
        const user = await userModel.findOne({rut: req.headers.rut});
        const response = await compare(req.body.password, user.password);
        if(response) return res.status(200).send({
            token: service.createToken(user)
        });
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

function compare(password1, password2){
    return new Promise ((resolve, reject) =>{
        bcrypt.compare(password1, password2, (err, response) =>{
            if(err) reject(err);
            resolve(response);
        })
    });

}

module.exports = {
    rutInDB,
    signIn
};