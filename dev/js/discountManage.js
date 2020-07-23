window.addEventListener("load", function () {
  showRowAllDis();

  function showRowAllDis() {
    //清除表格內容
    $("table tr").not("tr.title").remove();

    //顯示資料
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        let allDisItem = JSON.parse(xhr.responseText);
        // console.log(allDisItem);
        let allItem = document.querySelector(".allItem");
        let str = "";
        for (i = 0; i < allDisItem.length; i++) {
          let allItem = `<tr>
                <td>${allDisItem[i].DIS_NO}</td>
                <td>${allDisItem[i].DIS_NAME}</td>
                <td>${allDisItem[i].DIS_START}</td>
                <td>${allDisItem[i].DIS_END}</td>
                <td>全館品項</td>
                <td id="dis_pctall">${allDisItem[i].DIS_PCTALL * 10} 折</td>
                <td><button class="btn btn-block btn-warning edit" type="button" style="width: 72px; margin: 0 auto;">編輯</button></td>
              </tr>`;
          str += allItem;
        }
        allItem.innerHTML += str;
        edit();
      }
    };
    xhr.open("get", "./js/discountManageShow.php", true);
    xhr.send(null);
  }
  //顯示資料

  //按下新增鈕出現input表單欄位
  $(".addBtn").click(function () {
    $(".addBtn").attr("disabled", true); //disabled新增鈕
    $(".edit").attr("disabled", true); //disabled編輯鈕
    //顯示input表單欄位
    $(".title").after(`
      <tr class="input">
        <td></td>
        <td><input class="allDisName" type="text" size="15"></td>
        <td><input class="allDisStart" type="date"><t/d>
        <td><input class="allDisEnd" style="width:180px;" type="date"></td>
        <td class="allDisCata">全館折扣</td>
        <td><input class="allDiscount" type="text" size="3">折</td>
        <td><button class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td>
      </tr>
    `);
    //按下儲存
    $(".save").click(function () {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          $("tr.input").remove();
          showRowAllDis();
          $(".addBtn").removeAttr("disabled"); //恢復新增按鈕
          alert("儲存成功");
        } else {
          // alert(xhr.status);
        }
      };
      // 將輸入的值存成物件形式
      let allDisInputData = {};
      allDisInputData.allDisName = $(".allDisName").val();
      allDisInputData.allDisStart = $(".allDisStart").val();
      allDisInputData.allDisEnd = $(".allDisEnd").val();
      allDisInputData.allDiscount = $(".allDiscount").val();
      // console.log(allDisInputData);

      //設定文件格式
      xhr.open("post", "./js/discountManageInsert.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //將要傳送的物件資料轉為字串型別
      let str = JSON.stringify(allDisInputData);
      let data = `allDisInputData=${str}`;
      // console.log(data);
      xhr.send(data);
    });
    // 取消新增
    $(".cancel").click(function () {
      $(".input").remove();
      $(".addBtn").removeAttr("disabled"); //恢復新增按鈕
      $(".edit").removeAttr("disabled"); //恢復編輯按鈕
    });
  });
  //按下新增鈕出現input表單欄位

  //按下編輯鈕更新資料
  function edit() {
    $(".edit").click(function () {
      $(".addBtn").attr("disabled", true); //disabled新增鈕
      $(".edit").attr("disabled", true); //disabled其他編輯鈕

      let tr = $(this).parent().parent(); //找到當下那層tr

      // 名稱
      let allDisName = tr.find("td:eq(1)").text();
      tr.find("td:eq(1)").text("");
      tr.find("td:eq(1)").append(
        `<input class="allDisName" value="${allDisName}" type="text" size="15">`
      );
      // 期間(起)
      let allDisStart = tr.find("td:eq(2)");
      tr.find("td:eq(2)").text("");
      tr.find("td:eq(2)").append(`<input class="allDisStart" type="date">`);
      // 期間(迄)
      let allDisEnd = tr.find("td:eq(3)");
      tr.find("td:eq(3)").text("");
      tr.find("td:eq(3)").append(
        `<input class="allDisEnd" style="width:180px;" type="date">`
      );
      //折扣
      let allDiscount = tr.find("td:eq(5)").text();
      tr.find("td:eq(5)").text("");
      tr.find("td:eq(5)").append(
        `<input class="allDiscount" value="${allDiscount}" type="text" size="5">`
      );
      //編輯
      tr.find("td:eq(6)").text("");
      tr.find("td:eq(6)").append(
        `<button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button>`
      );

      //儲存
      $(".save").click(function () {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status == 200) {
            showRowAllDis();
            $(".addBtn").removeAttr("disabled"); //恢復新增按鈕
            alert("儲存成功");
          } else {
            // alert(xhr.status);
          }
        };
        let allDisUpdateData = {};
        allDisUpdateData.allDisNo = tr.find('td:eq(0)').text();
        allDisUpdateData.allDisName = $(".allDisName").val();
        allDisUpdateData.allDisStart = $(".allDisStart").val();
        allDisUpdateData.allDisEnd = $(".allDisEnd").val();
        allDisUpdateData.allDiscount = $(".allDiscount").val();
        console.log(allDisUpdateData);

        // 設定文件格式
        xhr.open("post", "./js/discountManageUpdate.php", true);
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded"
        );
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(allDisUpdateData);
        let dataUpdate = `allDisUpdateData=${strUpdate}`;
        // console.log(dataUpdate);
        xhr.send(dataUpdate);
      });
      // 按下取消鈕
      $(".cancel").click(function () {
        showRowAllDis();
        $(".addBtn").removeAttr("disabled"); //恢復新增按鈕
      });
    });
  }
  //按下編輯鈕更新資料
});
