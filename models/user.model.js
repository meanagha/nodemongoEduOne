
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema;

let user = new UserSchema({
    role: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ],
    email: String,
    password: String,
    confirm_password:String,
    name:String,
    mobile:String,
    profilePic:String
});

const userModel = mongoose.model("users", user);

module.exports = userModel;