const conexao = require("../../database/conexao");

exports.listar = async () => {
    const sql = "SELECT id_usuarios, email, nome_usuario, nomePet FROM Usuarios";
    const [rows] = await conexao.promise().query(sql);
    return rows;
};

exports.cadastroUsuario = async (usuario) => {
    const sql = "INSERT INTO Usuarios (email, nome_usuario, nomePet, especie, raca, senha) VALUES (?, ?, ?, ?, ?, ?)";
    
    const [resultado] = await conexao.promise().query(sql, [
        usuario.email,
        usuario.nome_usuario,
        usuario.nomePet,
        usuario.especie,
        usuario.raca,
        usuario.senha
    ]);
    
    return resultado;
};

exports.buscarPorEmail = async (email) => {
    const sql = "SELECT * FROM Usuarios WHERE email = ?";
    const [rows] = await conexao.promise().query(sql, [email]);
    return rows[0];
};

exports.buscarPorId = async (id) => {
    const sql = "SELECT * FROM Usuarios WHERE id_usuarios = ?";
    const [rows] = await conexao.promise().query(sql, [id]);
    return rows[0];
};

exports.excluir = async (id) => {
    const sql = "DELETE FROM Usuarios WHERE id_usuarios = ?";
    const [resultado] = await conexao.promise().query(sql, [id]);
    return resultado;
};

exports.cadastroAdmin = async (admin) => {
    const sql = "INSERT INTO Admin (email_admin, nome_admin, senha_admin) VALUES (?, ?, ?)";
    
    const [resultado] = await conexao.promise().query(sql, [
        admin.email_admin,
        admin.nome_admin,
        admin.senha_admin
    ]);
    
    return resultado;
};

exports.buscarAdminPorEmail = async (email_admin) => {
    const sql = "SELECT * FROM Admin WHERE email_admin = ?";
    const [rows] = await conexao.promise().query(sql, [email_admin]);
    return rows[0];
};
