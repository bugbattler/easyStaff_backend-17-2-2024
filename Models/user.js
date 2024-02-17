const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    //comman Fielsds
    firstName: { type: String,  trim: true, min: 3, max: 20 },
    lastName: {type: String,trim: true,min: 3,max: 20},
    email: {type: String,trim: true,unique: true,lowercase: true},
    contact: {type: String,trim: true,unique: true},
    country:{type: String,trim: true},
    state:{type: String,trim: true},
    city:{type: String,trim: true},
    pincode:{type: Number,trim: true},
    //hotel registration Fields
    hotelName:{type: String, trim:true,min: 3,max: 20},
    contactPersonName: { type: String, trim: true, min: 3, max: 20 },
    designation: { type: String, trim: true, min: 3, max: 20 },
    FSSAI_NO: { type: String, trim: true },
    shopRegNo: { type: String, trim: true },
    panNo: { type: String, trim: true },
    profilePicture: { type: String, trim: true },
    //other
    hash_password: {type: String,required: true},
    role: {type: String,enum: ["hotelOwner", "admin", "applicant", "supplier", "intern"]},
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

userSchema.methods = {
  matchPassword: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
  
  generateToken: async function () {
    return jwt.sign(
      { _id: this._id, email: this.email, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  },
};

module.exports = mongoose.model("user", userSchema);
