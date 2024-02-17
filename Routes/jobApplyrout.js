const express = require('express');
const {createjobAppy,getjobApply,getSinglejobApply,getjobApplyByUser,updatejobApply,deletejobApply} = require("../Controllers/jobApplyctl");
const { upload } = require('../Middlewere/MulterFile');


const router = express.Router();
//  const multer=require("multer");



router.post('/jobApply/create', createjobAppy);
router.get('/jobApply/getAll',getjobApply);
router.get('/jobApply/getSingle/:id',getSinglejobApply);
router.get('/jobApply/getbyid/:id',getjobApplyByUser);
//  router.put("/jobimage/:id",upload.single("jobimage"),jobimage);
router.put("/jobApply/edit/:id",updatejobApply);
router.delete("/jobApply/delete/:id",deletejobApply);
// router.put("/updateuserPassword/:id",updatePassword);




module.exports = router;