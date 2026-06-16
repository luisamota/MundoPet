const conexao = require("../../database/conexao");


exports.listar = async () => {
    const sql = "SELECT id_usuarios, email, nomePet, tipo FROM Usuarios";
    const [rows] = await conexao.promise().query(sql);
    return rows;
};


exports.cadastroUsuario = async (usuario) => {
    const tipoFinal = usuario.tipo || 'usuario';

    const sql = "INSERT INTO Usuarios (email, nomePet, senha, tipo) VALUES (?, ?, ?, ?)";
    
    const [resultado] = await conexao.promise().query(sql, [
        usuario.email, 
        usuario.nomePet, 
        usuario.senha, 
        tipoFinal
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