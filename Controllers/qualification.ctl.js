const { uploadToS3 } = require("../Middlewere/Uploads");
const QualificationModel = require("../Models/Qualification.modal");

exports.createQualification = async (req, res) => {
  try {
    const {
        userName,
        userEmail,
        add_education,
        add_certifications,
        add_licences,
        add_most_recent_work_Experience,
    } = req.body;
    const create_QualificationModel = new QualificationModel({
        userName,
        userEmail,
        add_education,
        add_certifications,
        add_licences,
        add_most_recent_work_Experience,
    });
    create_QualificationModel
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

// Get all Qualification's
exports.getQualification = async (req, res) => {
  try {
    const data = await QualificationModel.find();
    res.json(data);
  } catch {
    (err) => res.json(err);
  }
};

// Get Qualification's by ID
exports.getSingleQualification = async (req, res) => {
  try {
    const data = await QualificationModel.find({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.json({ err });
  }
};


exports.getQualificationByUser = async (req, res) => {
  try {
    const data = await QualificationModel.find({ ownerEmail: req.params.id });
    res.json(data);
  } catch (err) {
    res.json({ err });
  }
};

// Update Qualification's by ID
exports.updateQualification = async (req, res) => {
  try {
    const data = await QualificationModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
};


// Update Qualification's by ID
// exports.image = async(req, res) => {
//     let image;
//   if (req.file) {
//     let fileData = req.file.buffer;
//     let fileType;
//     if (req.file.mimetype === 'application/pdf') {
//       fileType = 'pdf';
//     } else if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/jpg') {
//       fileType = 'jpg';
//     } else if (req.file.mimetype === 'image/png') {
//       fileType = 'png';
//     } else {
//       return res.status(400).json({ error: "Unsupported file type" });
//     }

//     // Call the uploadToS3 function to upload the file to S3
//     let { Location } = await uploadToS3(fileData, fileType);
//     image =Location;
//   }
//   QualificationModel
//     .findOneAndUpdate({ _id: req.params.id }, { image })
//     .then((data) => {
//       res.status(200).json({
//         message: "userProfile updated successfully",
//         data,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({ error: error.message });
//     });
// };


exports.deleteQualification = async (req, res) => {
  try {
    const data = await QualificationModel.findOneAndDelete(
      { _id: req.params.id },
      req.body
    );
    res.json(data);
  } catch (err) {
    res.json({ err: err.message });
  }
};
