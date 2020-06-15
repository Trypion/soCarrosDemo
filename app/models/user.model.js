const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


module.exports = mongoose => {
    let UserSchema = mongoose.Schema({
        username: String,
        password: String        
    }, {
        timestamps: true
    });

    UserSchema.plugin(passportLocalMongoose);

    UserSchema.method("toJSON", function () {
        const {
            __v,
            _id,
            ...object
        } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("User", UserSchema);

    return User;
};