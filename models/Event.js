const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    creator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: Number, required: true },
    backerCount: { type: Number, default: 0 },
    totalCount: { type: Number, default: 0 },
    imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=50&txt=Ironfunding&w=650&h=250" }
  }, {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });
  

var Event = mongoose.model("Event", EventSchema);
module.exports = Event;
