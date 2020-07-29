window.addEventListener('load', function(){
  if(sessionStorage.getItem('title')){
    let usertitle = sessionStorage.getItem("title");

    if (usertitle == "店長") {
      $("li").slice(3, 8).css("visibility", "hidden");
    }
  }else{
    location.href="login.html";
  }
})