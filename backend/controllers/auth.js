const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }
    // check for registered user
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please SignUp first.",
      });
    }

    const payload = {
      email: existingUser.email,
      id: existingUser._id,
    };

    // Verify the password and generate JWT Token
    if (await bcrypt.compare(password, existingUser.password)) {
      // password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      existingUser = existingUser.toObject();
      existingUser.token = token;
      existingUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // expires in 3 days
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        existingUser,
        message: "User Loggedin Successfully",
      });
    } else {
      // password do not match
      return res.status(403).json({
        success: false,
        message: "Incorrect Password. Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    // get data
    const { name, email, password, phoneNumber, city, jobTitle } = req.body;

    if (!name || !email || !password || !phoneNumber || !city || !jobTitle) {
      return res.status(401).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // check if the user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already registered with current email address.",
      });
    }

    // secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // create entry for user
    const user = await User.create({
      name,
      email,
      phoneNumber,
      city,
      jobTitle,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};
