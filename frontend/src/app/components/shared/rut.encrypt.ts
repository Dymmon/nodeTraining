import JSEncrypt from "jsencrypt";

export function getKeyRut(pubPem: string, password: string){
    var encrypt = new JSEncrypt({default_key_size: '2048'});
    encrypt.setPublicKey(pubPem);
    const encryptedPass = encrypt.encrypt(password);
    return encryptedPass;
}