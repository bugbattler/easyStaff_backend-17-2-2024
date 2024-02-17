const mongoose = require("mongoose");

const jobApplySchema = new mongoose.Schema(
  {
    jobPostID: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    skill: { type: Array },
    qulification: { type: Array },
    yearOfExp: { type: Number },
    description: { type: String },
    resume: { type: String },
    status: { type: String,enum: ["shortlisted", "pending", "reject"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobApplication", jobApplySchema);