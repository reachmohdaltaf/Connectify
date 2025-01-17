import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";

export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const suggestedUser = await User.find({
       _id:{
        $ne: req.user._id, $nin: currentUser.connections
       }
    }).select("name username profilePicture headline").limit(3)
    res.json(suggestedUser);
  } catch (error) {
    res.status(500).json({ message: "Error in getSuggestedConnections: " });
    console.log("Error in getSuggestedConnections: ", error.message);
  }
};

export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: `Error in getPublicProfile: ${error.message}` });
    console.error("Error in getPublicProfile:", error.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "headline",
      "profilePicture",
      "about",
      "skills",
      "bannerImg",
      "experience",
      "education",
      "location"
    ]


    const updatedUser = {}

    for(const field of allowedFields) {
      if(req.body[field]) {
        updatedUser[field] = req.body[field]
      }
    }

    //todo chechk for profile image and bannerimg
    
    if(req.body.profilePicture) {
      const result = await cloudinary.uploader.upload(req.body.profilePicture)
      updatedUser.profilePicture = result.secure_url
    }
    if(req.body.bannerImg) {
      const result = await cloudinary.uploader.upload(req.body.bannerImg)
      updatedUser.bannerImg = result.secure_url
    }

    const user = await User.findByIdAndUpdate(req.user._id, updatedUser, {new: true}).select("-password")
    res.status(201).json({message: "Profile updated successfully", user});

  } catch (error) {
    console.log("Error in updateProfile: ", error.message);
    res.status(500).json({ message: "Error in updateProfile: ", error });
  }
}