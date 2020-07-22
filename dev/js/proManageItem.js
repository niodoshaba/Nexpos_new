window.addEventListener("load", function () {
  showRow();

  function showRow() {
    //清除表格內容
    $(`table tr`).not("tr.title").remove();

    //show data from db-start
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        let proManageItemAllData = JSON.parse(xhr.responseText);
        // console.log(proManageItemAllData);
        let proManageItem = document.querySelector(".proManageItem");
        let str = "";

        for (i = 0; i < proManageItemAllData.length; i++) {
          let proManageItem = `<tr>
                        <td>${proManageItemAllData[i].PRO_ITEM_NO}</td>
                        <td>${proManageItemAllData[i].PRO_CATA_NAME}</td>
                        <td>${proManageItemAllData[i].PRO_ITEM_NAME}</td>
                        <td>${proManageItemAllData[i].PRO_ITEM_PRICE}</td>
                        <td class="proItemOnOff">${proManageItemAllData[i].PRO_ITEM_ONOFF}</td>
                        <td><button type="button" class="btn btn-block btn-warning editBtn update">編輯</button>
                        </td>
                        </tr>`;
          str += proManageItem;
        }
        proManageItem.innerHTML += str;
        edit();
      }

      let proItemOnOff = document.querySelectorAll(".proItemOnOff");
      // console.log(proItemOnOff);
      for (i = 0; i < proItemOnOff.length; i++) {
        if (proItemOnOff[i].innerHTML == 0) {
          proItemOnOff[i].innerHTML = "下架";
        } else {
          proItemOnOff[i].innerHTML = "上架";
        }
      }
    };
    xhr.open("get", "./js/proManageItemShow.php", true);
    xhr.send(null);
  } //show data from db-end

  //按下addBtn出現input表單欄位-start
  $(".addBtn").click(function () {
    //make addBtn disabled
    $(".addBtn").attr("disabled", true);
    $(".editBtn").attr("disabled", true);
    //顯示input表單欄位
    $(".title").after(` <tr class="input">
                          <td></td>
                          <td><select name="proCataNo" class="proCataNo"><option value="1">三明治</option><option value="2">義大利麵</option><option value="3">漢堡</option><option value="4">馬芬堡</option><option value="5">甜點</option><option value="6">咖啡</option><option value="7">飲料</option></select></td>
                          <td><input style="width:180px;" name="proItemName" class="proItemName" type="text"></td>
                          <td><input style="width:180px;" name="proItemPrice" class="proItemPrice" type="text"></td>
                          <td><select name="proItemOnoff" class="proItemOnoff"><option value="1">上架</option><option value="0">下架</option></select></td>
                          <td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td>
                          </tr>`);
    //按下儲存
    $(".save").click(function () {
      $(".addBtn").removeAttr("disabled");
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
      let proManageItemInputData = {};
      proManageItemInputData.proCataNo = $(".proCataNo").val();
      proManageItemInputData.proItemName = $(".proCataName").val();
      proManageItemInputData.proItemName = $(".proItemName").val();
      proManageItemInputData.proItemPrice = $(".proItemPrice").val();
      proManageItemInputData.proItemOnOff = $(".proItemOnOff").val();
      console.log(proManageItemInputData);

      //設定文件格式
      xhr.open("post", "./js/proManageItemToDb.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //把要傳送的物件資料轉為字串型別;
      let str = JSON.stringify(proManageItemInputData);
      let data = `proManageItemInputData=${str}`;
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

      //品項名稱
      let proItemName = tr.find("td:eq(2)").text();
      tr.find("td:eq(2)").text("");
      tr.find("td:eq(2)").append(
        `<input type="text" class="proItemName" value="${proItemName}">`
      );

      //價格
      let proItemPrice = tr.find("td:eq(3)").text();
      tr.find("td:eq(3)").text("");
      tr.find("td:eq(3)").append(
        `<input type="text" class="proItemPrice" value="${proItemPrice}">`
      );

      //上下架狀態
      let proItemOnOff = tr.find("td:eq(4)").text();
      tr.find("td:eq(4)").text("");
      tr.find("td:eq(4)").append(
        `<select class="proItemOnOff"><option value="1">上架</option><option value="0">下架</option></select>`
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
            // console.log(xhr.responseText);
          } else {
            alert(xhr.status);
          }
        };
        let proItemUpdateData = {};
        proItemUpdateData.proItemNo = tr.find("td:eq(0)").text();
        proItemUpdateData.proCataName = tr.find("td:eq(1)").text();
        proItemUpdateData.proItemName = tr.find(".proItemName").val();
        proItemUpdateData.proItemPrice = tr.find(".proItemPrice").val();
        proItemUpdateData.proItemOnOff = tr
          .find(".proItemOnOff :selected")
          .val();

        //設定文件格式
        xhr.open("post", "./js/proManageItemUpdate.php", true);
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded"
        );
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(proItemUpdateData);
        let dataUpdate = `proItemUpdateData=${strUpdate}`;
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
  } //按下編輯按鈕更新資料-end
});
