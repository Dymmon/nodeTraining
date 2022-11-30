const crypto = require("crypto");
const bcrypt = require("bcrypt-nodejs");

function encrypt() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
      modulusLength: 2048,
    });
    return { pubPem: publicKey, privPem: privateKey };
  }
function compare(password1, password2){
    return new Promise ((resolve, reject) =>{
        bcrypt.compare(password1, password2, (err, response) =>{
            if(err) reject(err);
            resolve(response);
        })
    });
}

module.exports = {encrypt, compare}