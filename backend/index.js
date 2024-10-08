const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoutes=require("./routes/auth.js")
const listingRoutes=require("./routes/Listing.js")
const bookingRoutes=require("./routes/booking.js")
const userRoutes= require("./routes/user.js")
app.use(cors());
app.use(express.json());
app.use(express.static("public"));



//ROUTERS
app.use("/auth",authRoutes)
app.use("/properties",listingRoutes)
app.use("/bookings",bookingRoutes)
app.use("/users",userRoutes)


/* MONGOOSE SETUP */
const PORT=3000;
mongoose.connect(process.env.MONGO_URL,{
    dbName:"Dream_Nest",
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));



  //vercel error
  app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }))