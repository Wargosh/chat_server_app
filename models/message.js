const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true
    }
    // readed: {
    //     type: Boolean,
    //     default: false
    // }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at'
    },
    bufferCommands: false,
});

MessageSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject();

    // object.uid = _id;
    return object;
});

module.exports = model('Message', MessageSchema);