const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema(
  {
    ownerEmail: { type: String },
    ownerId: { type: String },
    jobTitle: { type: String },
    jobCategory: { type: String },
    city: { type: String },
    address: { type: String },
    pincode: { type: String },
    state: { type: String },
    shift: { type: String },
    noOfVacancies: { type: String },
    salaryMin: { type: String },
    qualification: { type: Array },
    salaryMax: { type: String },
    salaryPerHr: { type: String },
    bonusType: { type: Array },
    benefits: { type: Array },
    image: { type: String },
    jobDescription: { type: String },
    isComplete: { type: Boolean ,default:false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", JobPostSchema);
