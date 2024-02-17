const express = require('express');
// const { upload } = require('../middleware/MulterFile');
const router = express.Router();




router.post('/send-otp',require('../Controllers/Emailctl').sendOtpbyEmail );

router.post('/verify-otp', require('../Controllers/Emailctl').verify_otp );

module.exports = router;