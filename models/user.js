import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nick: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avararUrl: String,
}, {
    timestamps: true,
});

export default mongoose.model('user', UserSchema);