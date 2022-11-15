const service = require("../modules/loginToken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

async function signIn(req, res){
    try {
        const user = await userModel.findOne({rut: req.headers.rut});
        const response = await compare(req.body.password, user.password);
        console.log(response);
        if(response) return res.status(200).send({
            message: "logged in",
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

module.exports = {signIn};