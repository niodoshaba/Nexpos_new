window.addEventListener('load', function(){
  if(sessionStorage.getItem('name')){
    // 判斷登入人員並顯示於頁面
    let username = sessionStorage.getItem('name');

    let loginName = document.querySelector('.user');
    loginName.innerHTML = `Hi! ${username}`;
  }else{
    location.href="login.html";
  }
})








