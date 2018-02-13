const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TYPES = require('./Event-types');
const moment = require('moment');


const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: TYPES, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: String,
    goal: { type: Number, required: true },
    backerCount: { type: Number, default: 0 },
    totalPledged  : { type: Number, default: 0 },
    totalCount: { type: Number, default: 0 },
    imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=650&h=250" }
}, {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

EventSchema.methods.belongsTo = function (user) {
    return this._creator.equals(user._id);
}

EventSchema.virtual('timeRemaining').get(function () {
    return moment(this.deadline).fromNow(true);
});
const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
