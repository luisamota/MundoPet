const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ sucesso: false, mensagem: "Token não fornecido." });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (payload.tipo !== 'admin') {
            return res.status(403).json({ sucesso: false, mensagem: "Acesso negado." });
        }

        req.usuario = payload;
        next();
    } catch (erro) {
        return res.status(401).json({ sucesso: false, mensagem: "Token inválido ou expirado." });
    }
};