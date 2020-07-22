// 訂單資訊
window.addEventListener('load', function () {
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status = 200) {
      var DailyData = JSON.parse(xhr.responseText);
      // console.log(DailyData);
      var table = document.querySelector('.table');

      var len = DailyData.length;
      var str = '';
      for (i = 0; i < len; i++) {
        var DailyOrder = ` <tr>
                                <td>${DailyData[i].OrderNo}</td>
                                <td>${DailyData[i].OrderDate}</td>
                                <td class="INOUT">${DailyData[i].InNOut}</td>
                                <td>${DailyData[i].PayMethod}</td>
                                <td>${DailyData[i].Price}</td>
                              </tr>`
        str += DailyOrder;
        // console.log(str);
      };
      table.innerHTML += str;

      //狀態0顯示內用 狀態1顯示外帶
      let INOUT = document.querySelectorAll('.INOUT');
      for (i = 0; i < INOUT.length; i++) {
        if (INOUT[i].innerHTML == 1) {
          INOUT[i].innerHTML = '外帶';
        } else if (INOUT[i].innerHTML == 0) {
          INOUT[i].innerHTML = '內用';
        }
      }

    }
  }
  xhr.open("get", "./js/dailyStatement.php", true);
  xhr.send(null);
})
// 總營業額 
window.addEventListener('load', function () {
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status = 200) {
      var dailyTotal = JSON.parse(xhr.responseText);
      // console.log(dailyTotal);
      var totalPrice = document.querySelectorAll('.totalPrice');
      totalPrice[0].innerHTML = `總營業額：${dailyTotal[0].TotalPrice}`;
      totalPrice[1].innerHTML = `總營業額：${dailyTotal[0].TotalPrice}`;
    }
  }
  xhr.open("get", "./js/dailyTotal.php", true);
  xhr.send(null);
})

// 現金總額 
window.addEventListener('load', function () {
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status = 200) {
      var dailyCash = JSON.parse(xhr.responseText);
      // console.log(dailyCash);
      var cash = document.querySelectorAll('.cash');
      cash[0].innerHTML = `現金：${dailyCash[0].Price}`;
      cash[1].innerHTML = `現金：${dailyCash[0].Price}`;
    }
  }
  xhr.open("get", "./js/dailyCash.php", true);
  xhr.send(null);
})
// 信用卡總額 
window.addEventListener('load', function () {
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status = 200) {
      var dailyCard = JSON.parse(xhr.responseText);
      // console.log(dailyCard);
      var card = document.querySelectorAll('.creditCard');
      card[0].innerHTML = `信用卡：${dailyCard[0].Price}`;
      card[1].innerHTML = `信用卡：${dailyCard[0].Price}`;
    }
  }
  xhr.open("get", "./js/dailyCard.php", true);
  xhr.send(null);
})

// 電子支付總額 
window.addEventListener('load', function () {
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status = 200) {
      var dailyElectro = JSON.parse(xhr.responseText);
      // console.log(dailyElectro);
      var electro = document.querySelectorAll('.electro');
      electro[0].innerHTML = `電子支付：${dailyElectro[0].Price}`;
      electro[1].innerHTML = `電子支付：${dailyElectro[0].Price}`;
    }
  }
  xhr.open("get", "./js/dailyElectro.php", true);
  xhr.send(null);
})

// 判斷登入人員並顯示於頁面
window.addEventListener("load", function () {
  let username = sessionStorage.getItem('name');

  let loginName = document.querySelector('.user');
  loginName.innerHTML = `Hi! ${username}`;
})
