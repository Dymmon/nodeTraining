const validate = require("../modules/loginModule");
const userModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

async function rutInDB(req, res){
    try {
        const digits = req.headers.rut;
        const digitV = req.headers.dv;
        const user = await userModel.findOne({rut: digits, dv:digitV});
        const {pubPem, privPem} = encrypt(digits);
        if(!user){
            const newUser = new userModel({
                rut: digits,
                dv: digitV,
                password: '0',
                pubPem,
                privPem
            });
            return newUser.save((err) =>{
                if(err) return res.status(500);
                return res.send({code: 200, pubPem});
            })
        }
        const response = await compare('0',user['password']);
        if(response){
            await userModel.findOneAndUpdate({rut: digits},{pubPem, privPem});
            return res.send({code:200, pubPem});
        }
        return res.send({code:500})
    } catch (error) {
        return res.status(500).send({code: 500, message: error});
    }
}

async function signUp(req, res){
    if(!validate.credentials(req)) return res.status(500).send({message: "Missing info"});
    const user = await userModel.findOne({ rut: req.headers.rut });
    const pass = Buffer.from(req.body.password, 'base64');
    const decrypted = crypto.privateDecrypt({
        key: user.privPem,
        padding: crypto.constants.RSA_PKCS1_PADDING},pass);
    const decryptedPass = decrypted.toString();
    bcrypt-bcrypt.genSalt(10, (err, salt) =>{
        if (err) return res.status(500);
        return bcrypt.hash(decryptedPass, salt, null, async (err, hash) =>{
            if (err) return res.status(500);
            await userModel.findOneAndUpdate({rut: req.headers.rut}, {password: hash});
            return res.status(200).send({message: "welcome"});
        })
    })
};

function compare(password1, password2){
    return new Promise ((resolve, reject) =>{
        bcrypt.compare(password1, password2, (err, response) =>{
            if(err) reject(err);
            resolve(response);
        })
    });

}

function encrypt(rut) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" },
        modulusLength: 2048,
    });
    return { pubPem: publicKey, privPem: privateKey };
}  

module.exports = {
    signUp,
    rutInDB
};