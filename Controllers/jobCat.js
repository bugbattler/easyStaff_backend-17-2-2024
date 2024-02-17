const jobCatModel = require('../Models/jobCat');
const slugify =require('slugify');
// const { uploadToS3, uploadsingleToS3 } = require('../middleware/Uploads');


exports.createJobcat = async (req, res) => {
  try {
    const { jobCatTitle } = req.body;

    // Validate if jobCatTitle exists in the request body
    if (!jobCatTitle) {
      return res.status(400).json({ error: 'Job category title is required' });
    }
    // Create a slug from jobCatTitle
    const slug = slugify(jobCatTitle, { lower: true });

    // Check if the job category title already exists
    const existingJobCat = await jobCatModel.findOne({ slug });

    if (existingJobCat) {
      return res.status(400).json({ error: 'Job category title already exists' });
    }

    // Create a new job category instance
    const jobCat_brand = new jobCatModel({
      jobCatTitle,
      slug,
    });

    // Save the new job category to the database
    const savedJobCat = await jobCat_brand.save();

    // Respond with the saved job category data
    res.status(201).json({ data: savedJobCat });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get all Address's 
exports.getjobCat = async(req,res)=>{
    try{
        const data = await jobCatModel.find();
        res.json(data);
    }
    catch{(err)=>res.json(err)};
}

// Get Address's by ID  
exports.getSinglejobCat = async (req,res)=>{
    try{
        const data = await jobCatModel.find({_id:req.params.id});
        res.json(data);
    }catch(err){
        res.json({err});
    }
}

// Update Address's by ID 
exports.updatejobCat = (req,res)=>{
    jobCatModel.findOneAndUpdate({_id:req.params.id} ,(req.body),{new:true},(err,data)=>{
        try{
            res.json(data);
        }catch(err){
            res.json({err});
        }
    })
}

// Delete Address by ID
exports.deletejobCat =(req,res)=>{
 
    jobCatModel.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}

// exports.UploadBrandImage = async (req, res) => {
//     let brandLogo;
//     if (req.file) {
//       let fileData = req.file.buffer;
//       let fileType;
//       if (req.file.mimetype === "application/pdf") {
//         fileType = "pdf";
//       } else if (
//         req.file.mimetype === "image/jpeg" ||
//         req.file.mimetype === "image/jpg"
//       ) {
//         fileType = "jpg";
//       } else if (req.file.mimetype === "image/png") {
//         fileType = "png";
//       } else {
//         return res.status(400).json({ error: "Unsupported file type" });
//       }
  
//       // Call the uploadToS3 function to upload the file to S3
//       let { Location } = await uploadsingleToS3(fileData, fileType);
//       brandLogo = Location;
//     }
//     jobCatModel.findOneAndUpdate({ _id: req.params.id }, { brandLogo })
//       .then((data) => {
//         res.status(200).json({
//           message: "brandLogo updated successfully",
//           data,
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({ error: error.message });
//       });
//   };
