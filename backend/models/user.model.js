import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{type: String, required:true},
    username:{type: String, required:true, unique:true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    profilePicture:{type: String, default:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"},
    bannerImg:{type: String, default:"https://cdn.pixabay.com/photo/2015/10/29/14/38/web-1012467_1280.jpg"},
    headline:{type: String, default: ""},
    location:{type: String, default: "Earth"},
    about:{type: String, default: ""},
    skills:[String],
    experience:[{
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
    }],
    education:[{
        school: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number
    }],
    connections: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
},{timestamp: true})

const User = mongoose.model("User", userSchema);
export default User;