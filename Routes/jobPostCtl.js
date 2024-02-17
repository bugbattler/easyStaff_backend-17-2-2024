const express = require('express');
const {createJobPost,getJobPost,getSingleJobPost,getJobPostByUser,updateJobPost,deleteJobPost,image} = require("../Controllers/jobPostCtl");
const { upload } = require('../Middlewere/MulterFile');
const router = express.Router();

router.post('/jobpost/create', createJobPost);
router.get('/jobpost/getAll',getJobPost);
router.get('/jobpost/getSingle/:id',getSingleJobPost);
router.get('/jobpost/getbyemail/:id',getJobPostByUser);
router.put("/jobpostImage/:id",upload.single("image"),image);
router.put("/jobpost/edit/:id",updateJobPost);
router.delete("/jobpost/delete/:id",deleteJobPost);
// router.put("/updateuserPassword/:id",updatePassword);
module.exports = router;
