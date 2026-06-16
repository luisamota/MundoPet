const express = require("express");
const app = express();
require('dotenv').config();

const routesUsuario = require("./routes/routes_usuario");

app.use(express.json());

app.use("/usuario", routesUsuario);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});