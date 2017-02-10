var email;
var password;

$("#signupbutton").on('click', function(){
    email = $("#inputEmail").val();
    password = $("#inputPassword").val();
    console.log(email);
    console.log("\n" + password);
    //alert("Value: " + $("#psw").val());
    var object = {"email": email,
                  "password": password
                 }
    //var sobject = JSON.stringify(object);
    // send a POST request to our api to check if the user's answer is correct.
    $.ajax({
      url: '/signup',
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

        console.log(data);

        }
    });

    console.log("this is the contents of the email variable not stringified" + object);
    console.log("this is the contents of the email variable" + sobject);
});
