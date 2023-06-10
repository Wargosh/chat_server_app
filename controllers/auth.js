const { response } = require("express");
const bcrypt = require('bcryptjs');

const { generateJWT } = require("../helpers/jwt");

const { BaseResponse } = require("../models/base_response");
const User = require('../models/user');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    const resBody = new BaseResponse(false, '', null);

    try {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            resBody.message = 'El correo ingresado ya se encuentra registrado.';
            return res.status(400).json(resBody);
        }

        const newUser = new User(req.body);

        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        // Generar JWT
        const token = await generateJWT(newUser.id);

        resBody.success = true;
        resBody.message = 'OK';
        resBody.payload = { user: newUser, token };
        res.json(resBody);
    } catch (error) {
        resBody.message = 'Ha ocurrido un error.';
        res.status(400).json(resBody);
    }
}

const connectUser = async (req, res = response) => {
    const { email, password } = req.body;

    const resBody = new BaseResponse(false, '', null);

    try {
        const user = await User.findOne({ email });

        if (user) {
            const match = bcrypt.compareSync(password, user.password);
            if (!match) {
                resBody.message = 'Datos incorrectos, verifique sus credenciales.';
                return res.status(400).json(resBody);
            }

            // Generar JWT
            const token = await generateJWT(user.id);

            resBody.success = true;
            resBody.message = 'OK';
            resBody.payload = {
                user: user,
                token
            };
            res.json(resBody);
        } else {
            resBody.message = 'Datos incorrectos, verifique sus credenciales.';
            return res.status(400).json(resBody);
        }
    } catch (error) {
        resBody.message = 'Ha ocurrido un error.';
        res.status(500).json(resBody);
    }
}

const renewJWT = async (req, res = response) => {
    const { uid } = req;

    const resBody = new BaseResponse(false, '', null);

    try {
        const user = await User.findById(uid);

        if (!user) {
            resBody.message = 'No se ha podido comprobar la autenticación.';
            return res.status(400).json(resBody);
        }

        // Generar JWT
        const token = await generateJWT(uid);

        resBody.success = true;
        resBody.message = 'OK';
        resBody.payload = { user, token };
        res.json(resBody);
    } catch (error) {
        resBody.message = 'Ha ocurrido un error.';
        res.status(400).json(resBody);
    }
}

module.exports = { createUser, connectUser, renewJWT }