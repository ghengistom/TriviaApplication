var name;
var email;
var password;


$("#signinbutton").on('click', function(){
    name = $("#inputName").val();
    email = $("#inputEmail").val();
    password = $("#inputPassword").val();
    console.log(email);
    console.log("\n" + password);
    //alert("Value: " + $("#psw").val());
    var object = {
                  "name" : name,
                  "email" : email,
                  "password": password
                 }


    //var sobject = JSON.stringify(object);


    // send a POST request to our api to check if the user's answer is correct.
    $.ajax({
      url: '/signin1',
      type: 'POST',
      data: JSON.stringify(object),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
          // build an object to store the user's name and the corrrectness of their answer.
          // posts to /answer returns answer_response in this format: { "correct" : true}
        //  var user_answer = {
        //    "user_name": window.USER_NAME,
        //    "correct": JSON.parse(data).correct
        //  }
        //JSON.parse(data);
      //  console.log("This is from the server " + data.header);
          window.location = data;
        },
        error: function(){
          alert("Either 1 of the 3 fields are incorrect or user doesn't exist in DB!");
        }
    });





});
