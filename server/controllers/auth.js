require('dotenv').config({path: './config.env'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.register = async (req, res) => {
  const {name, email, mobileNumber, password, passwordConfirm} = req.body
  try {
    let existingUser = await User.findOne({email})
    
    if (existingUser) {
      return res.status(400).json({message: "An account with the email already exists"});
    }
    
    existingUser = await User.findOne({mobileNumber})
    if (existingUser) {
      return res.status(400).json({message: "An account with the mobile number already exists"});
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({message: "Passwords don't match"});
    }
    
    const newUser = await User.create({name, email, password, mobileNumber});
    return res.status(200).json({user: newUser, token: generateToken(newUser._id, newUser.email)
    })
  } catch (error) {
    res.status(500).json({message: "Something went wrong.."});
  }
}

exports.login = async(req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email
    })
  
    if (!existingUser) {
      return res.status(404).json({message: "User doesn't exist"});
    }
  
    if (await bcrypt.compare(req.body.password, existingUser.password)) {
      return res.status(200).json({
        user: existingUser, 
        token: generateToken(existingUser._id, existingUser.email)
      })
    } 
    return res.status(400).json({message: "Invalid credentials"});
  } catch (error) {
    res.status(500).json({message: "Something went wrong.."});
  }
}

const generateToken = (id, email) => {
  return jwt.sign({id, email}, process.env.JWT_SECRET,{
    expiresIn: '3d'
  })
}