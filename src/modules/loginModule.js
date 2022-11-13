const loginService = require("../services/loginService");

const validate = (rut, dv) =>{
    let suma = 0, num = 2;
    try {
        while(rut){
            const temp = rut.slice(-1);
            rut = rut.substring(0, rut.length - 1);
            if(num > 7){
                num = 2;
            }
            suma += parseInt(temp) * num;
            num++;
        }
        suma = (11 - suma%11).toString();
        if(suma == "10"){
            suma = "k"
        }
        if(suma == dv){
            return 1;
        }
        return 0; 
    } catch (error) {
        return 0;
    }
   
};
const credentials = (reqRut, reqDv, reqPassword, res) =>{
    const rut = reqRut;
    const dv = reqDv;
    const password = reqPassword;
    let response;
    if(!password || !rut || !dv || !validate(rut, dv)){
        response = {code:500, data: "Missing info"};
        return res.status(500).send(response);
    }
    response = {code: 200, data: {
        "rut": rut,
        "dv": dv,
        "password": password
    }};
    return res.status(200).send(response);
};
module.exports = {credentials};
