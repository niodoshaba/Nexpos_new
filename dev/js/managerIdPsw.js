window.addEventListener('load', function () {
  showRowManager();

  function showRowManager() {
    // 清除表格內容
    $('table tr').not('tr.title').remove();
    //顯示資料庫撈出來的資料
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status = 200) {
        let storeManager = JSON.parse(xhr.responseText);
        // console.log(storeManager);

        let managerData = document.querySelector('.managerData');
        let str = '';
        for (i = 0; i < storeManager.length; i++) {
          let managerData =
            `<tr>
            <td>${storeManager[i].EMP_NO}</td>
            <td>${storeManager[i].EMP_TITLE}</td>
            <td>${storeManager[i].EMP_NAME}</td>
            <td>${storeManager[i].EMP_PHONE}</td>
            <td>${storeManager[i].EMP_PWD}</td>
            <td class="managerStatus">${storeManager[i].EMP_STAT}</td>
            <td><button class="btn btn-block btn-warning edit update" type="button" style="width: 72px;margin: 0 auto;">編輯</button></td>
          </tr>`;
          str += managerData;
        };
        managerData.innerHTML += str;
        edit();
      }
      let managerStatus = document.querySelectorAll('.managerStatus');
      // console.log(managerStatus);
      for (i = 0; i < managerStatus.length; i++) {
        if (managerStatus[i].innerHTML == 1) {
          managerStatus[i].innerHTML = '在職';
        } else {
          managerStatus[i].innerHTML = '離職';
        }
      }
    }
    xhr.open("get", "./js/managerIdPswShow.php", true);
    xhr.send(null);
  }
  //顯示資料庫撈出來的資料

  //按下新增鈕出現input表單欄位
  $('.addBtn').click(function () {

    $(this).attr('disabled', true);//disabled新增鈕
    $('.edit').attr('disabled', true);//disabled編輯鈕
    //顯示input表單欄位
    $('.title').after(`
      <tr class="input">
        <td></td>
        <td><input class="managerTitle" type="text" size="10" disabled value="店長"></td>
        <td><input class="managerName" type="text" size="15"></td>
        <td><input class="managerPhone" type="text" size="15"></td>
        <td><input class="managerPsw" type="text" size="15"></td>
        <td><select name="managerStatus" class="managerStatus"><option value="1">在職</option><option value="0">離職</option></select></td>
        <td><button class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td>
      <tr>
    `);
    //按下儲存
    $('.save').click(function () {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          $('tr.input').remove();
          showRowManager();
        } else {
          // alert(xhr.status);
        }
      }
      // 將輸入的值存成物件形式
      let managerInputData = {};
      managerInputData.managerTitle = $('.managerTitle').val();
      managerInputData.managerName = $('.managerName').val();
      managerInputData.managerPhone = $('.managerPhone').val();
      managerInputData.managerPsw = $('.managerPsw').val();
      managerInputData.managerStatus = $('.managerStatus').val();
      // console.log(managerInputData); //測試按下按下儲存時可以接收到資料

      //設定文件格式
      xhr.open("post", "./js/managerIdPswInsert.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //將要傳送的物件資料轉為字串型別
      let str = JSON.stringify(managerInputData);
      let data = `managerInputData=${str}`;
      // console.log(data);
      xhr.send(data);
    });
    //取消新增
    $('.cancel').click(function () {
      $('.input').remove();
      $('.addBtn').removeAttr('disabled');//恢復新增按鈕
      $('.edit').removeAttr('disabled');//恢復編輯按鈕
    });

  });
  //按下新增鈕出現input表單欄位

  //按下編輯更新資料 
  function edit() {
    $('.edit').click(function () {
      // alert('haha');
      $('.addBtn').attr('disabled', true)//disabled新增鈕
      $('.edit').attr('disabled', true);//disabled其他編輯鈕

      let tr = $(this).parent().parent();

      //職位
      let managerTitle = tr.find('td:eq(1)').text();
      tr.find('td:eq(1)').text("");
      tr.find('td:eq(1)').append(`<input class="managerTitle" value="${managerTitle}" size="10" disabled>`);
      // 名稱
      let managerName = tr.find('td:eq(2)').text();
      tr.find('td:eq(2)').text("");
      tr.find('td:eq(2)').append(`<input class="managerName" value="${managerName}" type="text" size="15">`);
      // 手機
      let managerPhone = tr.find('td:eq(3)').text();
      tr.find('td:eq(3)').text("");
      tr.find('td:eq(3)').append(`<input class="managerPhone" value="${managerPhone}" type="text" size="15">`);
      // 密碼
      let managerPsw = tr.find('td:eq(4)').text();
      tr.find('td:eq(4)').text("");
      tr.find('td:eq(4)').append(`<input class="managerPsw" value="${managerPsw}" type="text" size="15">`);
      // 狀態
      let managerStatus = tr.find('td:eq(5)').text();
      tr.find('td:eq(5)').text("");
      tr.find('td:eq(5)').append(`<select class="managerStatus"><option value="1">在職</option><option value="0">離職</option></select>`);
      // 編輯
      tr.find('td:eq(6)').text("");
      tr.find('td:eq(6)').append(`<button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button>`);

      //儲存
      $('.save').click(function () {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status == 200) {
            showRowManager();
          } else {
            // alert(xhr.status);
          }
        }
        let managerIdPswUpdate = {};
        managerIdPswUpdate.managerNo = tr.find('td:eq(0)').text();
        managerIdPswUpdate.managerTitle = tr.find('.managerTitle').val();
        managerIdPswUpdate.managerName = tr.find('.managerName').val();
        managerIdPswUpdate.managerPhone = tr.find('.managerPhone').val();
        managerIdPswUpdate.managerPsw = tr.find('.managerPsw').val();
        managerIdPswUpdate.managerStatus = tr.find('.managerStatus :selected').val();
        // console.log(managerIdPswUpdate); //確認按下儲存時有抓到資料

        // 設定文件格式
        xhr.open("post", "./js/managerIdPswUpdate.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //將要傳送的物件資料轉為字串型別
        let strUpdate = JSON.stringify(managerIdPswUpdate);
        let dataUpdate = `managerIdPswUpdate=${strUpdate}`;
        console.log(dataUpdate);
        xhr.send(dataUpdate);
      });
      // 按下取消鈕
      $('.cancel').click(function () {
        showRowManager();
        $('.addBtn').removeAttr('disabled');//恢復新增按鈕
      });

    });

  };
  //按下編輯更新資料 
});



//判斷登入若為店長則只可瀏覽前三行
window.addEventListener("load", function () {
  let usertitle = sessionStorage.getItem('title');

  if (usertitle == '店長') {
    $("li").slice(3, 8).css("visibility", "hidden");
  }
})
