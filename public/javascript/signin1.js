var name;
var email;
var password;


$("#signinbutton").on('click', function(){
    name = $("#inputName").val();
    email = $("#inputEmail").val();
    password = $("#inputPassword").val();
  //  token =   window.sessionStorage.accessToken;
    console.log(email);
    console.log("\n" + password);
    //alert("Value: " + $("#psw").val());
    var object = {
                  "name" : name,
                  "email" : email,
                  "password": password
                //  "token" : token
                 }


    //var sobject = JSON.stringify(object);
//var headertoken;

    // send a POST request to our api to check if the user's answer is correct.
    $.ajax({
      url: '/signin1',
      type: 'POST',
      data: JSON.stringify(object),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      /*
      headers: {
          'Authorization':'Bearer '+window.sessionStorage.accessToken,
        //  'X_CSRF_TOKEN': window.sessionStorage.accessToken,
          'Content-Type':'application/json'
      },
      */
      
      beforeSend: function (xhr) {
      //  xhr.setRequestHeader ("Authorization",  + document.cookie);
       xhr.setRequestHeader ("Authorization", "token" + document.cookie);
      //xhr.setRequestHeader ("Authorization", "token" + window.sessionStorage.accessToken);
      },
      success: function(data){
      //  var tokenstringified = JSON.stringify(data.token);
        //   window.headertoken ={"token1" : tokenstringified} ;
      //  alert("SUCCESSFUL SIGNIN" + headertoken);

          // build an object to store the user's name and the corrrectness of their answer.
          // posts to /answer returns answer_response in this format: { "correct" : true}
        //  var user_answer = {
        //    "user_name": window.USER_NAME,
        //    "correct": JSON.parse(data).correct
        //  }
        //JSON.parse(data);
      //  console.log("This is from the server " + data.header);

    //  alert("this is the headercontents" + headertoken);
          window.location = data;
        },
        error: function(){
          alert("Either 1 of the 3 fields are incorrect or user doesn't exist in DB!");
        }
    });

});
