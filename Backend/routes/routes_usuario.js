const express = require("express");
const router = express.Router();


const usuarioController = require("../JS/CONTROLLER/usuario_controller");
const {validarEmail} = require("../JS/MODEL/service/emailService");

/*const checarEmail = async (req, res, next) => {
    const { email } = req.body;
    
    const emailValido = await validarEmail(email);
    
    if (!emailValido) {
        return res.status(400).json({ erro: "O e-mail informado não é válido ou não existe." });
    }
    next();
};*/

router.post("/",usuarioController.cadastroUsuario);

router.post("/admin/cadastro", usuarioController.cadastroAdmin);

router.post("/login", usuarioController.login);

router.get("/", usuarioController.listarTodos);

router.delete("/admin/usuarios/:id", usuarioController.excluirUsuario);

module.exports = router;