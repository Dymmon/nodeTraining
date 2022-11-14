const jwt = require('jwt-simple')
const moment = require('moment/moment')
const config = require('../config')

function createToken (user){
    const payload = {
        sub: user.rut,
        iat: moment().unix(),
        exp: moment().add(15, 'minutes').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token){
    const decoded = new Promise((resolve, reject) =>{
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if(payload.exp <= moment().unix()){
                resolve({
                    status: 401,
                    message: "Expired token"
                })
            }
            resolve(payload.sub);
        } catch (err) {
            reject({
                status: 500,
                message: "Invalid Token"
            })
        }
    })
    return decoded;
}

module.exports = {createToken, decodeToken}