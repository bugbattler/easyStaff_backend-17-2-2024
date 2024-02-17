const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, min: 3, max: 20 },
    lastName: {type: String,required: true,trim: true,min: 3,max: 20},
    email: {type: String,required: true,trim: true},
    contact: {type: String,required: true},
    country:{type: String,required: true,trim: true},
    state:{type: String,required: true,trim: true},
    city:{type: String,required: true,trim: true},
    pincode:{type: Number,required: true,trim: true},
    orderItem:{type:Array}
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);