const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  fixedPrice: {
    bidPrice: {
      type: Number,
    },
    recivePrice: {
      type: String,
    },
  },
  milestonePrice: {
    bidPrice: {
      type: Number,
    },
    recivePrice: {
      type: String,
    },
    milestone: [
      {
        description: String,
        time: String,
        amount: String,
      },
    ],
  },
  projectTime: {
    type: String,
  },
  coverLetter: {
    type: String, //Fultime or Halftime
  },
  recentExperience: {
    type: String, //Intermideate/ Biggener/ Expert
  },
  file: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("proposal", proposalSchema);
