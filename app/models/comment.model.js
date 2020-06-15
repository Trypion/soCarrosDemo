const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}, {
    timestamps: true
});

commentSchema.method("toJSON", function () {
    const {
        __v,
        _id,
        ...object
    } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Comment', commentSchema);