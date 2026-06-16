const { validarEmail } = require('../MODEL/service/emailService');
const service = require('../MODEL/service/usuario_service');


exports.cadastroUsuario = async (req, res) => {
    try {
        const { email, nomePet, senha } = req.body;
        const resultado = await service.cadastrar(email, nomePet, senha);
        
        res.status(201).json(resultado);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.cadastroAdmin = async (req, res) => {
    try {
        const { email, nomePet, senha } = req.body;
        const resultado = await service.cadastrarAdmin(email, nomePet, senha);
        
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