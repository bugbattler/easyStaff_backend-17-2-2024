const express = require('express');
// const { upload } = require('../middleware/MulterFile');
const router = express.Router();




router.post('/send-mob-otp',require('../Controllers/MobileNoVarification').sendOtpbyMobileNo );

router.post('/verify-mob-otp', require('../Controllers/MobileNoVarification').verifyMob_Otp );

module.exports = router;