const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentSchema = new Schema({
    description: String,
    username: String,
    creatorid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    event_id: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    event_name: String,
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

const Coment = mongoose.model("Coment", comentSchema);

module.exports = Coment;
