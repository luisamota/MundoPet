const express = require("express");
const router = express.Router();

const usuarioController = require("../JS/CONTROLLER/usuario_controller");
const verificarAdmin = require('../middleware/verificaradmin');
const verificarToken = require('../middleware/verificarToken'); // ← importa o middleware

router.post("/cadastrar", usuarioController.cadastroUsuario);
router.post("/admin/cadastro", usuarioController.cadastroAdmin);
router.post("/login", usuarioController.login);
router.post("/admin/login", usuarioController.loginAdmin);
router.get("/", verificarToken, usuarioController.listarTodos);           // ← protegida
router.delete("/admin/excluir/:id", verificarAdmin, usuarioController.excluirUsuario);

module.exports = router;