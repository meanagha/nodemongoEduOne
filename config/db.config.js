require('dotenv').config()
module.exports={
    url : `mongodb://${process.env.HOST}:27017/${process.env.DB}`
}

