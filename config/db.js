
//**************************Public Db Link From DigitalOcean********************************* */
// username = doadmin
// password = i8514d0mC7Oy36Ya hide
// host = mongodb+srv://db-mongodb-tor1-flooring-deals-6b5c05e9.mongo.ondigitalocean.com

// database = admin

//**************************Private Db Link From DigitalOcean********************************* */
// username = doadmin
// password = i8514d0mC7Oy36Ya hide
// host = mongodb+srv://private-db-mongodb-tor1-flooring-deals-e7fedac0.mongo.ondigitalocean.com
// database = admin

const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:'./config/.env'});
 const {APP_PORT,MONGODB_URI} = process.env;
mongoose.set('strictQuery',true);
const connectDB = ()=>{
    mongoose.connect("mongodb+srv://ketanbugbattlers:" +
    encodeURIComponent("Ketan") +
    "@cluster0.bdvvyvj.mongodb.net/furniture", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
}
module.exports={connectDB}