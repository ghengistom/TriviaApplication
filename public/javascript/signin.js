document.querySelector(".button1").addEventListener("click", function(){
    var element = document.createElement("div");
    element.innerHTML = "<p>Additional Line</p><p>Additional Line</p><p>Additional Line</p>";
  document.querySelector(".content").appendChild(element);
});
