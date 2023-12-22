const User = require("../model/userModel");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const getDataById = await User.findById({ _id: id });
    if (getDataById) {
      res.status(200).json(getDataById);
    } else {
      res.status(404).json("User Profile not found !!");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, mobile, age, dob } = req.body;

    // console.log(id, req.body);
    // Add dob to the update object
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, mobile, gender, dob },
      { new: true }
    );
    // console.log(req.body);
    if (updateUser) {
      res.status(200).json({ message: "Profile Updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserById,
  updateUser,
};
