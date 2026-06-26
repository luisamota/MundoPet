const bcrypt = require('bcrypt');
const repo = require('../repositories/usuario_repositorio'); 
const jwt = require('jsonwebtoken');

exports.cadastrar = async (email, nome_usuario, nomePet, especie, raca, senha) => {
    const especieAnimal = ['cachorro', 'gato'];
    console.log(localStorage.getItem("especieSelecionada"))

    // if (!especie || !especieAnimal.includes(especie.toLowerCase())) {
    //     throw new Error('Por favor, selecione se o seu pet é um cachorro ou um gato.');
    // }

    const jaExiste = await repo.buscarPorEmail(email);
    if (jaExiste) throw new Error('Este e-mail já está cadastrado');

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await repo.cadastroUsuario({
        email,
        nome_usuario,
        nomePet,
        especie: especie.toLowerCase(),
        raca,
        senha: senhaCriptografada
    });

    return { mensagem: 'Usuário e Pet cadastrados com sucesso!' };
};

exports.cadastrarAdmin = async (email_admin, nome_admin, senha_admin) => {
    const jaExiste = await repo.buscarAdminPorEmail(email_admin);
    if (jaExiste) throw new Error('Este e-mail já está cadastrado');

    const senhaCriptografada = await bcrypt.hash(senha_admin, 10);

    await repo.cadastroAdmin({
        email_admin,
        nome_admin,
        senha_admin: senhaCriptografada
    });

    return { mensagem: 'Administrador cadastrado com sucesso!' };
};

exports.login = async (email, senha) => {
    const usuario = await repo.buscarPorEmail(email);
    if (!usuario) throw new Error('Usuário não encontrado');

    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) throw new Error('Senha incorreta');

    const token = jwt.sign(
        { id: usuario.id_usuarios, tipo: 'usuario', nome: usuario.nome_usuario }, // ← adicionado nome
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return {
        loginSucesso: true,
        token,
        id_usuarios: usuario.id_usuarios,
        nomePet: usuario.nomePet
    };
};

exports.loginAdmin = async (email_admin, senha_admin) => {
    const admin = await repo.buscarAdminPorEmail(email_admin);
    if (!admin) throw new Error('Admin não encontrado');

    const senhaOk = await bcrypt.compare(senha_admin, admin.senha_admin);
    if (!senhaOk) throw new Error('Senha incorreta');

    const token = jwt.sign(
        { id: admin.id_admin, tipo: 'admin', nome: admin.nome_admin }, // ← adicionado nome
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return {
        loginSucesso: true,
        token,
        id_admin: admin.id_admin,
        nome_admin: admin.nome_admin
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

exports.editar = async (id, dados) => {
    const usuario = await repo.buscarPorId(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    await repo.editar(id, {
        email: dados.email || usuario.email,
        nome_usuario: dados.nome_usuario || usuario.nome_usuario,
        nomePet: dados.nomePet || usuario.nomePet,
        especie: dados.especie || usuario.especie,
        raca: dados.raca || usuario.raca
    });

    return { mensagem: 'Usuário atualizado com sucesso!' };
};