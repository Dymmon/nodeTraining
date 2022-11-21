const express = require('express');
const loginController = require("../../controllers/loginController");
const auth = require("../../middlewares/auth")

router = express.Router();

router
    .post("/", loginController.checkCredentials)
    .post("/signup", loginController.signUp)
    .post("/signin", loginController.signIn)
    .get("/loginrutindb", loginController.loginRutInDB)
    .get("/suprutindb", loginController.signUpRutInDB)
    .get("/getpubpem", loginController.getPubPem)
    .get("/done", auth.isAuth, (req, res) =>{
        return res.status(200).send({code: 200, message: "Done", token : req.headers.authorization})
    })

module.exports = router;