const express = require("express");
const app = express();
const cors = require('cors');

require('dotenv').config();

const routesUsuario = require("./routes/routes_usuario");

app.use(express.json());
app.use(cors());

app.use("/", routesUsuario);


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});