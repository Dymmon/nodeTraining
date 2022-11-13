const express = require('express');
const loginController = require("../../controllers/loginController");

router = express.Router();

router
    .post("/", loginController.checkCredentials)

module.exports = router;