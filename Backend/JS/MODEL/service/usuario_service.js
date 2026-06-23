const bcrypt = require('bcrypt');
const repo = require('../repositories/usuario_repositorio'); 
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.cadastrar = async (email, nome_usuario, nomePet, especie, raca, senha) => {
    const especieAnimal = ['cachorro', 'gato'];

    if (!especie || !especieAnimal.includes(especie.toLowerCase())) {
        throw new Error('Por favor, selecione se o seu pet é um cachorro ou um gato.');
    }

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

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const expira = new Date(Date.now() + 10 * 60 * 1000);

    await repo.salvarCodigo(usuario.id_usuarios, codigo, expira);

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: usuario.email,
        subject: 'Seu código de acesso - MundoPet',
        text: `Seu código de acesso é: ${codigo}\n\nVálido por 10 minutos.`
    });

    return { 
        mensagem: 'Código enviado para o seu email!',
        id_usuarios: usuario.id_usuarios
    };
};

exports.verificarCodigo = async (id_usuarios, codigo) => {
    const dados = await repo.buscarCodigoPorId(id_usuarios);

    if (!dados.codigo_2fa) throw new Error('Nenhum código gerado.');
    if (dados.codigo_2fa !== codigo) throw new Error('Código inválido.');
    if (new Date() > new Date(dados.codigo_expira)) throw new Error('Código expirado.');

    await repo.salvarCodigo(id_usuarios, null, null);

    const usuario = await repo.buscarPorId(id_usuarios);

    const token = jwt.sign(
        { id: usuario.id_usuarios, tipo: 'usuario' },
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
        { id: admin.id_admin, tipo: 'admin' },
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