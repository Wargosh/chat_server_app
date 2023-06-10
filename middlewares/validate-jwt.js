const { response } = require('express');

const jwt = require('jsonwebtoken');

const { BaseResponse } = require("../models/base_response");

const validateJWT = (req, res = response, next) => {
    // Read old token
    const token = req.header('x-token');

    const resBody = new BaseResponse(false, '', null);

    if (!token) {
        resBody.message = 'No autorizado.';
        return res.status(401).json(resBody);
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        resBody.message = 'No autorizado. Token inválido.';
        return res.status(401).json(resBody);
    }
}

module.exports = { validateJWT };