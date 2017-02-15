//==============================================================================
//
//
//
//
//
//
//==============================================================================
// index.js
//==============================================================================




// setup connection.
var socket = io.connect('http://www.ec2-52-52-136-108.us-west-1.compute.amazonaws.com');



//============================================================================
//
//            ********** Knockout Referenced Onclick Listeners ***********
//
//============================================================================
// join user to trivia game upon join button click.
var join_user = function() {

  console.log('join user clicked')

  // get username.
  var user_name = document.getElementById('user_name').value;

  // if the user name is in the field, join them.
  if( !(user_name == "" || user_name == null) ){
    // add to window.
    window.USER_NAME = user_name;

    // Send the user the server.
    socket.emit('join_user', {name: user_name});
  }
}

//============================================================================
// submit trivia answer on submit button click.
var submit_answer = function() {
  // get user's answer from input field.
  var answer_text = document.getElementById('user_answer_text').value;

  // build object to send to the api.
  var answer_data = {
    "answerID": window.ANSWER_ID,
    "answer": answer_text
  }

  // send a POST request to our api to check if the user's answer is correct.
  $.ajax({
    url: '/answer',
    type: 'POST',
    data: JSON.stringify(answer_data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(answer_correctness){
        // build an object to store the user's name and the corrrectness of their answer.
        // posts to /answer returns answer_response in this format: { "correct" : true}
        var user_answer = {
          "user_name": window.USER_NAME,
          "correct": JSON.parse(answer_correctness).correct
        }

        // emit the user's name and the correctness of their answer to the server.
        console.log("This is the /answer post" + window.USER_NAME);
        socket.emit('answer', JSON.stringify(user_answer));
      }
  });
}
//============================================================================
var get_question = function (){
  // send a GET request to our api for a random question.
  $.ajax({
    url: '/question',
    type: 'GET',
    dataType: "json",
    success: function(trivia){

        if(trivia != null){
          // tell the server that there is a new question.
          socket.emit('question', trivia);
        }
        else{
          // just print something.
          console.log('NULL Response from server for GET to /question');
        }
    }
  });
}
//============================================================================










//============================================================================
//
//            ********** Helper Functions ***********
//
//============================================================================
var update_score = function() {
  $.ajax({
    url: '/score',
    type: 'GET',
    dataType: "json",
    success: function(score){

        if(score != null){
          // tell the server the current score.
          socket.emit('score', score);
        }
        else{
          // just print something.
          console.log('NULL Response from server for GET to /score');
        }
    }
  });
}
//============================================================================

/*Add section for sign up page

*/







//============================================================================
//
//                ********** Socket Listeners **********
//
//============================================================================

// when the server emits a new user update, update the online user list.
socket.on('new_user_announcement', function(user){
  // add the username to the users list
  //var li = document.createElement('li');
  //li.appendChild(document.createTextNode(user.name));
  //document.getElementById('online_users').appendChild(li);
  vm.online_users.push(user.name);
});
//============================================================================

// when the server emits a trivia_announcement, post the trivia questions in the view.
socket.on('trivia_announcement', function(trivia){
  if(trivia != null){

    // update the html with our trivia.
    //document.getElementById('trivia_question').innerHTML = trivia.question;
    vm.trivia_question(trivia.question);

    // save the id.
    window.ANSWER_ID = trivia.answerID;
  }
  else{
    // just print something.
    vm.trivia_question('null response, something went wrong.');
  }
});

//============================================================================
// when the server emits the correctness of answer and the user who posted it, update the view.
socket.on('answer_announcement', function(answer_data){
  if(answer_data != null){
    console.log(answer_data);
    var answer = JSON.parse(answer_data);
    // write the users answer to the answer text in the view.
    //document.getElementById('user_who_submitted_answer').innerHTML = 'Submitted by: ' + answer.user_name;
    //document.getElementById('user_answer_correctness').innerHTML = 'Answer is correct:' + answer.correct;
    vm.user_who_submitted_answer('Submitted by: ' + answer.user_name);
    vm.user_answer_correctness('Answer is correct:' + answer.correct);

    // now that the answer has been updated, send update the score request to sever to update all the client's views with score.
    update_score();
  }
  else {
    vm.user_answer_correctness("user submitted answer, null response from server");
  }
});
//============================================================================
// when the server emits the new score data, update the view.
socket.on('score_announcement', function(score_data){
  if(score_data != null){
    // convert the JSON to a usable JS object.
    var score = JSON.parse(score_data);

    // set the scores into the view.
    //document.getElementById('right_score').innerHTML = 'Right Answers: ' + score.right;
    //document.getElementById('wrong_score').innerHTML = 'Wrong Answers: ' + score.wrong;
    vm.right_score('Right Answers: ' + score.right);
    vm.wrong_score('Wrong Answers: ' + score.wrong);
  }
});
//============================================================================






//============================================================================
// This is our View Model that defines our bindings.
var vm = {
  trivia_question: ko.observable(),
  user_who_submitted_answer: ko.observable(),
  user_answer_correctness: ko.observable(),
  right_score: ko.observable(),
  wrong_score: ko.observable(),
  online_users: ko.observableArray(),
  submit_user_name: join_user,
  submit_trivia_answer: submit_answer,
  get_trivia: get_question
}
//==============================================================================





//==============================================================================
var main = function() {

  // apply view model bindings. Activate.
  ko.applyBindings(vm);

} // end of main.
//==============================================================================





//==============================================================================
$(document).ready(main);
//==============================================================================
