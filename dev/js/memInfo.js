window.addEventListener("load", function () {
  showRow();

  function showRow() {
    // 清除表格內容
    $(`table tr`).not("tr.title").remove();
    //顯示資料庫撈出來的資料
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        let empIdPsw = JSON.parse(xhr.responseText);
        // console.log(idPswPhp); 測試看看有沒有接收到資料

        let idPsw = document.querySelector(".idPsw");
        let str = "";
        // for (i = 0; i < empIdPsw.length; i++) {
        //   let idPsw = `<tr>
        //           <td>${empIdPsw[i].CUS_LAST}</td>
        //           <td>${empIdPsw[i].CUS_FIRST}</td>
        //           <td>${empIdPsw[i].CUS_GEN}</td>
        //           <td>${empIdPsw[i].CUS_BIRTH}</td>
        //           <td>${empIdPsw[i].CUS_PHONE}</td>
        //           <td>${empIdPsw[i].CUS_EMAIL}</td>
        //           <td>${empIdPsw[i].CUS_POINT}</td>
        //           <td class="memId">${empIdPsw[i].CUS_ID}</td>
        //           <td class="memStatus">${empIdPsw[i].CUS_STATE}</td>
        //           <td><button class="btn btn-block btn-warning edit update" type="button" style="width: 72px;margin: 0 auto;">編輯</button></td>
        //         </tr>`;
        //   str += idPsw;
        // }
        for (i = 0; i < empIdPsw.length; i++) {
          let idPsw = `<tr>
                  <td>${empIdPsw[i].CUS_LAST}</td>
                  <td>${empIdPsw[i].CUS_FIRST}</td>
                  <td>${empIdPsw[i].CUS_GEN}</td>
                  <td>${empIdPsw[i].CUS_BIRTH}</td>
                  <td>${empIdPsw[i].CUS_PHONE}</td>
                  <td>${empIdPsw[i].CUS_EMAIL}</td>
                  <td>${empIdPsw[i].CUS_POINT}</td>
                  <td class="memStatus">${empIdPsw[i].CUS_STATE}</td>
                  <td><button class="btn btn-block btn-warning edit update" type="button" style="width: 72px;margin: 0 auto;">編輯</button></td>
                </tr>`;
          str += idPsw;
        }
        idPsw.innerHTML += str;
        edit();
      }
      let memId = document.querySelectorAll(".memId");

      // console.log(status);
      // for (i = 0; i < memId.length; i++) {
      //   if (memId[i].innerHTML == 1) {
      //     memId[i].innerHTML = "會員";
      //   } else {
      //     memId[i].innerHTML = "非會員";
      //   }
      // }
      let memStatus = document.querySelectorAll(".memStatus");

      for (i = 0; i < memStatus.length; i++) {
        if (memStatus[i].innerHTML == 1) {
          memStatus[i].innerHTML = "正常";
        } else {
          memStatus[i].innerHTML = "黑名單";
        }
      }
    };
    xhr.open("get", "./js/memInfoShow.php", true);
    xhr.send(null);
  }
  //顯示資料

  //按下新增鈕出現input表單欄位
  $(".addBtn").click(function () {
    //disabled新增鈕
    $(".addBtn").attr("disabled", true);
    //顯示input表單欄位
    // $(".title").after(`
    //     <tr class="input">
    //         <td><input name="CUS_LAST" class="CUS_LAST" type="text" size="3"></td>
    //         <td><input name="CUS_FIRST" class="CUS_FIRST" type="text" size="5"></td>
    //         <td><select name="CUS_GEN" class="CUS_GEN"><option>男</option><option>女</option></select></td>
    //         <td><input name="CUS_BIRTH" class="CUS_BIRTH" type="date" size="3"></td>
    //         <td><input name="CUS_PHONE" class="CUS_PHONE" type="text" size="10"></td>
    //         <td><input name="CUS_EMAIL" class="CUS_EMAIL" type="text" size="20"></td>
    //         <td><input name="CUS_POINT" class="CUS_POINT" type="text" size="4"></td>
    //         <td><select name="CUS_ID" class="CUS_ID" type="text"><option value="1">會員</option><option value="0">非會員</option></select></td>
    //         <td><select name="CUS_STATE" class="CUS_STATE"><option value="1">正常</option><option value="0">黑名單</option></select></td>
    //         <td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td>
    //     </tr>
    //   `);
    $(".title").after(`
        <tr class="input">
            <td><input name="CUS_LAST" class="CUS_LAST" type="text" size="8"></td>
            <td><input name="CUS_FIRST" class="CUS_FIRST" type="text" size="10"></td>
            <td><select name="CUS_GEN" class="CUS_GEN"><option>男</option><option>女</option></select></td>
            <td><input name="CUS_BIRTH" class="CUS_BIRTH" type="date" size="10"></td>
            <td><input name="CUS_PHONE" class="CUS_PHONE" type="text" size="10"></td>
            <td><input name="CUS_EMAIL" class="CUS_EMAIL" type="text" size="20"></td>
            <td><input name="CUS_POINT" class="CUS_POINT" type="text" size="4"></td>
            <td><select name="CUS_STATE" class="CUS_STATE"><option value="1">正常</option><option value="0">黑名單</option></select></td>
            <td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td>
        </tr>
      `);

    //按下儲存
    $(".save").click(function () {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          $("tr.input").remove();
          showRow();
        } else {
          alert(xhr.status);
        }
      };
      // 將輸入的值存成物件形式
      let idPswInputData = {};
      idPswInputData.CUS_LAST = $(".CUS_LAST").val();
      idPswInputData.CUS_FIRST = $(".CUS_FIRST").val();
      idPswInputData.CUS_GEN = $(".CUS_GEN").val();
      idPswInputData.CUS_BIRTH = $(".CUS_BIRTH").val();
      idPswInputData.CUS_PHONE = $(".CUS_PHONE").val();
      idPswInputData.CUS_EMAIL = $(".CUS_EMAIL").val();
      idPswInputData.CUS_POINT = $(".CUS_POINT").val();
      // idPswInputData.CUS_ID = $(".CUS_ID").val();
      idPswInputData.CUS_STATE = $(".CUS_STATE").val();
      console.log(idPswInputData);

      //設定文件格式
      xhr.open("post", "./js/memInfoInsert.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //將要傳送的物件資料轉為字串型別
      let str = JSON.stringify(idPswInputData);
      let data = `idPswInputData=${str}`;
      // console.log(data);
      xhr.send(data);
    });

    // 取消新增
    $(".cancel").click(function () {
      $(".input").remove();
      $(".addbtn").removeAttr("disabled");
    });
  });
  //按下新增鈕出現input表單欄位

  //按下編輯鈕更新資料
  function edit() {
    $(".edit").click(function () {
      //  alert('haha');

      $(".edit").attr("disabled", true); //disabled其他編輯鈕
      let tr = $(this).parent().parent(); //找到當下那層tr

      //姓氏
      let CUS_LAST = tr.find("td:eq(0)").text();
      tr.find("td:eq(0)").text("");
      tr.find("td:eq(0)").append(
        `<input class="CUS_LAST" value="${CUS_LAST}" type="text" size="8">`
      );
      // 名稱
      let CUS_FIRST = tr.find("td:eq(1)").text();
      tr.find("td:eq(1)").text("");
      tr.find("td:eq(1)").append(
        `<input class="CUS_FIRST" value="${CUS_FIRST}" type="text" size="10">`
      );
      //性別
      let CUS_GEN = tr.find("td:eq(2)").text();
      tr.find("td:eq(2)").text("");
      tr.find("td:eq(2)").append(
        `<select class="CUS_GEN"><option>男</option><option>女</option></select>`
      );
      // 生日
      let CUS_BIRTH = tr.find("td:eq(3)").text();
      tr.find("td:eq(3)").text("");
      tr.find("td:eq(3)").append(
        `<input class="CUS_BIRTH" value="${CUS_BIRTH}" type="date" size="3">`
      );
      // 手機
      let CUS_PHONE = tr.find("td:eq(4)").text();
      tr.find("td:eq(4)").text("");
      tr.find("td:eq(4)").append(
        `<input class="CUS_PHONE" value="${CUS_PHONE}" type="text" size="10">`
      );
      // EMAIL
      let CUS_EMAIL = tr.find("td:eq(5)").text();
      tr.find("td:eq(5)").text("");
      tr.find("td:eq(5)").append(
        `<input class="CUS_EMAIL" value="${CUS_EMAIL}" type="text" size="20">`
      );
      // 點數
      let CUS_POINT = tr.find("td:eq(6)").text();
      tr.find("td:eq(6)").text("");
      tr.find("td:eq(6)").append(
        `<input class="CUS_POINT" value="${CUS_POINT}" type="text" size="4">`
      );
      //ID身份
      // let CUS_ID = tr.find("td:eq(7)").text();
      // tr.find("td:eq(7)").text("");
      // tr.find("td:eq(7)").append(
      //   `<select class="CUS_ID"><option value="1">會員</option><option value="0">非會員</option></select>`
      // );
      //狀態
      let CUS_STATE = tr.find("td:eq(7)").text();
      tr.find("td:eq(7)").text("");
      tr.find("td:eq(7)").append(
        `<select class="CUS_STATE"><option value="1">正常</option><option value="0">黑名單</option></select>`
      );
      // 編輯
      tr.find("td:eq(8)").text("");
      tr.find("td:eq(8)").append(
        `<button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button>`
      );

      //儲存
      $(".save").click(function () {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status == 200) {
            showRow();
          } else {
            alert(xhr.status);
          }
        };
        let idPswUpdateData = {};
        idPswUpdateData.CUS_LAST = tr.find(".CUS_LAST").val();
        idPswUpdateData.CUS_FIRST = tr.find(".CUS_FIRST").val();
        idPswUpdateData.CUS_GEN = tr.find(".CUS_GEN").val();
        idPswUpdateData.CUS_BIRTH = tr.find(".CUS_BIRTH").val();
        idPswUpdateData.CUS_PHONE = tr.find(".CUS_PHONE").val();
        idPswUpdateData.CUS_EMAIL = tr.find(".CUS_EMAIL").val();
        idPswUpdateData.CUS_POINT = tr.find(".CUS_POINT").val();
       
        idPswUpdateData.CUS_STATE = tr.find(".CUS_STATE").val();

        // console.log(idPswUpdateData); //確認按下編輯時有抓到資料

        // 設定文件格式
        xhr.open("post", "./js/memInfoUpdate.php", true);
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded"
        );
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(idPswUpdateData);
        let dataUpdate = `idPswUpdateData=${strUpdate}`;
        console.log(dataUpdate);
        xhr.send(dataUpdate);
      });

      // 按下取消鈕
      $(".cancel").click(function () {
        showRow();
      });
    });
  }
  //按下編輯鈕更新資料
});
//判斷登入若為店長則只可瀏覽前三行
window.addEventListener("load", function () {
  let usertitle = sessionStorage.getItem("title");

  if (usertitle == "店長") {
    $("li").slice(3, 8).css("visibility", "hidden");
  }
});
