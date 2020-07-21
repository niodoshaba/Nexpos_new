window.addEventListener("load", function () {
  showRow();

  function showRow() {
    //清除表格內容
    $(`table tr`).not("tr.title").remove();

    //show data from db-start
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        let fillingAllCata = JSON.parse(xhr.responseText);
        // console.log(fillingAllItem);
        let fillingCata = document.querySelector(".fillingCata");
        let str = "";

        for (i = 0; i < fillingAllCata.length; i++) {
          let fillingCata = `<tr>
                        <td>${fillingAllCata[i].FILLING_CATA_NO}</td>
                        <td>${fillingAllCata[i].FILLING_CATA_NAME}</td>
                        <td class="fillingCataOnOff">${fillingAllCata[i].FILLING_CATA_ONOFF}</td>
                        <td><button type="button" class="btn btn-block btn-warning editBtn update">編輯</button>
                        </td>
                      </tr>`;
          str += fillingCata;
        }
        fillingCata.innerHTML += str;
        edit();
      }

      let fillingCataOnOff = document.querySelectorAll(".fillingCataOnOff");
      // console.log(fillingCataOnOff);
      for (i = 0; i < fillingCataOnOff.length; i++) {
        if (fillingCataOnOff[i].innerHTML == 0) {
          fillingCataOnOff[i].innerHTML = "下架";
        } else {
          fillingCataOnOff[i].innerHTML = "上架";
        }
      }
    };
    xhr.open("get", "../dev/js/fillingCataShow.php", true);
    xhr.send(null);
  } //show data from db-end

  //按下編輯按鈕更新資料-start
  function edit() {
    $(".editBtn").click(function () {
      //make other editBtn disabled
      $(".editBtn").attr("disabled", true);
      $(".addBtn").attr("disabled", true);
      let tr = $(this).parent().parent(); //找出該tr

      //類別名稱
      let fillingCataName = tr.find("td:eq(1)").text();
      tr.find("td:eq(1)").text("");
      tr.find("td:eq(1)").append(
        `<input type="text" class="fillingCataName" value="${fillingCataName}">`
      );
      //上下架狀態
      let fillingCataOnOff = tr.find("td:eq(2)").text();
      tr.find("td:eq(2)").text("");
      tr.find("td:eq(2)").append(
        `<select class="fillingCataOnOff"><option value="1">上架</option><option value="0">下架</option></select>`
      );
      //編輯按鈕
      tr.find("td:eq(3)").text("");
      tr.find("td:eq(3)").append(
        `<button type="submit" class="btn btn-block btn-warning save">確認</button>
           <button type="button" class="btn btn-block btn-warning cancel">取消</button>`
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
        let fillingUpdateData = {};
        fillingUpdateData.fillingCataNo = tr.find("td:eq(0)").text();
        fillingUpdateData.fillingCataName = tr.find(".fillingCataName").val();
        fillingUpdateData.fillingCataOnOff = tr
          .find(".fillingCataOnOff :selected")
          .val();

        //設定文件格式
        xhr.open("post", "../dev/js/fillingCataUpdate.php", true);
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded"
        );
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(fillingUpdateData);
        let dataUpdate = `fillingUpdateData=${strUpdate}`;
        console.log(dataUpdate);
        xhr.send(dataUpdate);
      });

      //按下取消按紐
      $(".cancel").click(function () {
        $(".addBtn").removeAttr("disabled");
        showRow();
      });
    });
  }
  //按下編輯按鈕更新資料-end
});
