const express = require("express");
const router = express.Router();

const usuarioController = require("../JS/CONTROLLER/usuario_controller");
const verificarAdmin = require('../middleware/verificaradmin');

router.post("/cadastrar", usuarioController.cadastroUsuario);
router.post("/admin/cadastro", usuarioController.cadastroAdmin);
router.post("/", usuarioController.login);
router.post("/admin/login", usuarioController.loginAdmin);
router.get("/", usuarioController.listarTodos);
router.delete("/admin/excluir/:id", verificarAdmin, usuarioController.excluirUsuario);

module.exports = router;