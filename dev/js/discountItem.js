window.addEventListener('load', function(){
  showRowDisItem();

  let checkItemInputData = new Array();
  let checkItemUpdateData = new Array();
  //按下選擇出現checkbox
  function showCheckBox(){
    $('.disItemCheck').click(function(){

      let xhr = new XMLHttpRequest();
        xhr.onload = function(){
          if(xhr.status = 200){
            var productItem = JSON.parse(xhr.responseText);
            // console.log(productItem);
            
            var product = document.querySelector('.pro');
            var str='';
            for(i=0; i<productItem.length; i++){
              var productList =
                `<tr>
                  <td>${productItem[i].ItemNo}</td>
                  <td>${productItem[i].CataName}</td>
                  <td>${productItem[i].ItemName}</td>
                  <td>${productItem[i].ItemPrice}</td>
                  <td><input type="checkbox" name="productsNo" value="${productItem[i].ItemNo}"></td>
                </tr>`;
              str += productList;     
              // console.log(str);          
            };
            product.innerHTML += str;
          }
        };
        xhr.open("get", "./js/discountItemCheckShow.php", true);
        xhr.send(null);
      });
  }
  //按下選擇出現checkbox

  //顯示資料
  function showRowDisItem(){
   
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
      if(xhr.status == 200){
        let discountShow = JSON.parse(xhr.responseText);
        // console.log(discountShow); 
        let discountTable = document.querySelector('.discountTable');
        let str = '';
        for(i=0; i<discountShow.length; i++){
          let discountTable = 
          `<tr>
              <td>${discountShow[i].DIS_NO}</td>
              <td>${discountShow[i].DIS_NAME}</td>
              <td>${discountShow[i].DIS_START}</td>
              <td>${discountShow[i].DIS_END}</td>
              <td><button type="button" class="show btn btn-warning btn-primary" data-toggle="modal" data-target="#exampleModalCenter">瀏覽</button></td>
              <td>${discountShow[i].DIS_PCTALL*10}折</td>
              <td><button type="button" class="btn btn-warning btn-primary edit">編輯</button></td>
            </tr>`;
          str += discountTable;
        };
        discountTable.innerHTML += str;
        showCheckedItem();
        edit()
      }
    }
    xhr.open("get", "./js/discountItemShow.php", true);
    xhr.send(null);
  }
  //顯示資料

  //按下瀏覽顯示該折扣各項目
  function showCheckedItem(){

    $('.show').click(function(){
      $('.showChecked tr').not('tr.title').remove();

      let showcheckeditemNo = $(this).parent().parent().find('td:eq(0)').text();
      // console.log(showcheckeditemNo);
      let xhr = new XMLHttpRequest();
      xhr.open("post", "./js/discountItemChecked.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      
      let strInfo = JSON.stringify(showcheckeditemNo);
      let dataInfo = `showcheckeditemNo=${strInfo}`;
      console.log(dataInfo);
      xhr.send(dataInfo);
      
      xhr.onload = function(){
        if(xhr.status == 200){
          let discountChecked = JSON.parse(xhr.responseText);
          // console.log(discountChecked);
          let showChecked = document.querySelector('.showChecked');
          let str = '';
          for(i=0; i<discountChecked.length; i++){
            let showChecked = 
              `<tr>
                <td>${discountChecked[i].DIS_NO}</td>
                <td>${discountChecked[i].PRO_ITEM_NO}</td>
                <td>${discountChecked[i].PRO_CATA_NAME}</td>
                <td>${discountChecked[i].PRO_ITEM_NAME}</td>
                <td>${discountChecked[i].PRO_ITEM_PRICE}</td>
              </tr>`;
            str += showChecked;
          };
          showChecked.innerHTML += str;
        }
      }
    })
  }
  //按下瀏覽顯示該折扣各項目

  //按下新增鈕出現input表單欄位
  $('.addBtn').click(function(){
    
    $('.addBtn').attr('disabled', true);//disabled新增鈕
    $('.edit').attr('disabled', true);//disabled編輯鈕
    //顯示input表單欄位
    $('.title').after(`
      <tr class="input">
        <td></td>
        <td><input class="disItemName" type="text" size="15"></td>
        <td><input class="disItemStart" type="date"><t/d>
        <td><input class="disItemEnd" type="date"></td>
        <td><button type="button" class="disItemCheck btn btn-warning btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">選擇</button></td>
        <td><input class="disItemdiscount" type="text" size="3">折</td>
        <td><button class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td>
      </tr>
    `);
    showCheckBox();
    //顯示input表單欄位

    //按下確認
    $('.confirm').click(function(){

       // 將勾選的值存成陣列形式
      $('input:checkbox:checked[name="productsNo"]').each(function(i) {
        checkItemInputData[i] = this.value;
      });  
      console.log(checkItemInputData);
    })
    //按下確認

    //按下儲存
    $('.save').click(function(){
      let xhr = new XMLHttpRequest();
      xhr.onload = function(){
        if(xhr.status == 200){
          $('table tr').not('tr.title').remove();
          showRowDisItem();
          $('.addBtn').removeAttr('disabled');
          $('.edit').removeAttr('disabled');
        }else{
          // alert(xhr.status);
        };
      };
      // 將輸入的值存成物件形式
      let ItemInputData = {};
        ItemInputData.disItemNo = checkItemInputData;
        ItemInputData.disItemName = $('.disItemName').val();
        ItemInputData.disItemStart = $('.disItemStart').val();
        ItemInputData.disItemEnd = $('.disItemEnd').val();
        ItemInputData.disItemdiscount = $('.disItemdiscount').val();
        // console.log(ItemInputData);
      
      //設定文件格式
      xhr.open("post", "./js/discountItemInsert.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //將要傳送的物件資料轉為字串型別
      let str = JSON.stringify(ItemInputData);
      let data = `ItemInputData=${str}`;
      // console.log(data);
      xhr.send(data);
    });
    //按下儲存

    // 取消新增
    $('.cancel').click(function() {
      $('.input').remove();
      $('.addBtn').removeAttr('disabled');//恢復新增按鈕
      $('.edit').removeAttr('disabled');//恢復編輯按鈕
    });
  })
  //按下新增鈕出現input表單欄位

  //按下編輯鈕更新資料
  function edit(){
    $('.edit').click(function(){
      // alert('haha');
      $('.addBtn').attr('disabled', true)//disabled新增鈕
      $('.edit').attr('disabled', true); //disabled其他編輯鈕

      let tr = $(this).parent().parent();

      //名稱
      let disItemName = tr.find('td:eq(1)').text();
      tr.find('td:eq(1)').text("");
      tr.find('td:eq(1)').append(`<input class="disItemName" value="${disItemName}" type="text" size="10">`);
      // 期間(起)
      let disItemStart = tr.find('td:eq(2)');
      tr.find('td:eq(2)').text("");
      tr.find('td:eq(2)').append(`<input class="disItemStart" type="date">`);
      // 期間(迄)
      let disItemEnd = tr.find('td:eq(3)');
      tr.find('td:eq(3)').text("");
      tr.find('td:eq(3)').append(`<input class="disItemEnd" type="date">`);
      //選擇品項  
      tr.find('td:eq(4)').text("");
      tr.find('td:eq(4)').append(`<button type="button" class="disItemCheck btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">選擇</button>`);
      showCheckBox();
      //折扣
      let disItemDiscount = tr.find('td:eq(5)').text();
      tr.find('td:eq(5)').text("");
      tr.find('td:eq(5)').append(`<input class="disItemDiscount" value="${disItemDiscount}" type="text" size="3">`);
      //編輯
      tr.find('td:eq(6)').text("");
      tr.find('td:eq(6)').append(`<button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button>`);
      
    
      // 按下確認
      $('.confirm').click(function(){

        // 將勾選的值存成陣列形式
        $('input:checkbox:checked[name="productsNo"]').each(function(i) {
          checkItemUpdateData[i] = this.value;
        });  
        console.log(checkItemUpdateData);
      })
      //按下確認

      // 儲存
      $('.save').click(function(){
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
          if(xhr.status == 200){
            $('table tr').not('tr.title').remove();
            showRowDisItem();
            $('.addBtn').removeAttr('disabled');//恢復新增按鈕
            $('.edit').removeAttr('disabled');//恢復編輯按鈕
          }else{
            alert(xhr.status);
          };
        };
        // 將輸入的值存成物件形式
        let disItemUpdateData = {};
            disItemUpdateData.disNo = tr.find('td:eq(0)').text();
            disItemUpdateData.disItemName = $('.disItemName').val();
            disItemUpdateData.disItemStart = $('.disItemStart').val();
            disItemUpdateData.disItemEnd = $('.disItemEnd').val();
            disItemUpdateData.disItemChecked = checkItemUpdateData;
            disItemUpdateData.disItemDiscount = $('.disItemDiscount').val();
        console.log(disItemUpdateData);

      // 設定文件格式
      xhr.open("post", "./js/discountItemUpdate.php", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      //將要傳送的物件資料轉為字串型別
      let strUpdate = JSON.stringify(disItemUpdateData);
      let dataUpdate = `disItemUpdateData=${strUpdate}`;
      // console.log(dataUpdate);
      xhr.send(dataUpdate);
      });
      // 按下取消鈕
      $('.cancel').click(function(){
        $('table tr').not('tr.title').remove();
        showRowDisItem();
        $('.addBtn').removeAttr('disabled');//恢復新增按鈕
        $('.edit').removeAttr('disabled');//恢復編輯按鈕
      });
      
      
    });
  };
 
  //按下編輯鈕更新資料
})