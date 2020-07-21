window.addEventListener('load', function () {
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

        let idPsw = document.querySelector('.idPsw');
        let str = '';
        for (i = 0; i < empIdPsw.length; i++) {
          let idPsw =
            `<tr>
                <td>${empIdPsw[i].EMP_NO}</td>
                <td>${empIdPsw[i].EMP_TITLE}</td>
                <td>${empIdPsw[i].EMP_NAME}</td>
                <td>${empIdPsw[i].EMP_PHONE}</td>
                <td>${empIdPsw[i].EMP_PWD}</td>
                <td class="empStatus">${empIdPsw[i].EMP_STAT}</td>
                <td><button class="btn btn-block btn-warning edit update" type="button" style="width: 72px;margin: 0 auto;">編輯</button></td>
              </tr>`;
          str += idPsw;
        }
        idPsw.innerHTML += str;
        edit();
      }
      let empStatus = document.querySelectorAll('.empStatus');
      // console.log(empStatus);
      for (i = 0; i < empStatus.length; i++) {
        if (empStatus[i].innerHTML == 1) {
          empStatus[i].innerHTML = '在職';
        } else {
          empStatus[i].innerHTML = '離職';
        }
      }
    }
    xhr.open("get", "../dev/js/idPswManageShow.php", true);
    xhr.send(null);
  }
  //顯示資料

  //按下新增鈕出現input表單欄位
  $('.addBtn').click(function () {

    $('.addBtn').attr('disabled', true);//disabled新增鈕
    $('.edit').attr('disabled', true);//disabled編輯鈕
    //顯示input表單欄位
    $('.title').after(`
      <tr class="input">
        <td></td>
        <td><input class="empTitle" type="text" size="10"></td>
        <td><input class="empName" type="text" size="15"></td>
        <td><input class="empPhone" type="text" size="15"></td>
        <td><input class="empPsw" type="text" size="15"></td>
        <td><select class="empStatus"><option value="1">在職</option><option value="0">離職</option></select></td>
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
          $('.addBtn').removeAttr('disabled');//恢復新增按鈕
        }
        else {
          // alert(xhr.status);
        }
      };
      // 將輸入的值存成物件形式
      let idPswInputData = {};
      idPswInputData.empTitle = $('.empTitle').val();
      idPswInputData.empName = $('.empName').val();
      idPswInputData.empPhone = $('.empPhone').val();
      idPswInputData.empPsw = $('.empPsw').val();
      idPswInputData.empStatus = $('.empStatus').val();
      // console.log(idPswInputData);

      //設定文件格式
      xhr.open("post", "../dev/js/idPswManageInsert.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //將要傳送的物件資料轉為字串型別
      let str = JSON.stringify(idPswInputData);
      let data = `idPswInputData=${str}`;
      // console.log(data);
      xhr.send(data);
    });

    // 取消新增
    $('.cancel').click(function () {
      $('.input').remove();
      $('.addBtn').removeAttr('disabled');//恢復新增按鈕
      $('.edit').removeAttr('disabled');//恢復編輯按鈕
    });

  })
  //按下新增鈕出現input表單欄位

  //按下編輯鈕更新資料
  function edit() {
    $('.edit').click(function () {
      // alert('haha');
      $('.addBtn').attr('disabled', true)//disabled新增鈕
      $('.edit').attr('disabled', true); //disabled其他編輯鈕

      let tr = $(this).parent().parent(); //找到當下那層tr

      //職位
      let empTitle = tr.find('td:eq(1)').text();
      tr.find('td:eq(1)').text("");
      tr.find('td:eq(1)').append(`<input class="empTitle" value="${empTitle}" type="text" size="10">`);
      // 名稱
      let empName = tr.find('td:eq(2)').text();
      tr.find('td:eq(2)').text("");
      tr.find('td:eq(2)').append(`<input class="empName" value="${empName}" type="text" size="15">`);
      // 手機
      let empPhone = tr.find('td:eq(3)').text();
      tr.find('td:eq(3)').text("");
      tr.find('td:eq(3)').append(`<input class="empPhone" value="${empPhone}" type="text" size="15">`);
      // 密碼
      let empPsw = tr.find('td:eq(4)').text();
      tr.find('td:eq(4)').text("");
      tr.find('td:eq(4)').append(`<input class="empPsw" value="${empPsw}" type="text" size="15">`);
      // 狀態
      let empStatus = tr.find('td:eq(5)').text();
      tr.find('td:eq(5)').text("");
      tr.find('td:eq(5)').append(`<select class="empStatus"><option value="1">在職</option><option value="0">離職</option></select>`);
      // 編輯
      tr.find('td:eq(6)').text("");
      tr.find('td:eq(6)').append(`<button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button>`);

      //儲存
      $('.save').click(function () {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status == 200) {
            showRow();
            $('.addBtn').removeAttr('disabled');//恢復新增按鈕
          } else {
            // alert(xhr.status);
          }
        }
        let idPswUpdateData = {};
        idPswUpdateData.empNo = tr.find('td:eq(0)').text();
        idPswUpdateData.empTitle = tr.find('.empTitle').val();
        idPswUpdateData.empName = tr.find('.empName').val();
        idPswUpdateData.empPhone = tr.find('.empPhone').val();
        idPswUpdateData.empPsw = tr.find('.empPsw').val();
        idPswUpdateData.empStatus = tr.find('.empStatus :selected').val();
        // console.log(idPswUpdateData); //確認按下儲存時有抓到資料

        // 設定文件格式
        xhr.open("post", "../dev/js/idPswManageUpdate.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(idPswUpdateData);
        let dataUpdate = `idPswUpdateData=${strUpdate}`;
        // console.log(dataUpdate);
        xhr.send(dataUpdate);
      });

      // 按下取消鈕
      $('.cancel').click(function () {
        showRow();
        $('.addBtn').removeAttr('disabled');//恢復新增按鈕
      });

    });
  };
  //按下編輯鈕更新資料

});