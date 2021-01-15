
const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema;

let role = new RoleSchema({
    name:String
});

const roleModel = mongoose.model("roles", role);

module.exports = roleModel;