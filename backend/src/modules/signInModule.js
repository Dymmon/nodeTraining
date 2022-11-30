const service = require("../modules/loginToken");
const userModel = require("../models/user");
const sharedPasswords = require('../shared/passwords');
const crypto = require("crypto");

async function rutInDB(req, res) {
  try {
    const digits = req.headers.rut;
    const user = await userModel.findOne({ rut: digits, dv: req.headers.dv });
    if (user) {
      const {pubPem, privPem} = sharedPasswords.encrypt();
      await userModel.findOneAndUpdate(
        { rut: digits },
        { pubPem, privPem }
      );
      return res.send({ code: 200, pubPem});
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
    const decrypted = crypto.privateDecrypt({
      key: user.privPem,
      padding: crypto.constants.RSA_PKCS1_PADDING},pass);
    const decryptedPass = decrypted.toString();
    const response = await sharedPasswords.compare(decryptedPass, user.password);
    if (response)
      return res.status(200).send({
        token: service.createToken(user),
      });
    return res.status(500).send({ message: "Invalid Credentials" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

module.exports = {
  rutInDB,
  signIn
};
