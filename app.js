var express = require("express");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

console.log(db);

// Connect to MongoDB
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

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