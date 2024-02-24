var express = require('express');
var router = express.Router();

const userModel = require('./users');
const passport = require('passport')
const localStrategy = require('passport-local')

passport.use(new localStrategy(userModel.authenticate()));


router.get('/', function(req, res) {
  res.render('index');
});

router.get('/profile', isLoggedIn,function(req, res) {
  res.render('profile');
});

router.post('/register', function(req, res) {
  var userData = new userModel({
      username: req.body.username,
      secret: req.body.secret
      // password: req.body.password
  });

  userModel.register(userData, req.body.password)
      .then(function(registeredUser) {
          passport.authenticate('local')(req, res, function() {
              res.redirect('/profile');
          });
      })
      .catch(function(err) {
          // Handle registration error
          console.error('Registration error:', err);
          res.status(500).send('Error registering user');
      });
});




router.post('/login',passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect: '/'
}),function(req,res){})


router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err) {return next(err);}
    res.redirect('/');
  })
})


function isLoggedIn(req,res,next){   //--protection
  if(req.isAuthenticated()){ 
       return next();
  }
  res.redirect('/');
}













/*
//part till authentication & authorisation

// router.get('/create',async function(req,res){
//     const dataCreate = await userModel.create(
//       {
//       username: "Akhiles",
//       nickname:"Akkim",
//       description: "I am aiming engineer",
//       categories:['geo','his','sci','lifestyle'],
//       }
//     )
//     res.send(dataCreate);
// })

router.get('/find',async function(req,res){   //Q2
  let found = await userModel.find({ datecreated: { $gte: '2024-02-20', $lte: '2024-02-22' }});
  res.send(found);
})

// router.get('/find',async function(req,res){   //Q2
//   let found = await userModel.find({categories:{$all:["lifestyle"]}});
//   res.send(found);
// })

// router.get('/find',async function(req,res){   Q1 case insensitive
//   var regex = new RegExp("^AKKI$", 'i')
//   let found = await userModel.find({nickname:regex});
//   res.send(found);
// })

// router.get('/delete', async function(req, res) {
//    let dlt = await userModel.findOneAndDelete({nickname:'Akki'});
//    res.send(dlt);
// });


// short answers by chatgpt
// 1. Model.find({ fieldName: { $regex: 'searchTerm', $options: 'i' }});
// 2. Model.find({ arrayField: { $all: ['value1', 'value2', 'value3'] }});
// 3. Model.find({ dateField: { $gte: startDate, $lte: endDate }});
// 4. Model.find({ fieldName: { $exists: true }});
// 5. Model.find({ $expr: { $gte: [{ $strLenCP: "$fieldName" }, minLength] }});


// router.get('/failes',function(req,res){
//   //  res.send(naam, data);
//   req.flash("age",25);
//   res.send("Ban gya")
// })

// router.get("chk",function(req,res){
//   console.log(req.flash("age"));
//   res.send("chk bkend terminal")
// })

// router.get('/err', function(req, res) {
//   res.render('error');
// });

*/



module.exports = router;
