var express = require("express");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

console.log(db);

// Connect to MongoDB
mongoose.connect("mongodb://localhost/rentingPlatformEdu", { useNewUrlParser: true });

require('dotenv').config();

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder

// Routes

// Home route. Currently just to make sure app is running returns hello message.
app.get("/", function(req, res) {
  res.send("Hello from demo app!");
});


// Route to get all reviews
// app.get("/items", function(req,res) {
//     db.Item.find({})
//     .then(function(dbItems) {
//       res.json(dbItems);
//     })
//     .catch(function(err) {
//       res.json(err);
//     })
//   });

  // Route for creating a new User
// app.post("/user", function(req, res) {
//     db.User.create(req.body)
//       .then(function(dbUser) {
//         // If we were able to successfully create a User, send it back to the client
//         res.json(dbUser);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });


  // Route for creating a new Item and updating User "Item" field with it
// app.post("/user/:id", function(req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Item.create(req.body)
//       .then(function(dbItem) {
//         // If a Item was created successfully, find one User with an `_id` equal to `req.params.id`. Update the User to be associated with the new Item
//         // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//         // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//         return db.User.findOneAndUpdate({ _id: req.params.id }, {$push: {items: dbItem._id}}, { new: true });
//       })
//       .then(function(dbUser) {
//         // If we were able to successfully update a User, send it back to the client
//         res.json(dbUser);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });

//   // Route for retrieving a User by id and populating it's Item.
// app.get("/users/:id", function(req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.User.findOne({ _id: req.params.id })
//       // ..and populate all of the notes associated with it
//       .populate("items")
//       .then(function(dbUser) {
//         // If we were able to successfully find an User with the given id, send it back to the client
//         res.json(dbUser);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });
const PORT = process.env.PORT || 5000;

require("./routes/item.routes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT + ".");
});