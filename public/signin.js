
var email;

$("#signbtn1").click(function(){
    email = $("#psw").val();
    console.log(email);
    //alert("Value: " + $("#psw").val());
    var object = {"email": email}


    var sobject = JSON.stringify(object);
    console.log("this is the contents of the email variable not stringified" + object);
    console.log("this is the contents of the email variable" + sobject);
});


/*
    // Attach a submit handler to the form
    $( "#searchForm" ).submit(function( event ) {

      // Stop form from submitting normally
      event.preventDefault();

      // Get some values from elements on the page:
      var $form = $( this ),
        term = $form.find( "input[name='s']" ).val(),
        url = $form.attr( "action" );

      // Send the data using post
      var posting = $.post( /signin, { s: term } );

      // Put the results in a div
      posting.done(function( data ) {
        var content = $( data ).find( "#content" );
        $( "#result" ).empty().append( content );
      });
    });

*/




/*

var emailpost = $.ajax({
  type: "POST",
  url: url,
  data: data,
  success: success,
  dataType: dataType
});
});
*/
