$(document).ready(function(){
  $.ajax({
    url: '/api',
    type: 'GET',
    dataType: "json",
    success: function(token){
        //console.log(token.token);
        if(token != null){
        //save token on clientside to localstorage(browser storage)
        //console.log("line 10 this is what is in the token var" + JSON.stringify(token));
        window.sessionStorage.accessToken = token.token;
        localStorage.setItem('token', JSON.stringify(token.token));
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
$.ajax({

    url: '/signin1',
    type: 'GET',
    dataType: "json",
    //data: YourData,
    success: function(data){
      console.log('succes');
      window.location = data;
    }
  });
});
/*
  $.ajax({
    url: '/signup',
    type: 'GET',
    dataType: "json",
    success: function(data){
      window = data;
      console.log("success");
    },
    beforeSend: function (xhr) {
    xhr.setRequestHeader ("Authorization", "Bearer" + window.sessionStorage.accessToken);
    },

  });
*/


/*
function make_base_auth(token, password) {
    token = 'token';
    password = window.sessionStorage.accessToken;
    var tok = token + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}
*/
