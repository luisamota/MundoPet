// src/MODEL/service/usuario_service.js

const bcrypt = require('bcrypt');
const repo = require('../repositories/usuario_repositorio'); 
const jwt = require('jsonwebtoken');


exports.cadastrar = async (email, nomePet, senha, tipo = 'usuario') => {

    const jaExiste = await repo.buscarPorEmail(email);
    if (jaExiste) throw new Error('Este e-mail já está cadastrado');

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await repo.cadastroUsuario({
        email,
        nomePet,
        senha: senhaCriptografada,
        tipo
    });

    return { mensagem: 'Usuário e Pet cadastrados com sucesso!' };
};


exports.cadastrarAdmin = async (email, nomePet, senha) => {
    const jaExiste = await repo.buscarPorEmail(email);
    if (jaExiste) throw new Error('Este e-mail já está cadastrado');

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await repo.cadastroUsuario({
        email,
        nomePet,
        senha: senhaCriptografada,
        tipo: 'admin' 
    });

    return { mensagem: 'Administrador cadastrado com sucesso!' };
};




exports.login = async (email, senha) => {
    const usuario = await repo.buscarPorEmail(email);
    if (!usuario) throw new Error('Usuário não encontrado');

    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) throw new Error('Senha incorreta');

    const token = jwt.sign(
        { 
            id: usuario.id_usuarios, 
            tipo: usuario.tipo  // 'admin' ou 'usuario'
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return { 
        loginSucesso: true,
        token,
        id_usuarios: usuario.id_usuarios, 
        tipo: usuario.tipo, 
        nomePet: usuario.nomePet 
    };
};


exports.listarTodos = async () => {
    return await repo.listar();
};



exports.excluir = async (id) => {
    const usuario = await repo.buscarPorId(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    await repo.excluir(id);

    return { mensagem: 'Usuário deletado com sucesso!' };
};