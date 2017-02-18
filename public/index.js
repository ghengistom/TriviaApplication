$(document).ready(function(){
  $.ajax({
    url: '/authenticate/api',
    type: 'GET',
    dataType: "json",
    success: function(token){
        //console.log(token.token);
        if(token != null){
        //save token on clientside to localstorage(browser storage)
        //console.log("line 10 this is what is in the token var" + JSON.stringify(token));
      //  document.cookie = "token"= token.token;

      //  window.sessionStorage.accessToken = token.token;
        document.cookie = 'bearer' + "=" + token.token;

    //  document.cookie = JSON.stringify(token.token);
      //  alert(document.cookie);
      //  localStorage.setItem('token', JSON.stringify(token.token));
        }
        else{
          // just print something.
          console.log('NULL Response from server for GET to /score');
        }
    }
  });
//NOW handle buttons for go to sign up or go to sign in
//Go to signup


/*
  headers: {
              'Authorization':'Bearer ' + window.sessionStorage.accessToken,
              'Content-Type':'application/json'
            },
            */

console.log("line 26!!!!!!!1" );



//$("#go2signup").on('click', function(){
//  window.location ="http://localhost:9000";
console.log("Inside index.js inside button go2signup")
    $.ajax({
      url: '/signup',
      type: 'GET',
      dataType: "json",
      success: function(data){
        window.location = data;
        console.log("success");
      },
      beforeSend: function (xhr) {
      //  xhr.setRequestHeader ("Authorization",  + document.cookie);
       xhr.setRequestHeader ("Authorization", "token" + document.cookie);
      //xhr.setRequestHeader ("Authorization", "token" + window.sessionStorage.accessToken);
      },

    });

//  });
});

/*
$.ajax({

  xhrFields: {
    withCredentials: true
},
  headers: {
      'Authorization':'Bearer '+window.sessionStorage.accessToken,

    //  'X_CSRF_TOKEN': window.sessionStorage.accessToken,
      'Content-Type':'application/json'
  },
    url: '/signin1',
    type: 'GET',
    dataType: "json",
  //  data: YourData,
    success: function(data){
      console.log('succes');
    // window.location = data;
    }
  });

*/
