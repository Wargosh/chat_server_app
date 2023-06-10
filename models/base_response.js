const sdf = {
    success: false,
    message: '',
    payload: {}
}

class BaseResponse {

    constructor(success = false, message = '', payload = {}) {
        this.success = success;
        this.message = message;
        this.payload = payload;
    }
}

module.exports = { BaseResponse };