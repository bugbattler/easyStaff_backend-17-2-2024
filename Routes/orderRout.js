const express = require('express');
// const { upload } = require('../middleware/MulterFile');
const router = express.Router();

// Create Address routes
router.post('/order/create', require('../Controllers/orderctl').createOrder);

// Get Address routes
router.get('/order/getAll', require('../Controllers/orderctl').getOrder);
router.get('/order/get/:id', require('../Controllers/orderctl').getSingleOrder);

// Delete Address routes
router.delete('/order/:id', require('../Controllers/orderctl').deleteOrder);

// Update Address routes
router.put('/order/:id' , require('../Controllers/orderctl').updateOrder);
// router.put('/jobcat/files/:id',upload.single('brandLogo'),require('./../Controllers/BrandCtl').UploadBrandImage);


module.exports = router;