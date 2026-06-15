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

// 3. BUSCAR POR E-MAIL (Perfeito!)
exports.buscarPorEmail = async (email) => {
    const sql = "SELECT * FROM Usuarios WHERE email = ?";
    const [rows] = await conexao.promise().query(sql, [email]);
    return rows[0]; // Devolve o usuário encontrado ou undefined
};

// Excluir por id
exports.excluirUsuario = async (id, callback) =>{
    const sql = "DELETE FROM Usuarios WHERE id_usuarios = ?";
    conexao.query(sql, [id], (erro, resultado) => {
        if (erro){
            throw erro;
        }
        callback(resultado);
    });
};