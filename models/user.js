const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    bufferCommands: false,
});

UserSchema.method('toJSON', function () {
    const { _id, password, created_at, updated_at, ...object } = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);