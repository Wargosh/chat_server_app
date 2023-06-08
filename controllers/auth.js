const { response } = require("express");
const bcrypt = require('bcryptjs');

const { generateJWT } = require("../helpers/jwt");
const User = require('../models/user');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email }).exec();

        if (emailExists) {
            return res.status(400).json({
                succees: false,
                message: 'El correo ingresado ya se encuentra registrado.'
            });
        }

        const newUser = new User(req.body);

        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        // Generar JWT
        const token = await generateJWT(newUser.id);

        res.json({
            success: true,
            user: newUser,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succees: false,
            message: 'Ha ocurrido un error.'
        });
    }
}

const connectUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user) {
            const match = bcrypt.compareSync(password, user.password);
            if (!match) {
                return res.status(400).json({
                    succees: false,
                    message: 'Datos incorrectos, verifique sus credenciales.'
                });
            }

            // Generar JWT
            const token = await generateJWT(user.id);

            res.json({
                success: true,
                user: user,
                token
            });
        } else {
            return res.status(400).json({
                succees: false,
                message: 'Datos incorrectos, verifique sus credenciales.'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succees: false,
            message: 'Ha ocurrido un error.'
        });
    }
}

const renewJWT = async (req, res = response) => {
    const { uid } = req;

    try {
        const user = await User.findById(uid).exec();

        if (!user) {
            return res.status(400).json({
                succees: false,
                message: 'No se ha podido comprobar la autenticación.'
            });
        }
        
        // Generar JWT
        const token = await generateJWT(uid);
    
        res.json({
            succees: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succees: false,
            message: 'Ha ocurrido un error.'
        });
    }
}

module.exports = { createUser, connectUser, renewJWT }