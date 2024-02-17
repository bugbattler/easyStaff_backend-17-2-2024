const express = require('express');
// const { upload } = require('../middleware/MulterFile');
const router = express.Router();

// Create Address routes
router.post('/jobcat/create', require('../Controllers/jobCat').createJobcat);

// Get Address routes
router.get('/jobcat/getAll', require('../Controllers/jobCat').getjobCat);
router.get('/jobcat/get/:id', require('../Controllers/jobCat').getSinglejobCat);

// Delete Address routes
router.delete('/jobcat/:id', require('../Controllers/jobCat').deletejobCat);

// Update Address routes
router.put('/jobcat/:id' , require('../Controllers/jobCat').updatejobCat);
// router.put('/jobcat/files/:id',upload.single('brandLogo'),require('./../Controllers/BrandCtl').UploadBrandImage);


module.exports = router;