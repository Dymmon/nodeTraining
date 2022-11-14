const express = require('express');
const loginController = require("../../controllers/loginController");
const auth = require("../../middlewares/auth")

router = express.Router();

router
    .post("/", loginController.checkCredentials)
    .post("/signup", loginController.signUp)
    .post("/signin", loginController.signIn)
    .get("/testing", auth.isAuth, (req, res) =>{
        return res.status(200).send({message: "Done"})
    })

module.exports = router;