const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentSchema = new Schema({
    description: String,
    username: String,
    date: Date,
    creatorid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    event_id: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    event_name: String,
    imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=250&h=250" }
},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

const Coment = mongoose.model("Coment", comentSchema);
module.exports = Coment;
