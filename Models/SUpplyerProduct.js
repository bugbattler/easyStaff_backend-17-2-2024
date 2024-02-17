const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String },
    sellprice: { type: String },
    totalproduct: { type: Number },
    description: { type: String },
    isSold: { type: Boolean },
    address: { type: String },
    contact: { type: String },
    image: { type: String },
    catagory: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("supplyerproduct", productSchema);