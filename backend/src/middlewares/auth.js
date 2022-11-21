const loginToken = require("../modules/loginToken")

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({code: 403, message: "unauthorized access"})
    }
    const token = req.headers.authorization
    loginToken.decodeToken(token)
        .then((response) =>{
             req.user = response;
             next();
        })
        .catch(response => {
            return res.status(response.status).send(response.message);
        })
}

module.exports = {isAuth}