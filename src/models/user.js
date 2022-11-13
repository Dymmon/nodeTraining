const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    rut:{type: String, unique: true},
    dv: String,
    password: {type: String, select: false}
});

UserSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt-bcrypt.genSalt(10, (err, salt) =>{
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) =>{
            if (err) return next(err);

            user.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model('User', UserSchema);

