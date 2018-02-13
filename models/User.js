const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    description: String,
    eventAsistId: [{type:Schema.Types.ObjectId, ref: 'Event'}],
    imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=250&h=250" }
}, {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

const User = mongoose.model('User', userSchema);
module.exports = User;

