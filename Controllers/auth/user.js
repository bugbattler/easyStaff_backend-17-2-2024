const User = require("../../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadToS3 } = require("../../Middlewere/Uploads");
exports.signup = async (req, res) => {
  try {
    const find = await User.findOne({ email: req.body.email });
    if (find) {
      return res.status(400).json({
        error: "User already registered",
      });
    }
    const {
      firstName,
      lastName,
      email,
      contact,
      country,
      state,
      city,
      pincode,
      hotelName,
      profilePicture,
      contactPersonName,
      designation,
      FSSAI_NO,
      shopRegNo,
      panNo,
      password,
      role,
    } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      contact,
      country,
      state,
      city,
      pincode,
      hotelName,
      contactPersonName,
      designation,
      profilePicture,
      FSSAI_NO,
      shopRegNo,
      panNo,
      password,
      role,
    });
    _user
      .save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
exports.signin = async (req, res) => {
    try {
      let { email, password } = req.body;
      User.findOne({ email }).then(async (user) => {
        if (user) {
          const isPassword = await user.matchPassword(password);
          if (isPassword) {
            const token = await user.generateToken();
            const {
              _id,
              firstName, lastName, email,role
            } = user;
            res.cookie("token", token, { expiresIn: "1d" });
            res.status(200).json({
              token,
              user: {
                _id,
                firstName, lastName, email,role
              },
            });
          } else {
            return res.status(400).json({ message: "Invalid Password" });
          }
        } else {
          return res.status(400).json({ message: "Something went wrong" });
        }
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong" });
    }
  };
exports.getone = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    res.json({ err });
  }
};

exports.getusers = async (req, res) => {
  try {
    const getusers = await User.find();
    res.json(getusers);
  } catch {
    (err) => res.json(err);
  }
};

exports.profilePicture = async(req, res) => {
  let profilePicture;
  if (req.file) {
    let fileData = req.file.buffer;
 let fileType;
    if (req.file.mimetype === 'application/pdf') {
      fileType = 'pdf';
    } else if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/jpg') {
      fileType = 'jpg';
    } else if (req.file.mimetype === 'image/png') {
      fileType = 'png';
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Call the uploadToS3 function to upload the file to S3
    let { Location } = await uploadToS3(fileData, fileType);
    profilePicture =Location;
  }
  User
    .findOneAndUpdate({ _id: req.params.id }, { profilePicture })
    .then((data) => {
      res.status(200).json({
        message: "userProfile updated successfully",
        data,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
exports.deleteuser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
exports.updateuser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};



exports.updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email }).exec();

    if (user) {
      user.password = newPassword;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password updated",
      });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", error: err });
  }
};
