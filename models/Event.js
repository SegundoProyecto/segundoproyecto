const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    type: String,
    name: String,
    limit: Number,
    Price: Number,
    location: {
        lat: String,
        lng: String
    },
},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

var Place = mongoose.model("Place", eventSchema);
module.exports = Place;
