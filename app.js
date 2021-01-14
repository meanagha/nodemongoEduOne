var express = require("express");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

console.log(db);

// Connect to MongoDB
mongoose.connect("mongodb://localhost/rentingPlatformEdu", { useNewUrlParser: true, useUnifiedTopology: true  });

require('dotenv').config();

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", function(req, res) {
  res.send("Hello from demo app!");
});


const PORT = process.env.PORT || 5000;

require("./routes/item.routes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT + ".");
});