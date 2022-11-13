const express = require("express");
const v1Router = require("./v1/routes/loginRoutes");

process.env['PORT'] = 25565;

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/healthcheck", (req, res) => {
    res.send("<h1>ONLINE</h1>");
});

app.use(express.json());
app.use("/v1/login", v1Router);

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});