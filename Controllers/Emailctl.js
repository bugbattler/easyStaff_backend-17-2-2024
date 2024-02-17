const nodemailer = require('nodemailer');
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const otpStorage = {}; // Simple in-memory storage, replace with a secure storage mechanism in production

exports.sendOtpbyEmail = (req, res) => {
    const { email } = req.body;
    console.log(7, email);
    const otp = generateOTP();
    otpStorage[email] = { otp, timestamp: Date.now() };
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kajal.bugbattlers@gmail.com',  // <-- Corrected property names
        pass: 'zioq hhrm rtbm xizd',          // <-- Corrected property names
      },
    });
  
    const mailOptions = {
      from: 'kajal.bugbattlers@gmail.com',
      to: email,
      subject: 'OTP for Email Verification',
      text: ` Your OTP for Email Verification is:\n${otp}\n\nPlease use this OTP to complete the verification process.`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending OTP');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('OTP sent successfully');
      }
    });
  };

exports.verify_otp=(req,res)=>{
    const { email, enteredOTP } = req.body;

    if (!otpStorage[email]) {
      return res.status(401).send('Invalid OTP');
    }
  
    const { otp, timestamp } = otpStorage[email];
    const currentTime = Date.now();
  
    // Check if the OTP is still valid (2 min)
    if (currentTime - timestamp > 120000) {
      delete otpStorage[email];
      return res.status(401).send('OTP has expired');
    }
  
    if (enteredOTP === otp) {
      delete otpStorage[email];
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(401).send('Invalid OTP');
    }
}