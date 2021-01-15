const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const config = require("./config/db.config");
var bcrypt = require("bcryptjs");

require('dotenv').config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./models");
const Role = db.role;
const User = db.user;
const Emp = db.emp;


mongoose.connect(config.url, {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
 console.log('connected to db')
 adminCredentials();

}).catch((error) => {
 console.log(error)
})
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to userManagement System application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {   
    console.log(`Server is running on port ${PORT}.`);
});

const adminCredentials = () => {
   
    /**
     * On project load/run,
     * 1.Insert admin and user roles into role table
     *  Before insert 2 rols into role table.Check already roles exist or not.If exists then dont add.If not exists then add
     * So to check count use mongoose's default function i.e "estimatedDocumentCount"
     * 2.Insert admin details into user table
     */ 
    Role.estimatedDocumentCount((err,count) => {
        console.log(count)
        if(!err && count == 0){
            //If no any error and if count of roles in Role table is 0 ,then add roles
            new Role({
                name: "user"
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
                console.log("added 'user' to roles collection");
              });
              new Role({
                name: "admin"
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
              });

             

        }
    })

    User.estimatedDocumentCount((err,count) => {
        console.log(count)
        if(!err){                     
         
                /** To store "admin" role id staticaly from Roles table */
                Role.findOne({ name: "admin" }, (err, role) => {
                    console.log(role._id)

                    if (err) {                      
                        return;
                    }
                    else{
                        User.estimatedDocumentCount({role:role._id},(err,count) => {
                            if(count == 0){
                                console.log("Admin is not exists in user table So insert")
                                const user = new User({                
                                    name: "Anagha Patil",
                                    email : "anagha@gmail.com",
                                    password: bcrypt.hashSync("123"),
                                    confirm_password:bcrypt.hashSync("123"),
                                    mobile:"9843524354",
                                    profilePic:"profilePic"
                                    
                                  });
                                 
                              
                                user.role = [role._id];
                                user.save(err => {
                                if (err) {       
                                    console.log(err)               
                                    return;
                                }
                                          
                                console.log("added 'admin' to DB");
                            });
                        };
                    });                    
                 }
                });
               
             
        }
    })



}