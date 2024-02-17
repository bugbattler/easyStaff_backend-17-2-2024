// Twilio configuration (replace with your Twilio credentials)
const twilio =require('twilio');
 const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
// let verificationCodeTimestamp = 0;
const accountSid = 'AC099f4a8210b1f3afbb3fb2e76e19a878';
const authToken = '91eddc32c47b1ffee95501616f0ae494';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+12176890155';
const verificationCode = {};
exports.sendOtpbyMobileNo = async (req, res) => {
  try {
      const { mobileNumber } = req.body;
    const otp = generateOTP();
      verificationCode[mobileNumber] = { otp, timestamp: Date.now() };
      clg

      // Send otpStorage[email] = { otp, timestamp: Date.now() }; the verification code via SMS
      const message = await twilioClient.messages.create({
          body: `Your verification code is: ${otp}`,
          from: twilioPhoneNumber,
          to: `+91${mobileNumber}`,
      });

      // Log the Twilio message SID for debugging
      console.log(`Twilio Message SID: ${message.sid}`);

      res.json({ success: true, verificationCode });
  } catch (error) {
      console.error(error);

      // Provide more details in the response for debugging
      const errorMessage = error.message || 'Internal Server Error';
      res.status(500).json({ success: false, error: errorMessage });
  }
};


// exports.verifyMob_Otp=(req,res)=>{
//     try {
//         const { mobileNumber, otp } = req.body;
    
//         // Check if the stored verification code matches the entered code
//         if (otp === verificationCode) {
//           // Check if the verification code is still valid (e.g., within 2 minutes)
//           const currentTime = Date.now();
//           const codeValidDuration = 2 * 60 * 1000; // 2 minutes in milliseconds
    
//           if (currentTime - verificationCodeTimestamp <= codeValidDuration) {
//             // Code is valid
//             delete otpStorage[mobileNumber];
//             res.json({ success: true, message: 'Verification successful' });
//           } else {
//             // Code has expired
//             delete otpStorage[mobileNumber];

//             res.json({ success: false, message: 'Verification code has expired' });
//           }
//         } else {
//           // Incorrect verification code
//           delete otpStorage[mobileNumber];
//           res.json({ success: false, message: 'Incorrect verification code' });
//         }
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//       }
// }

exports.verifyMob_Otp=(req,res)=>{
  const { mobileNumber, enteredOTP } = req.body;

  if (!verificationCode[mobileNumber]) {
    return res.status(401).send('Invalid OTP');
  }

  const { otp, timestamp } = verificationCode[mobileNumber];
  const currentTime = Date.now();

  // Check if the OTP is still valid (2 min)
  if (currentTime - timestamp > 120000) {
    delete verificationCode[mobileNumber];
    return res.status(401).send('OTP has expired');
  }

  if (enteredOTP === otp) {
    delete verificationCode[mobileNumber];
    res.status(200).send('OTP verified successfully');
  } else {
    res.status(401).send('Invalid OTP');
  }
}
