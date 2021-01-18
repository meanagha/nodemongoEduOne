 
const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
      .populate("roles")//roles is table name
      .exec((err, user) => {
        if (err) {
            console.log("err=="+err)
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        var authorities = [];   
        console.log("log=")
        console.log(user.role)//600173bf1225486535cfddea

  
        for (let i = 0; i < user.role.length; i++) {
          authorities.push("ROLE_" + user.role[i].name.toUpperCase());//cant read "toUpperCase"
        }
        res.status(200).send({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.authorities,
          accessToken: token
        });
      });
  };