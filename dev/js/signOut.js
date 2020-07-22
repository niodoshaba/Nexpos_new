let signOutBtn = document.querySelector('.signOutBtn');

signOutBtn.addEventListener("click", function () {
    sessionStorage.clear();
})