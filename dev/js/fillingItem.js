window.addEventListener("load", function () {
  showRow();

  function showRow() {
    //清除表格內容
    $(`table tr`).not("tr.title").remove();

    //show data from db-start
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (xhr.status == 200) {
        let fillingAllItem = JSON.parse(xhr.responseText);
        // console.log(fillingAllItem);
        let fillingItem = document.querySelector(".fillingItem");
        let str = "";

        for (i = 0; i < fillingAllItem.length; i++) {
          let fillingItem = `<tr>
                        <td>${fillingAllItem[i].FILLING_ITEM_NO}</td>
                        <td>${fillingAllItem[i].FILLING_CATA_NAME}</td>
                        <td>${fillingAllItem[i].FILLING_ITEM_NAME}</td>
                        <td>${fillingAllItem[i].FILLING_ITEM_PRICE}</td>
                        <td class="fillingItemOnOff">${fillingAllItem[i].FILLING_ITEM_ONOFF}</td>
                        <td><button type="button" class="btn btn-block btn-warning editBtn update" >編輯</button>
                        </td>
                      </tr>`;
          str += fillingItem;
        }
        fillingItem.innerHTML += str;
        edit();
      }

      let fillingItemOnOff = document.querySelectorAll(".fillingItemOnOff");
      // console.log(fillingItemOnOff);
      for (i = 0; i < fillingItemOnOff.length; i++) {
        if (fillingItemOnOff[i].innerHTML == 0) {
          fillingItemOnOff[i].innerHTML = "下架";
        } else {
          fillingItemOnOff[i].innerHTML = "上架";
        }
      }
    };
    xhr.open("get", "./js/fillingItemShow.php", true);
    xhr.send(null);
  } //show data from db-end

  //按下addBtn出現input表單欄位-start
  $(".addBtn").click(function () {
    //make addBtn disabled
    $(".addBtn").attr("disabled", true);
    $(".editBtn").attr("disabled", true);
    //顯示input表單欄位
    $(".title").after(`<tr class="input">
                        <td></td>
                        <td><select name="fillingCataNo" class="fillingCataNo"><option value="1">糖度</option><option value="2">冰塊</option><option value="3">配料</option><<option value="4">調味</option>/select></td>
                        <td><input style="width:180px;" name="fillingItemName" class="fillingItemName" type="text"></td>
                        <td><input style="width:180px;" name="fillingItemPrice" class="fillingItemPrice" type="text"></td>
                        <td><select name="fillingItemOnOff" class="fillingItemOnOff"><option value="1">上架</option><option value="0">下架</option></select></td>
                        <td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td>
                        </tr>`);

    //按下儲存
    $(".save").click(function () {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          $("tr.input").remove();
          $(".addBtn").removeAttr("disabled");
          showRow();
        } else {
          alert(xhr.status);
        }
      };
      //把輸入的值存成物件
      let fillingItemInputData = {};
      fillingItemInputData.fillingCataNo = $(".fillingCataNo").val();
      fillingItemInputData.fillingItemName = $(".fillingItemName").val();
      fillingItemInputData.fillingItemPrice = $(".fillingItemPrice").val();
      fillingItemInputData.fillingItemOnOff = $(".fillingItemOnOff").val();
      console.log(fillingItemInputData);

      //設定文件格式
      xhr.open("post", "./js/fillingItemToDb.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //把要傳送的物件資料轉為字串型別
      let str = JSON.stringify(fillingItemInputData);
      let data = `fillingItemInputData=${str}`;
      // console.log(data);
      xhr.send(data);
      alert("送出成功");
    });
    // 取消新增
    $(".cancel").click(function () {
      $(".input").remove();
      $(".addBtn").removeAttr("disabled");
      $(".editBtn").removeAttr("disabled");
    });
  }); //按下addBtn出現input表單欄位-end

  //按下編輯按鈕更新資料-start
  function edit() {
    $(".editBtn").click(function () {
      //make other editBtn disabled
      $(".editBtn").attr("disabled", true);
      $(".addBtn").attr("disabled", true);
      let tr = $(this).parent().parent(); //找出該tr

      //名稱
      let fillingItemName = tr.find("td:eq(2)").text();
      tr.find("td:eq(2)").text("");
      tr.find("td:eq(2)").append(
        `<input type="text" class="fillingItemName" value="${fillingItemName}">`
      );

      //價格
      let fillingItemPrice = tr.find("td:eq(3)").text();
      tr.find("td:eq(3)").text("");
      tr.find("td:eq(3)").append(
        `<input type="text" class="fillingItemPrice" value="${fillingItemPrice}">`
      );

      //上下架狀態
      let fillingItemOnOff = tr.find("td:eq(4)").text();
      tr.find("td:eq(4)").text("");
      tr.find("td:eq(4)").append(
        `<select class="fillingItemOnOff"><option value="1">上架</option><option value="0">下架</option></select>`
      );
      //編輯按鈕
      tr.find("td:eq(5)").text("");
      tr.find("td:eq(5)").append(
        `<button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button>`
      );

      //儲存
      $(".save").click(function () {
        $(".addBtn").removeAttr("disabled");
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status == 200) {
            showRow();
          } else {
            alert(xhr.status);
          }
        };
        let fillingItemUpdateData = {};
        fillingItemUpdateData.fillingItemNo = tr.find("td:eq(0)").text();
        fillingItemUpdateData.fillingCataName = tr.find("td:eq(1)").text();
        fillingItemUpdateData.fillingItemName = tr
          .find(".fillingItemName")
          .val();
        fillingItemUpdateData.fillingItemPrice = tr
          .find(".fillingItemPrice")
          .val();
        fillingItemUpdateData.fillingItemOnOff = tr
          .find(".fillingItemOnOff :selected")
          .val();

        //設定文件格式
        xhr.open("post", "./js/fillingItemUpdate.php", true);
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded"
        );
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(fillingItemUpdateData);
        let dataUpdate = `fillingItemUpdateData=${strUpdate}`;
        // console.log(dataUpdate);
        xhr.send(dataUpdate);
        alert("送出成功");
      });

      //按下取消按紐
      $(".cancel").click(function () {
        $(".addBtn").removeAttr("disabled");
        showRow();
      });
    });
  }
  //按下編輯按鈕更新資料-end

  
    //判斷登入若為店長則只可瀏覽前三行
    let usertitle = sessionStorage.getItem("title");

    if (usertitle == "店長") {
      $("li").slice(3, 8).css("visibility", "hidden");
    }
});
