const jobAppyModel = require("../Models/jobApply");

exports.createjobAppy = async (req, res) => {
  try {
    const {
        jobPostID,
        firstName,
        lastName,
        email,
        skill,
        qulification,
        yearOfExp,
        description,
        resume,
        status,
    } = req.body;
    const create_jobAppyModel= new jobAppyModel({
        jobPostID,
        firstName,
        lastName,
        email,
        skill,
        qulification,
        yearOfExp,
        description,
        resume,
        status,
    });
    create_jobAppyModel
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
// Get all jobApply's

exports.getjobApply= async (req, res) => {
  try {
    const data = await jobAppyModel.find();
    res.json(data);
  } catch {
    (err) => res.json(err);
  }
};

// Get jobApply's by ID

exports.getSinglejobApply= async (req, res) => {
  try {
    const jobAppy= await jobAppyModel.find({ _id: req.params.id });
    res.json(jobAppy);
  } catch (err) {
    res.json({ err });
  }
};
exports.getjobApplyByUser = async (req, res) => {
  try {
    const data = await jobAppyModel.find({ jobPostID: req.params.id });
    res.json(data);
  } catch (err) {
    res.json({ err });
  }
};

// Update jobApply's by ID

exports.updatejobApply= async (req, res) => {
  try {
    const data = await jobAppyModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
};

exports.deletejobApply= async (req, res) => {
  try {
    const data = await jobAppyModel.findOneAndDelete(
      { _id: req.params.id },
      req.body
    );
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
};
