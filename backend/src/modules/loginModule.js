
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
const credentials = (req) =>{
    const rut = req.headers.rut;
    const dv = req.headers.dv;
    const password = req.body.password;
    if(!password || !rut || !dv || !validate(rut, dv)){
        return false;
    }
    return true;
};

module.exports = {credentials, validate};
