//==============================================================================
// router.js
//==============================================================================
var path = require('path');
var express = require('express');
var Question = require('../models/question');
var User = require('../models/user');
var redis = require("redis"); //require redis module
var app = express();
var strsplit = require('strsplit');


//will be my secure routes
//var cookieParser = require('cookie-parser');




//app.use(cookieParser());

var router = express.Router();


require('../app.js');
//Add JWT libraries
//var expressJWT = require('express-jwt');
//var jwt = require('jsonwebtoken');


//Controllers
//var authenticateController = require('../controllers/authenticate-controller');

//makes secret a constant value
process.env.secret ='crazy kiki';


var bodyParser = require('body-parser');

app.use(bodyParser.json());
//app.use('/secure-api', router);



//get authenticate controller
//router.get('/authenticate/api', authenticateController.authenticate);
//app.get('/api/get-data', dataController.getData);


/*


//Validation middleware
router.use(function(req,res,next){
var clientToken = JSON.stringify(req.headers.cookie);

var clTParsed = JSON.parse(clientToken);
//var regex = new Regex(/clTParsed/);

//make a regulars express to pull out just the token from the token.cookie
var ss = strsplit(clTParsed, '=', 2 );
console.log("This is the first index in the array" + ss[0]);
console.log(ss[1]);

  var token = req.body.token ||  ss[1];


  var verifiedJwt = jwt.verify(token,process.env.secret);
  console.log("THisi s line 76 verified JWT\n\n" + JSON.stringify(verifiedJwt));

  //verify if user has a token
  if(token){
    console.log("You have a token time to validate it!");
    //res.send("You have a token time to validate it");
    jwt.verify(token, process.env.secret, function(err, decode){
      if(err){
        res.status(500).send("Invalid token");
      }else{
        console.log("getting saved to db after it went through jwt.verify function" + token);
        //saves into DB
        next();

      }
    })
  } else {
    res.send("please send a token");
  }

})




*/


//router.post('/post-data', dataController.postData);



//make count object to store the counts
var counts = {};
// create a client to connect to redis
var client = redis.createClient();

counts.right = 0;




//=====================================================
//Data for sign in
<<<<<<< HEAD

=======
<<<<<<< HEAD
router.get('/home', function(req,res) {
  res.sendFile(path.resolve('public/home.html'));
})
>>>>>>> parent of e57c355... Rever to 295025ea3e50f7c262e71e043d5c52e252db5bc0
router.get('/signin', function(req,res) {
=======
/*
router.get('/api/signin', function(req,res) {
>>>>>>> origin
  res.sendFile(path.resolve('public/signin.html'));
})
*/

router.get('/signin1', function(req,res) {
  console.log("\n\nat signin1 \n");
  res.sendFile(path.resolve('/signin1.html'));
})


//=====================================================
//Data for sign in

//Post to signin1
//router.put('/questions/:id', function(req, res) {
router.post('/signin1', function(req, res) {


  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

var object = {
      "name" : name,
      "email" : email,
      "password" : password
}


  User.findOne(
      //{"name" : name2, "email" : email2, "password" : password2},
      object,
      function(err, user)  {
        if (err){
          console.log("ERROR finding " + err);
          res.send(err);
        }
        if (user){
            console.log("\n user found in DB \n");

            res.contentType('application/json');
            var data = JSON.stringify('http://ec2-52-52-136-108.us-west-1.compute.amazonaws.com:9000/trivia.html');
            res.header('Content-Length', data.length);
            res.end(data);
        } else{
          console.log("\n\n User doens't exist \n\n");

        }
      }
  )

});


//=====================================================
//Data for sign in




//=====================================================
//Data for get sign up
app.get('/signup', function(req,res) {
  console.log("On the Server ins /api/signup!!");
  //  console.log('token: ', req.cookies);
    res.sendFile(path.resolve('public/signup'));

});
//=====================================================
//Data for get sign up






//=====================================================
//Data for post sign up
router.post('/signup', function(req, res) {


  var name = req.body.name;
//  var phone = req.body.phone;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(!req.body.name){
    res.status(400).send('Name Required');
    return;
  }
  if(!req.body.email){
    res.status(400).send('Email Required');
    return;
  }
  if(!req.body.password){
    res.status(400).send('Password Required');
    return;
  }
  if(!req.body.password2){
    res.status(400).send('Password Required');
    return;
  }

  if(password ==password2){
    console.log("\n Passords match \n Access Granted");

    //put all new user details in JSON object
    var object = {
                  "name": name,
                //  "phone": phone,
                  "email": email,
                  "password": password,
                  };

    //Create a new user in Mongodb with mongoose library
    User.create(object, function(err, question){
      if (err) {
        return res.status(500).json({err: err.message});
      }
      //res.json({'object' : question, message: 'Question Created'});
    });
    res.contentType('application/json');
    var data = JSON.stringify('http://ec2-52-52-136-108.us-west-1.compute.amazonaws.com:9000/signin1.html');
    res.header('Content-Length', data.length);
    res.end(data);

    //res.send({redirect: '../public/trivia'});
  }
//Else case passwords don't match.
  else{
      console.log("Passwords didn't match");
  }

});


//=====================================================
//Data for get sign up


//==============================================================================
//Returns a single trivia question:
/* { "question": "Who was the first computer programmer?",
    "answerId": 1 }
*/
router.get('/question', function(req, res) {

  Question.count().exec(function (err, count) {
    // Get a random entry
    var random = Math.floor(Math.random() * count)

    Question.findOne().skip(random).exec(
      function(err, questions){

      if(err) {
        return res.status(500).json({message: err.message});
      }
      //create a new object and fill it with 2/3 of the attributes from DB object
      res.json({
                //JSON format
                //http://www.w3schools.com/js/js_json_intro.asp
                // key        //value
                "question" : questions.question,
                "answerID" :questions._id
              });
    });
  });
});


//==============================================================================
//Creates a new trivia question:
/*{ "question": "Who led software development for NASA's Apollo missions?",
  "answer": "Margaret Hamilton" }
}*/
router.post('/question', function(req, res) {
  var question = req.body;
  Question.create(question, function(err, question){
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'question' : question, message: 'Question Created'});
  });
});



