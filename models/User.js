import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    
    name: { type: String, default: '' },
    nickname: { type: String, default: '' },
    tel: { type: String, default: '' },
    address: { type: String, default: '' },
    age: { type: Number, default: 0 },

}, { timestamps: true, versionKey: false })

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)