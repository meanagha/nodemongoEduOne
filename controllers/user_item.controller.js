const db = require("../models/");
const Tutorial = db.tutorials;

// Create and Save a new User
exports.create = (req, res) => {
    db.User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  };

exports.createItem = (req, res) => {
    db.Item.create(req.body)
    .then(function(dbItem) {     
      return db.User.findOneAndUpdate({ _id: req.params.id }, {$push: {items: dbItem._id}}, { new: true });
    })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
  }

// Retrieve all Items + User from the database.
exports.findAll = (req, res) => {  
    db.User.find()
    .populate("items")
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
  };

// Retrieve all Items from the database.
exports.findAllItems = (req, res) => {
    db.Item.find({})
    .then(function(dbItems) {
      res.json(dbItems);
    })
    .catch(function(err) {
      res.json(err);
    })
};

// Find a single User with an id

exports.findOne = (req, res) => {
    db.User.findOne({ _id: req.params.id })
    .populate("items")
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
};



// Delete a User with the specified id in the request
exports.delete = async(req, res) => {
 const id = req.params.id;
  try {   
    const parentDel = await  db.User.findByIdAndDelete(id);
    const childDel = await db.Item.deleteMany({_id: parentDel.items});
    res.send({
        message: "User deleted successfully!"
    });

  } catch(err) {    
    res.send({
            error:"User not found"
    });
  }

};

// Delete all items from the database.
exports.deleteItem = (req, res) => {
    const id = req.params.id;

  db.Item.findOneAndDelete({ _id: req.params.id,rent_status:"0" })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Item with id=${id}. Maybe Item was not found OR item is not free !`
      });
    } else {
      res.send({
        message: "Item was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });

};

// Update a User by the userid in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    db.User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
  

  // Update a Item by the itemid in the request
exports.updateItem = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    db.Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Item with id=${id}. Maybe Item was not found!`
          });
        } else res.send({ message: "Item was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Item with id=" + id
        });
      });
  };
  