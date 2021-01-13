module.exports = app => {
    const user_item = require("../controllers/user_item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/user", user_item.create);

    // Retrieve all users with items
    router.get("/users/", user_item.findAll);

    // Retrieve perticular users with items
    router.get("/users/:id", user_item.findOne);
      
    // Create a new item under perticular user.
    router.post("/user/:id", user_item.createItem);
  
    // Retrieve all items
    router.get("/items", user_item.findAllItems);
  
    // Delete a Tutorial with id
    router.delete("/users/:id", user_item.delete);
  
    // Create a new Tutorial
   router.delete("/items/:id", user_item.deleteItem);

   // Update a User with id
   router.put("/user/:id", user_item.update);

   // Update a Item with id
   router.put("/item/:id", user_item.updateItem);
  
  
    app.use('/', router);
  };