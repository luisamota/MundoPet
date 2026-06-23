const service = require('../MODEL/service/usuario_service');


exports.cadastroUsuario = async (req, res) => {
    try {
        const { email, nome_usuario, nomePet, especie, raca, senha } = req.body;
        const resultado = await service.cadastrar(email, nome_usuario, nomePet, especie, raca, senha);
        res.status(201).json(resultado);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};


exports.cadastroAdmin = async (req, res) => {
    try {
        const { email_admin, nome_admin, senha_admin } = req.body;
        const resultado = await service.cadastrarAdmin(email_admin, nome_admin, senha_admin);
        res.status(201).json(resultado);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const resultado = await service.login(email, senha);
        res.status(200).json(resultado);
    } catch (err) {
        res.status(401).json({ erro: err.message });
    }
};


exports.verificarCodigo = async (req, res) => {
    try {
        const { id_usuarios, codigo } = req.body;
        const resultado = await service.verificarCodigo(id_usuarios, codigo);
        res.status(200).json(resultado);
    } catch (err) {
        res.status(401).json({ erro: err.message });
    }
};


exports.loginAdmin = async (req, res) => {
    try {
        const { email_admin, senha_admin } = req.body;
        const resultado = await service.loginAdmin(email_admin, senha_admin);
        res.status(200).json(resultado);
    } catch (err) {
        res.status(401).json({ erro: err.message });
    }
};


exports.listarTodos = async (req, res) => {
    try {
        const usuarios = await service.listarTodos();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


exports.excluirUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        await service.excluir(idUsuario);

        return res.status(200).json({ 
            sucesso: true, 
            mensagem: "Usuário deletado com sucesso!" 
        });
    } catch (erro) {
        console.error("Erro na controller ao excluir:", erro);
        
        if (erro.message === 'Usuário não encontrado') {
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: erro.message 
            });
        }

        return res.status(500).json({ 
            sucesso: false, 
            mensagem: "Erro interno no servidor ao tentar excluir." 
        });
    }
};