//==============================================================================
// update an existing question. API calls for POST, we use PUT for convention.
/* Should receive this format. and insert to mongo db as per schema.
    {
      question: "Who led software development for NASA's Apollo lunar mission?",
      answer: "Margaret Hamilton"
    }
    */
//router.put('/questions/:id', function(req, res) {
router.post('/question', function(req, res) {
      /* Should receive this format. and insert to mongo db as per schema.
      {
        question: "Who led software development for NASA's Apollo lunar mission?",
        answer: "Margaret Hamilton"
      }
      */
      // Get data:
      var questionText = req.body.question;
      var answerText = req.body.answer;
      var answerId = null;

      Question.find({}).count(function(err, numberQuestions){
          // set proper question id.
          answerId = numberQuestions + 1;

          console.log(answerId);


          // build question to insert based on schema.
          var newQuestion =
          {
            question: questionText,
            answer: answerText,
          }

          // insert to mongoDB, this is asynchronous. The create method adds version keys.
          Question.create(newQuestion, function(err, data){
            if(err){
              console.log(err)
              res.end();
            }
            else{
              console.log("Inserted New Question");
              res.end();
            }
          });
      });
});



//==============================================================================
// receives an answer.
router.post('/answer', function(req, res)
{
  //get user answer from browser
  var userAnswer = req.body;

  // print user's answer and the id.
  console.log("here is the user answer:");
  console.log(userAnswer);

  // if the user posts incorrect data, just send an empty response.
  if(userAnswer == null){
    res.end();
    return;
  }

  Question.findById(userAnswer.answerID, function(err, question)
  {
    var count = {};
    if (err){
      return res.status(500).json({err: err.message});
    }
    client.get("right", function(err, rightCount){
      //check to make sure there's no error
      if (err!==null){
        console.log("ERROR: " + err);
        //exit the function
        return;
      }
      count.right = parseInt(rightCount, 10) || 0;
    })
    if(userAnswer.answer == question.answer)
    {
      client.incr("right");
      count.right = counts.right + 1;
      return res.json(JSON.stringify({ "correct" : true})); // res.json doesn't convert javascript object to json, it must be stringified.
    } else
    {
      client.incr("wrong");
      count.wrong = counts.wrong + 1;
      return res.json(JSON.stringify({"correct" : false}));
    }
  })

});


//==============================================================================
router.get('/score', function(req, res){
  /* format response like so:
    {
    right: 2,
    wrong: 1
  }
  */

  // get wrong and right from computer, computer knows all.
  // get from redis is asynchronous so send data in callback.
  client.mget("right", "wrong", function(err, scoreData){
      var rightScore = scoreData[0]; // right score
      var wrongScore = scoreData[1]; // wrong score

      // data to return.
      var score = {
        right: rightScore,
        wrong: wrongScore
      }

      // send score data
      res.json(JSON.stringify(score));
  });
});
//==============================================================================

module.exports = router;
//==============================================================================
