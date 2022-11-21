const service = require("../modules/loginToken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

async function rutInDB(req, res) {
  try {
    const digits = req.headers.rut;
    const user = await userModel.findOne({ rut: digits, dv: req.headers.dv });
    if (user) {
      const {pubPem, privPem} = encrypt(digits);
      await userModel.findOneAndUpdate(
        { rut: digits },
        { pubPem, privPem }
      );
      return res.send({ code: 200});
    }
    return res.send({ code: 500 });
  } catch (error) {
    return res.status(500).send({ code: 500, message: error });
  }
}

async function signIn(req, res) {
  try {
    const user = await userModel.findOne({ rut: req.headers.rut });
    const pass = Buffer.from(req.body.password, 'base64');
    const decrypted = crypto.privateDecrypt(
    {
        key: user.privPem,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    pass
    );
    const decryptedPass = decrypted.toString();
    const response = await compare(decryptedPass, user.password);
    if (response)
      return res.status(200).send({
        token: service.createToken(user),
      });
    return res.status(500).send({ message: "Invalid Credentials" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

async function getPubPem(req, res){
    try {
        const user = await userModel.findOne({ rut: req.headers.rut });
        if (user){
            return res.status(200).send({
                pubPem: user.pubPem,
                rut: req.headers.rut,
                dv: req.headers.dv
              });
        }
        return res.status(500).send({ message: "Invalid Credentials" });
      } catch (error) {
        return res.status(500).send({ message: error });
      }
}

function compare(password1, password2) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password1, password2, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
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
  rutInDB,
  signIn,
  getPubPem
};
