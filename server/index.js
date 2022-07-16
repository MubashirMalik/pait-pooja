const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/user.model');

const URI = `mongodb+srv://mubashir:mubashir@cluster0.8zzfp.mongodb.net/pait-pooja?retryWrites=true&w=majority`

mongoose.connect(URI)
  .then((result) => console.log("Connected to database."))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

const errorFormatter = (error) => {
  
  if (error.code === 11000) {
    if (Object.keys(error.keyValue)[0] === 'mobileNumber')  {
      return "An account with the mobile number already exists"
    } else if (Object.keys(error.keyValue)[0] === 'email') {
      return "An account with the email already exists"
    }
  }
  
  let errorsArray = error.message.substring(error.message.indexOf(":")+1).trim()
  errorsArray = errorsArray.split(',').map(err => err.trim())
  const [, value] = errorsArray[0].split(':').map(err => err.trim())
  return value
}

app.post("/api/register", async (req, res) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobileNumber: req.body.mobileNumber
  })

  try {
    await newUser.save();
    res.json({result: true});
    console.log("User: Record saved.");
  } catch (err) {
    console.log("User: Error saving record.");
    res.json({result: false, error: errorFormatter(err)})
  }
});

app.listen(3001, () => console.log("Server: listening at http://localhost:3001"))