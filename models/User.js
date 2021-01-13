var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a UserSchema
var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

// Create model from the schema
var User = mongoose.model("User", UserSchema);

// Export model
module.exports = User;