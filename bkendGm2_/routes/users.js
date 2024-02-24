const mongoose = require('mongoose');
const plm=require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/bkend22')

const usrSchema = mongoose.Schema(
  {
    username: String,
    secret: String,
    // password: req.body.password
    // username: req.body.username,
    // secret: req.body.secret,
    // // password: req.body.password
  }
)

usrSchema.plugin(plm);

module.exports = mongoose.model('usrs',usrSchema);



/*
code till authentication(timestamp 1.10.0hr)
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/BEGame2");

const userSchema = mongoose.Schema({
  username: String,
  nickname:String,
  description: String,
  categories:{
    type: Array,
    default: []
  },
  datecreated:{
    type: Date,
    default: Date.now()
  }
});

// mongoose.model(naam,schema)
//naam -> collection like redmi, vivo, realme
//schema -> mi11 or vivo3A or realmeC2
module.exports = mongoose.model("user",userSchema);


//sudo service mongod start //command for terminal mongodb
*/