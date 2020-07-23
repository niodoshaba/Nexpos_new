window.addEventListener("load", function () {
  showRow();

  function showRow() {
    //清除表格內容
    $(`table tr`).not("tr.title").remove();

    //show data from db-start
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        let proAllData = JSON.parse(xhr.responseText);
        // console.log(proAllData);
        let proCata = document.querySelector(".proCata");
        let str = "";

        for (i = 0; i < proAllData.length; i++) {
          let proCata = `<tr>
                            <td>${proAllData[i].PRO_CATA_NO}</td>
                            <td>${proAllData[i].PRO_CATA_NAME}</td>
                            <td class="proCataOnOff">${proAllData[i].PRO_CATA_ONOFF}</td>
                            <td><button type="button" class="btn btn-block btn-warning editBtn update" >編輯</button></td>
                          </tr>`;
          str += proCata;
        }
        proCata.innerHTML += str;
        edit();
      }

      let proCataOnOff = document.querySelectorAll(".proCataOnOff");
      // console.log(proCataOnOff);
      for (i = 0; i < proCataOnOff.length; i++) {
        if (proCataOnOff[i].innerHTML == 0) {
          proCataOnOff[i].innerHTML = "下架";
        } else {
          proCataOnOff[i].innerHTML = "上架";
        }
      }
    };
    xhr.open("get", "./js/proManageShow.php", true);
    xhr.send(null);
  } //show data from db-end

  //按下編輯按鈕更新資料-start
  function edit() {
    $(".editBtn").click(function () {
      //make other editBtn disabled
      // $(".editBtn").not(this).attr("disabled", true);
      $(".editBtn").attr("disabled", true);
      $(".addBtn").attr("disabled", true);
      let tr = $(this).parent().parent(); //找出該tr

      //類別名稱
      let proCataName = tr.find("td:eq(1)").text();
      tr.find("td:eq(1)").text("");
      tr.find("td:eq(1)").append(
        `<input type="text" class="proCataName" value="${proCataName}">`
      );
      //上下架狀態
      let proCataOnOff = tr.find("td:eq(2)").text();
      tr.find("td:eq(2)").text("");
      tr.find("td:eq(2)").append(
        `<select class="proCataOnOff"><option value="1">上架</option><option value="0">下架</option></select>`
      );
      //編輯按鈕
      tr.find("td:eq(3)").text("");
      tr.find("td:eq(3)").append(
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
        let proUpdateData = {};
        proUpdateData.proCataNo = tr.find("td:eq(0)").text();
        proUpdateData.proCataName = tr.find(".proCataName").val();
        proUpdateData.proCataOnOff = tr.find(".proCataOnOff :selected").val();

        //設定文件格式
        xhr.open("post", "./js/proManageUpdate.php", true);
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded"
        );
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(proUpdateData);
        let dataUpdate = `proUpdateData=${strUpdate}`;
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
});
