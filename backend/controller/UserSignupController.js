const User = require("../model/userModel");

const Signup = async (req, res) => {
  const { name, email, password, mobile, age, gender, dob } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(500)
      .json({ error: "User with this email already exists" });
  } else {
    try {
      const userAdd = await User.create({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        age: age,
        gender: gender,
        dob: dob,
      });
      res.status(201).json({ message: `${name} added successfully` });
    } catch (error) {
      // console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
module.exports = {
  Signup,
};
