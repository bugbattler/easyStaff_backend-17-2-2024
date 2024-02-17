const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    userName: { type: String },
    userEmail: { type: String },
    userID: { type: String},
    add_education: { type: Array },
    add_certifications: { type: Array },
    add_licences: { type: Array },
    add_most_recent_work_Experience: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Qualification", qualificationSchema);
