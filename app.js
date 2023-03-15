const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const crypto = require("crypto");

const User = require("./models/user");
var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");
var nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

require("dotenv/config");
//routes

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const orderRoutes = require("./routes/order");
const mcqRoutes = require("./routes/questions");
const assesRoutes = require("./routes/assesment");
const assesRoutes2 = require("./routes/assesAns");
//DB conncetion

const app = express();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("DB connected"));

//Middlewares
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", orderRoutes);
app.use("/api", mcqRoutes);
app.use("/api", assesRoutes);
app.use("/api", assesRoutes2);

app.set("view engine", "ejs");

//============User Authentication===========
//step1 create token form json-webtoken step2 put it in using cookeies step 3 wether user loggs in express-jwt
//==========================================
const port = process.env.PORT || 8000;
// app.get("/", (req, res) => {
//   return res.send("hello world");
// });

//change client
app.get('/',(req,res)=>{
  app.use(express.static(path.resolve(__dirname,'client','build')))
  res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const token = jwt.sign({ _id: oldUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    console.log(oldUser._id, token);
    const link = `http://localhost:8000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abdullah.hkt@gmail.com',
        pass: 'odcdaadvxvzcbilt'
        // pass: 'jmondulfpnjhlboj'
      }
    });
    
    var mailOptions = {
      from: 'abdullah.hkt@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: link
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  try {
    const verify = jwt.verify(token, process.env.SECRET);
    res.render("index", { email: verify.email, status: "Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(req.body)
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  try {
    const verify = jwt.verify(token, process.env.SECRET);
    salt = oldUser.salt;
    console.log(password)
    //   const encryptedPassword = await bcrypt.hash(password, 10);
    encryptedPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          encry_password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

// const myAdmin = (req,res) =>{
//     return res.send("hello world to admin");
// }
// const isAdmin = (req,res,next) =>{
//     console.log("This is Admin");
//     next();
// }
// const isLoggedIn = (req,res,next) =>{
//     console.log("Admin LoggedIn");
//     next();
// };

// app.get("/admin",isLoggedIn , isAdmin, myAdmin );
