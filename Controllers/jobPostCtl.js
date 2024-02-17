const { uploadToS3 } = require("../Middlewere/Uploads");
const JobPostModel = require("../Models/jobPost");

exports.createJobPost = async (req, res) => {
  try {
    const {
      ownerEmail,
      ownerId,
      jobTitle,
      jobCategory,
      city,
      JobPost,
      pincode,
      state,
      shift,
      noOfVacancies,
      salaryMin,
      salaryMax,
      salaryPerHr,
      bonusType,
      benefits,
      image,
      jobDescription,
      isComplete,
    } = req.body;
    const create_JobPostModel = new JobPostModel({
      ownerEmail,
      ownerId,
      jobTitle,
      jobCategory,
      city,
      JobPost,
      pincode,
      state,
      shift,
      noOfVacancies,
      salaryMin,
      salaryMax,
      salaryPerHr,
      bonusType,
      benefits,
      image,
      jobDescription,
      isComplete,
    });
    create_JobPostModel
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

// Get all JobPost's
exports.getJobPost = async (req, res) => {
  try {
    const data = await JobPostModel.find();
    res.json(data);
  } catch {
    (err) => res.json(err);
  }
};

// Get JobPost's by ID
exports.getSingleJobPost = async (req, res) => {
  try {
    const JobPost = await JobPostModel.find({ _id: req.params.id });
    res.json(JobPost);
  } catch (err) {
    res.json({ err });
  }
};


exports.getJobPostByUser = async (req, res) => {
  try {
    const data = await JobPostModel.find({ ownerEmail: req.params.id });
    res.json(data);
  } catch (err) {
    res.json({ err });
  }
};

// Update JobPost's by ID
exports.updateJobPost = async (req, res) => {
  try {
    const data = await JobPostModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
};


// Update JobPost's by ID
exports.image = async(req, res) => {
    let image;
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
    image =Location;
  }
  JobPostModel
    .findOneAndUpdate({ _id: req.params.id }, { image })
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


exports.deleteJobPost = async (req, res) => {
  try {
    const data = await JobPostModel.findOneAndDelete(
      { _id: req.params.id },
      req.body
    );
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
};
