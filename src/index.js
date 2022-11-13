const config = require("./config")
const mongoose = require("mongoose");
const express = require("express");
const v1Router = require("./v1/routes/loginRoutes");



const app = express();
const PORT = config.port;

app.get("/healthcheck", (req, res) => {
    res.send("<h1>ONLINE</h1>");
});

app.use(express.json());
app.use("/v1/login", v1Router);

mongoose.connect("mongodb://127.0.0.1:27017/TRAINING", (err, res) => {
    if(err){
        return console.log(`DB connection error: ${err}`);
    }
    console.log();
    console.log("DB connected");
    app.listen(PORT, () =>{
        console.log(`Server listening on port ${PORT}`);
    });
});