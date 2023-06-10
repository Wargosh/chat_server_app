const { request, response } = require("express");
const message = require("../models/message");
const { BaseResponse } = require("../models/base_response");


const getChat = async (req = request, res = response) => {
    const uid = req.uid;
    const uidTarget = req.params.target;
    console.log(uidTarget);
    const start = Number(req.query.start) || 0;
    const limit = Number(req.query.limit) || 30;

    const resBody = new BaseResponse(false, '', null);

    try {
        const msgs = await message.find({
            $or: [
                { $and: [{ from: uid }, { to: uidTarget }] },
                { $and: [{ from: uidTarget }, { to: uid }] },
            ]
        })
            .sort({ created_at: "desc" })
            .skip(start)
            .limit(limit);

        resBody.success = true;
        resBody.message = 'OK';
        resBody.payload = { start, limit, count: msgs.length, messages: msgs };
        res.json(resBody);
    } catch (error) {
        resBody.message = 'Ha ocurrido un error.';
        res.status(400).json(resBody);
    }

}

module.exports = { getChat };