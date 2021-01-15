
const mongoose = require("mongoose");

const EmpSchema = mongoose.Schema;

let emp = new EmpSchema({   
    degree: String,
    position: String,
    salary:String   
});

const empModel = mongoose.model("emps", emp);

module.exports = empModel;