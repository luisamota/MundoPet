const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // pega o token do "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ erro: 'Token expirado, faça login novamente' });
            }
            return res.status(403).json({ erro: 'Token inválido' });
        }

        req.usuario = decoded; // { id, tipo, nome, iat, exp }
        next();
    });
}

module.exports = verificarToken;