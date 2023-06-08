const { response } = require('express');

const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    // Read old token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado.'
        });

    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado. Token inválido.'
        });
    }
}

module.exports = { validateJWT };