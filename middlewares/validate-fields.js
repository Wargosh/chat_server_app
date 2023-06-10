const { validationResult } = require("express-validator");

const { BaseResponse } = require("../models/base_response");

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    const resBody = new BaseResponse(false, '', null);

    if (!errors.isEmpty()) {
        resBody.errors = errors.mapped();
        resBody.message = 'Existen campos requeridos que no cumplen con el proceso.';

        return res.status(400).json(resBody);
    }

    next();
}

module.exports = {
    validateFields
}