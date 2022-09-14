const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique,
    },
    date: {
      type: String,
      required,
    },
    time: {
      type: String,
      required: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required,
    },
    clubName: {
      type: String,
      required,
    },
    image: {
      type: String,
      required,
    },
    desc: {
      type: String,
      required,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Event", EventSchema);
