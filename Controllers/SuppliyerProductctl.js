const productModel = require('../Models/SUpplyerProduct');

// const { uploadToS3, uploadsingleToS3 } = require('../middleware/Uploads');
exports.createproduct = async (req, res) => {
  try {
    const {
        productName,
        sellprice,
        totalproduct,
        description,
        catagory,
        isSold,
        address,
        contact,
        image
     } = req.body;
    // Create a new job category instance
    const product_Model = new productModel({
        productName,
        sellprice,
        totalproduct,
        description,
        catagory,
        isSold,
        address,
        contact,
        image
    });
    // Save the new job category to the database
    const savedproduct = await product_Model.save();
    // Respond with the saved job category data
    res.status(201).json({ data: savedproduct });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ error:'Internal Server Error'});
  }
};


// Get all product's  
exports.getproduct = async(req,res)=>{
    try{
        const data = await productModel.find();
        res.json(data);
    }
    catch{(err)=>res.
        json(err)};
}

// Get product's by ID  
exports.getSingleproduct = async (req,res)=>{
    try{
        const data = await productModel.find({_id:req.params.id});
        res.json(data);
    }catch(err){
        res.json({err});
    }
}

// Update product's by ID  
exports.updateproduct = (req,res)=>{
    productModel.findOneAndUpdate({_id:req.params.id} ,(req.body),{new:true},(err,data)=>{
        try{
            res.json(data);
        }catch(err){
            res.json({err});
        }
    })
}

// Delete product by ID
exports.deleteproduct =(req,res)=>{
    productModel.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}
