const message = require("../models/message");
const user = require("../models/user")

const setUserStatusConnection = async (uid = '', status = false) => {
    try {
        const _user = await user.findById(uid);

        if (!_user) return null;

        _user.online = status;

        await _user.save();
        return _user;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const saveMessage = async (payload = { from: '', to: '', message: '' }) => {
    try {
        const msg = new message(payload);
        await msg.save();

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { setUserStatusConnection, saveMessage }