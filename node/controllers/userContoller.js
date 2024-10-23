const UserModel = require("../models/userSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendSMS } = require("../utils/twilio.js");
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const { phonevalidation } = require("../utils/phonevalidation.js");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const phoneNumber = phonevalidation(phone)
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarUrl = req.file
      ? `/uploads/avatars/${req.file.filename}`
      : "/uploads/default-avatar.png";
    const user = await UserModel.create({
      name,
      email,
      phone: phoneNumber,
      avatar: avatarUrl,
      password: hashedPassword,
      role: role || "user",
    });

    const message = `Welcome ${name} your account has been created`
    await sendSMS( phoneNumber,message)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const phoneNumber = phonevalidation(phone)
    const user = await UserModel.findById(req.user.id);

    if (req.file) {
      user.avatar = `/uploads/avatar/${req.file.filename}`;
    }

    if (name) user.name = name;
    if (phone) user.phone = phoneNumber;

    await user.save();
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const phoneN = String(`${user.phone}`);
    const phoneNumber = phonevalidation(phoneN)
    const message = `Welcome ${user.name} this is your one time OTP`
    await sendSMS(phoneNumber,message)

   
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: phoneNumber,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resendOtp = async(req,res)=>{
  const {phone}  = req.body
  const phoneNumber = phonevalidation(phone)

  const message = `Welcome this is your one time OTP`
  await sendSMS(phoneNumber,message)

  res.status(200).json({message:'Otp send'})
}



module.exports = { register, login, getUserDetails, update,resendOtp };
