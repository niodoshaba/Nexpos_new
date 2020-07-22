window.addEventListener('load', function () {
  showRow();

  function showRow() {
    // 清除表格內容
    $(`table tr`).not("tr.title").remove();

    //顯示資料庫撈出來的資料
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        let SelectArr = JSON.parse(xhr.responseText);
        console.log(SelectArr);
        // 測試看看有沒有接收到資料

        let tabStaClass = document.querySelector('.tabStaClass');
        let str = '';
        for (i = 0; i < SelectArr.length; i++) {
          let tabStaClass =
            `<tr>
                  <td>${SelectArr[i].TAB_STAT_NO}</td>
                  <td>${SelectArr[i].TAB_NAME}</td>
                  <td><input class="tabStaType" type="color" size="5" value="${SelectArr[i].TAB_SHOW}" disabled="ture"></td>
                  <td><button class="btn btn-block btn-warning edit update" type="button" style="width: 72px;margin: 0 auto;">編輯</button></td>
                </tr>`;
          str += tabStaClass;
        }
        tabStaClass.innerHTML += str;
        edit();
      }

    }
    xhr.open("get", "./js/loadTabStatusColor.php", true);
    xhr.send(null);
  }
  //顯示資料

  //按下新增鈕出現input表單欄位
  $('.addbtn').click(function () {

    $('.addbtn').attr('disabled', true);//disabled新增鈕
    $('.edit').attr('disabled', true);//disabled編輯鈕
    //顯示input表單欄位
    $('.title').after(`
        <tr class="input">
          <td></td>
          <td><input class="tabStaName" type="text" size="10"></td>
          <td><input class="tabStaType" type="color" size="5"></td>

          <td><button class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td>
        </tr>
      `);

    //按下儲存
    $('.save').click(function () {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          $('tr.input').remove();
          showRow();
          $('.addbtn').removeAttr('disabled');//恢復新增按鈕
        }
        else {
          // alert(xhr.status);
        }
      };
      // 將輸入的值存成物件形式
      let tabStaInputData = {};
      tabStaInputData.tabStaType = $('.tabStaType').val();
      tabStaInputData.tabStaName = $('.tabStaName').val();

      // console.log(idPswInputData);

      //設定文件格式
      xhr.open("post", "./js/InsertTabStatusColor.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //將要傳送的物件資料轉為字串型別
      let str = JSON.stringify(tabStaInputData);
      let data = `tabStaInputData=${str}`;
      // console.log(data);
      xhr.send(data);
    });

    // 取消新增
    $('.cancel').click(function () {
      $('.input').remove();
      $('.addbtn').removeAttr('disabled');//恢復新增按鈕
      $('.edit').removeAttr('disabled');//恢復編輯按鈕
    });

  })
  //按下新增鈕出現input表單欄位

  //按下編輯鈕更新資料
  function edit() {
    $('.edit').click(function () {
      // alert('haha');
      $('.addbtn').attr('disabled', true)//disabled新增鈕
      $('.edit').attr('disabled', true); //disabled其他編輯鈕

      let tr = $(this).parent().parent(); //找到當下那層tr

      //職位
      let tabStaName = tr.find('td:eq(1)').text();
      tr.find('td:eq(1)').text("");
      tr.find('td:eq(1)').append(`<input class="tabStaName" value="${tabStaName}" type="text" size="10">`);
      // 名稱
      let tabStaType = tr.find('td:eq(2)').text();
      tr.find('td:eq(2)').text("");
      tr.find('td:eq(2)').append(`<input class="tabStaType" value="${tabStaType}" type="color" size="15">`);
      // 手機

      tr.find('td:eq(3)').text("");
      tr.find('td:eq(3)').append(`<button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button>`);
      // 密碼


      // 儲存
      $('.save').click(function () {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status == 200) {
            showRow();
            $('.addbtn').removeAttr('disabled');//恢復新增按鈕
          } else {
            // alert(xhr.status);
          }
        }
        let tabStaInputData = {};

        tabStaInputData.tabStaNo = tr.find('td:eq(0)').text();
        tabStaInputData.tabStaType = tr.find('.tabStaType').val();
        tabStaInputData.tabStaName = tr.find('.tabStaName').val();



        // console.log(idPswUpdateData); //確認按下儲存時有抓到資料

        // 設定文件格式
        xhr.open("post", "./js/UpdateTabStatusColor.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(tabStaInputData);
        let dataUpdate = `tabStaInputData=${strUpdate}`;
        // console.log(dataUpdate);
        xhr.send(dataUpdate);
      });

      // 按下取消鈕
      $('.cancel').click(function () {
        showRow();
        $('.addbtn').removeAttr('disabled');//恢復新增按鈕
      });

    });
  };
  //按下編輯鈕更新資料

});
