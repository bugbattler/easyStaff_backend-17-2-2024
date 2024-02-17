const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const conn = require("./config/db");
const env = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const userRouts=require("./Routes/Auth/userRout");
const JobROutsRouts=require("./Routes/jobPostCtl");
const JobCatRouts=require("./Routes/JobCat");
const EmailRouts=require("./Routes/Email");
const ReviewRouts=require("./Routes/reviewrout");
const jobApplyRouts=require("./Routes/jobApplyrout");
const suppyerProduct=require("./Routes/SupplyProduct");
const order=require("./Routes/orderRout");
const mobotp=require("./Routes/mobVeriRout");

conn.connectDB();
app.use(cors());
env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

app.use("/api", userRouts);
app.use("/api", JobROutsRouts);
app.use("/api", JobCatRouts);
app.use("/api", EmailRouts);
app.use("/api", ReviewRouts);
app.use("/api", jobApplyRouts);
app.use("/api", suppyerProduct);
app.use("/api", order);
app.use("/api", mobotp);

app.get("/", (req, res) => {
    return res.send("Welcome To API");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server running successfully on port http://localhost:${process.env.PORT}`
  );
});