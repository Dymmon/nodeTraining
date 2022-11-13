const loginModule = require("../modules/loginModule");

const checkCredentials = (req, res) =>{
    let {body} = req;
    const {headers} = req;
    const response = loginModule.credentials(headers.rut, headers.dv, body.password, res);
    return response;
};

module.exports = {checkCredentials};