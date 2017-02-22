var name;
var phone;
var email;
var password;
var password2;


$("#signupbutton").on('click', function(){
    name = $("#inputName").val();
  //  phone = $("#inputNumber").val();
    email = $("#inputEmail").val();
    password = $("#inputPassword").val();
    password2 = $("#inputPassword2").val();

    var object = {
                  "name": name,
                //  "phone": phone,
                  "email": email,
                  "password": password,
                  "password2": password2
                 }


    //var sobject = JSON.stringify(object);
    // send a POST request to our api to check if the user's answer is correct.
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: JSON.stringify(object),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      beforeSend: function (xhr) {
      //  xhr.setRequestHeader ("Authorization",  + document.cookie);
       xhr.setRequestHeader ("Authorization", "token" + document.cookie);
      //xhr.setRequestHeader ("Authorization", "token" + window.sessionStorage.accessToken);
      },
      success: function(data){
<<<<<<< HEAD

=======
>>>>>>> parent of c76ce8d... Added redirects from index to signin and vice versa
          window.location = data;

        },
        error: function(){
          alert("Passords don't match!");
        }

    });


});
