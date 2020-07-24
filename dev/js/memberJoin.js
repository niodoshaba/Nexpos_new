function $id(id) {
  return document.getElementById(id);
}

function addSpot() {
  let myForm = $id("myForm");
  let resTable = $id("resTable");
  let btnSend = $id("btnSend");
  let spot = document.querySelector(".spot");
  // let resTablehead = document.getElementById("resTablehead");
  // let input = document.getElementsByTagName("input");
  let newSpot = spot.cloneNode(true);
  // resTablehead.appendChild(newSpot);
  // newSpot.style.display="";
  // myForm.insertBefore(newSpot, btnSend);
  // input.value="";
  resTable.appendChild(newSpot);
  newSpot.getElementsByTagName("img")[0].onclick = removeSpot; //加入JS行為
}

function removeSpot(e) {
  let resTable = $id("resTable");
  resTable.removeChild(e.target.parentNode.parentNode);
}

// window.addEventListener("load", function () {
//   $id("btnAddSpot").onclick = addSpot;
// });

//正規表達式
//name
let lastname = document.querySelector(".lastname");
let updateLastName = document.querySelector(".regUpdateLastName");

lastname.addEventListener("input", inputLastName);

function inputLastName(e) {
  let inputLastName = e.target.value;
  if (inputLastName && /^[\u4e00-\u9fa5_a-zA-Z]/.test(inputLastName)) {
    updateLastName.textContent = "有效姓名";
    updateLastName.classList.add("success");
    updateLastName.classList.remove("failure");
  } else {
    updateLastName.textContent = "無效姓名";
    updateLastName.classList.remove("success");
    updateLastName.classList.add("failure");
  }
}

let firstname = document.querySelector(".firstname");
let updateFirstName = document.querySelector(".regUpdateFirstName");

firstname.addEventListener("input", inputFirstName);

function inputFirstName(e) {
  let inputFirstName = e.target.value;
  if (inputFirstName && /^[\u4e00-\u9fa5_a-zA-Z]/.test(inputFirstName)) {
    updateFirstName.textContent = "有效姓名";
    updateFirstName.classList.add("success");
    updateFirstName.classList.remove("failure");
  } else {
    updateFirstName.textContent = "無效姓名";
    updateFirstName.classList.remove("success");
    updateFirstName.classList.add("failure");
  }
}

//cell
let cell = document.querySelector(".cell");
let updatecell = document.querySelector(".regUpdateCell");

cell.addEventListener("input", inputCell);

function inputCell(e) {
  let inputcell = e.target.value;
  if (inputcell && /[0-9]{10}/.test(inputcell)) {
    updatecell.textContent = "有效電話";
    updatecell.classList.add("success");
    updatecell.classList.remove("failure");
  } else {
    updatecell.textContent = "無效電話";
    updatecell.classList.remove("success");
    updatecell.classList.add("failure");
  }
}
//email
let email = document.querySelector(".email");
let updateEmail = document.querySelector(".regUpdateEmail");

email.addEventListener("input", inputEmail);

function inputEmail(e) {
  let inputemail = e.target.value;
  if (inputemail && /(^\w.*@\w+\.com)/.test(inputemail)) {
    updateEmail.textContent = "有效email";
    updateEmail.classList.add("success");
    updateEmail.classList.remove("failure");
  } else {
    updateEmail.textContent = "無效email";
    updateEmail.classList.remove("success");
    updateEmail.classList.add("failure");
  }
}

//ajax save to database
$(document).ready(function () {
  $("#butsave").on("click", function () {
    $("#butsave").attr("disabled", "disabled");
    //  $(".spot").attr("display", "none");
    var CUS_FIRST = $("#CUS_FIRST").val();
    var CUS_LAST = $("#CUS_LAST").val();
    var CUS_GEN = $("#CUS_GEN").val();
    var CUS_PHONE = $("#CUS_PHONE").val();
    var CUS_BIRTH = $("#CUS_BIRTH").val();
    var CUS_EMAIL = $("#CUS_EMAIL").val();
    var CUS_ID = $("#CUS_ID").val();
    var CUS_STATE = $("#CUS_STATE").val();
    var CUS_POINT = $("#CUS_POINT").val();

    $.ajax({
      url: "./js/memberJoin.php",
      type: "POST",
      data: {
        CUS_PHONE: CUS_PHONE,
        CUS_ID: CUS_ID,
        CUS_STATE: CUS_STATE,
        CUS_FIRST: CUS_FIRST,
        CUS_LAST: CUS_LAST,
        CUS_GEN: CUS_GEN,
        CUS_BIRTH: CUS_BIRTH,
        CUS_EMAIL: CUS_EMAIL,
        CUS_POINT: CUS_POINT,
      },
      // cache: false,

      success: function (data) {
        alert("儲存成功~~");
        location.href = "./memberJoin.html";
        console.log(data);
      },
    });
  });
});

// $("#butsave").click(function () {
//   $(".spot td input").each(function () {
//     $(this).val("");
//   });
//   // $(".regUpdateLastName").each(function(){
//   // 	$(this).val('');
//   // });
//   $(".regUpdateLastName").empty();
//   $(".regUpdateFirstName").empty();
//   $(".regUpdateCell").empty();
//   $(".regUpdateEmail").empty();
// });

window.addEventListener("load", function () {
  // 判斷登入人員並顯示於頁面
  let username = sessionStorage.getItem("name");

  let loginName = document.querySelector(".user");
  loginName.innerHTML = `Hi! ${username}`;
});
