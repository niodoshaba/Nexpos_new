

document.getElementById('anaResBtn').addEventListener('click', function () {
  showRow();
})

///秀出日期區間的資料

function showRow() {
  // 清除表格內容
  $(`.table > tr`).not("tr.title").remove();
  //顯示資料庫撈出來的資料
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    console.log(123);
    if (xhr.status == 200) {
      let orderRecordJSON = JSON.parse(xhr.responseText);
      console.log(orderRecordJSON)
      // 測試看看有沒有接收到資料

      let resList = document.querySelector('.resList');
      let str = '';
      for (i = 0; i < orderRecordJSON.length; i++) {
        let resList =
          `
        <tr class="allTr">
          <td >${orderRecordJSON[i].ORDER_DATE}</td>
          <td class="orderNum">${orderRecordJSON[i].ORDER_NO}</td>
          <td >${orderRecordJSON[i].ORDER_NUM}</td>
          <td >${orderRecordJSON[i].ORDER_TTL_PRICE}</td>
        </tr>
        `;
        str += resList;
      }
      resList.innerHTML += str;
    }

    inputToOrder()
    // $('.allTr').click(function () {
    //     console.log( $(':nth-child(2)', $(this)).text() )
    //     $(':nth-child(2)', $(this)).text()
    // })

  }

  xhr.open("POST", "./js/orderRecord.php", true);
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  let resData = "anaStart=" + document.getElementById("anaStart").value + "&anaEnd=" + document.getElementById("anaEnd").value;
  xhr.send(resData);
}

//////點擊顯示當筆訂單

function inputToOrder() {

  $('.allTr').click(function () {
    // console.log( $(':nth-child(2)', $(this)).text() )
    // $(':nth-child(2)', $(this)).text() //找到 點擊那欄的訂單編號

    let thistrNo = $(':nth-child(2)', $(this)).text()
    let kFoodUl = document.getElementsByClassName('kFoodUl')
    let kHead = document.getElementsByClassName('kHead')


    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      console.log(12553);
      if (xhr.status == 200) {
        let orderListRecordJSON = JSON.parse(xhr.responseText);
        var str = "";
        console.log(orderListRecordJSON)

        for (i = 0; i <= orderListRecordJSON.length; i++) {
          if (orderListRecordJSON[i].ORDER_INNOUT == 0) {
            orderListRecordJSON[i].ORDER_INNOUT = "外帶"
          } else {
            orderListRecordJSON[i].ORDER_INNOUT = "內用"
          }
          if (orderListRecordJSON[i].FILLING_ITEM_NAME == null) {
            orderListRecordJSON[i].FILLING_ITEM_NAME = "&nbsp;"
          }

          kHead[0].innerHTML = `
        <div class="kHeadItem">
          <h1>訂單：${orderListRecordJSON[i].ORDER_NO}</h1>
          <span class="kHeadInOrOut">${orderListRecordJSON[i].ORDER_INNOUT}</span>
        </div>
        <div class="kHeadItem">
          <h1>${orderListRecordJSON[i].ORDER_DATE}</h1>

        </div>
        `

          var content =
            `
    <li class="kFoodItem">
        <div class="kFoodTitle">
        <h1>${orderListRecordJSON[i].PRO_ITEM_NAME}</h1>
        <span class="kFoodListFill">${orderListRecordJSON[i].FILLING_ITEM_NAME}</span>
        </div>
        <div class="kFoodNum">x ${orderListRecordJSON[i].ORD_PRO_ITEM_NUM}</div>
    </li>
    `


          console.log(content);
          str += content;

          kFoodUl[0].innerHTML = "";
          kFoodUl[0].innerHTML = `${str}`;

          // console.log(orderListRecordJSON[i].ORDER_INNOUT)
          // console.log(orderListRecordJSON[i])
        }

      }


    }


    xhr.open("POST", "./js/orderRecordList.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("ClickTrNo=" + thistrNo);
  })

}








// 判斷登入人員並顯示於頁面
window.addEventListener("load", function () {
  let username = sessionStorage.getItem('name');

  let loginName = document.querySelector('.user');
  loginName.innerHTML = `Hi! ${username}`;
})
