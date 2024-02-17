const reviewModel = require('../Models/review');

// const { uploadToS3, uploadsingleToS3 } = require('../middleware/Uploads');


exports.createreview = async (req, res) => {
  try {
    const {
        userName,
        userEmail,
        Rating,
        description,
        role, } = req.body;

    // Create a new job category instance
    const review_brand = new reviewModel({
        userName,
        userEmail,
        Rating,
        description,
        role,
    });

    // Save the new job category to the database
    const savedreview = await review_brand.save();

    // Respond with the saved job category data
    res.status(201).json({ data: savedreview });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get all review's  

exports.getReview = async(req,res)=>{
    try{
        const data = await reviewModel.find();
        res.json(data);
    }
    catch{(err)=>res.json(err)};
}

// Get review's by ID  

exports.getSingleReview = async (req,res)=>{
    try{
        const data = await reviewModel.find({_id:req.params.id});
        res.json(data);
    }catch(err){
        res.json({err});
    }
}

// Update review's by ID  

exports.updateReview = (req,res)=>{
    reviewModel.findOneAndUpdate({_id:req.params.id} ,(req.body),{new:true},(err,data)=>{
        try{
            res.json(data);
        }catch(err){
            res.json({err});
        }
    })
}

// Delete review by ID
exports.deleteReview =(req,res)=>{
 
    reviewModel.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}
