const mongoose = require("mongoose");

const JobCatSchema = new mongoose.Schema(
  {
    jobCatTitle: { type: String },
    slug: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobCatagories", JobCatSchema);
