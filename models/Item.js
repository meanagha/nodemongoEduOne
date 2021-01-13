var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var ItemSchema = new Schema({


  name: {
    type: String,
    required: true
  },
  rent_price: {
      type: String,
      required: true
  },
  actual_price: {
    type:String,
    required: true
  },

  rent_status: {
    type:String,
    required: true
  },  

  manufacture_date: {
      type: String,
      required: true
  },   
});

// Create model from the schema
var Item = mongoose.model("Item", ItemSchema);

// Export model
module.exports = Item;