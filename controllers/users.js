const { response } = require("express");
const { BaseResponse } = require("../models/base_response");
const user = require("../models/user");


const getUsers = async (req, res = response) => {
    const resBody = new BaseResponse(false, '', null);

    try {
        const start = Number(req.query.start) || 0;
        const limit = Number(req.query.limit) || 5;

        const userList = await user
            .find({ _id: { $ne: req.uid } }) // return all users that do not have this uid
            .sort('-online')
            .skip(start)
            .limit(limit);

        if (userList.length == 0) {
            resBody.message = 'No se encontraron usuarios.';
            return res.status(400).json(resBody);
        }

        resBody.success = true;
        resBody.message = 'OK';
        resBody.payload = { start, limit, count: userList.length, users: userList };
        res.json(resBody);
    } catch (error) {
        resBody.message = 'Ha ocurrido un error.';
        res.status(400).json(resBody);
    }
}

module.exports = {
    getUsers
}