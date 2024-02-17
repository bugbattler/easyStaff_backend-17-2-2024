const express = require('express');
// const { upload } = require('../middleware/MulterFile');
const router = express.Router();

// Create Address routes
router.post('/review/create', require('../Controllers/reviewctl').createreview);

// Get Address routes
router.get('/review/getAll', require('../Controllers/reviewctl').getReview);
router.get('/review/get/:id', require('../Controllers/reviewctl').getSingleReview);

// Delete Address routes
router.delete('/review/:id', require('../Controllers/reviewctl').deleteReview);

// Update Address routes
router.put('/review/:id' , require('../Controllers/reviewctl').updateReview);
// router.put('/jobcat/files/:id',upload.single('brandLogo'),require('./../Controllers/BrandCtl').UploadBrandImage);


module.exports = router;