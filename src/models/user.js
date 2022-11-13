const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema()

const UserSchema = new Schema({
    rut:{type: String, unique: true},
    dv: String,
    password: {type: String, select: false}
});

UserSchema.pre()