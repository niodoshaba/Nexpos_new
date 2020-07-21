
window.addEventListener('load', function(){

  let now = new Date();
  let today = `${now.getFullYear()}-${(now.getMonth()+1)<10?0:''}${now.getMonth()+1}-${(now.getDate()+1)<10?0:''}${now.getDate()}`;
document.getElementById("anaStart").setAttribute('min',today)
document.getElementById("anaEnd").setAttribute('min',today)
document.getElementById("anaStart").setAttribute('value',today)


  let resRuleUpdateTag = document.getElementById('resRuleUpdateTag')
  let resRuleInsertTag = document.getElementById('resRuleInsertTag')
  let resRuleInsert = document.getElementById('resRuleInsert')
  let resRuleUpdate = document.getElementById('resRuleUpdate')
  let topTab = document.getElementsByClassName('topTab')
  let calendarPickDateTop = document.getElementById('calendarPickDateTop')
  let input = document.getElementsByClassName('input')

  resRuleInsertTag.addEventListener('click',function(){
    resRuleInsert.style.display="block"
    resRuleUpdate.style.display="none"
    calendarPickDateTop.style.display="none"

    input[0].innerHTML=`
                      <td>
                        <input type="date" name="resStartDate" class="resStartDate calendarPickDate" calendarLabel="picked" />
                      </td>                          
                      <td>
                        <input type="date" name="resEndDate" class="resEndDate calendarPickDate" calendarLabel="picked" />
                      </td>
                      <td>
                        <select name="resOpenOrNot2" class="resOpenOrNot">
                          <option value="1" selected>開放</option>
                          <option value="0">不開放</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" name="resHowMuchPeople2" class="resHowMuchPeople" size="5"/>
                      </td>
                      <td>
                        <button type="submit" class="btn btn-info save">儲存</button>
                      </td>
                      `

    
    document.getElementsByClassName("resStartDate")[0].setAttribute('value',today)
    document.getElementsByClassName("resStartDate")[0].setAttribute('min',today)
    // document.getElementsByClassName("resEndDate")[0].setAttribute('value',today)
    document.getElementsByClassName("resEndDate")[0].setAttribute('min',today)
    topTab[1].setAttribute('id','topTabactives')
    topTab[0].removeAttribute('id','topTabactives')
  
  })
  resRuleUpdateTag.addEventListener('click',function(){
    resRuleUpdate.style.display="block"
    resRuleInsert.style.display="none" 
    calendarPickDateTop.style.display="block"


    topTab[0].setAttribute('id','topTabactives')
    topTab[1].removeAttribute('id','topTabactives')

  })


  document.getElementById('anaResBtn').addEventListener('click',function(){
    showRow();
  })



  function showRow(){
  // 清除表格內容
  $(`.table1 > tr`).not("tr.title").remove();
    //顯示資料庫撈出來的資料
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
       console.log(123); 
      if(xhr.status == 200){
        let daily_stateJSON = JSON.parse(xhr.responseText);
       console.log(daily_stateJSON)
        // 測試看看有沒有接收到資料
        
        let resList = document.querySelector('.resList');
        let str = '';
        for(i=0; i<daily_stateJSON.length; i++){
          let resList =
              `
              <tr>
                <td >${daily_stateJSON[i].DAILY_DATE}</td>
                <td class="resOpenOrNot">${daily_stateJSON[i].DAILY_STA}</td>
                <td class="resHowMuchPeople">${daily_stateJSON[i].DAILY_AVA}</td>
                <td><button class="btn btn-block btn-warning edit update" type="button" style="width: 72px;margin: 0 auto;">編輯</button></td>
              </tr>
              `;
          str += resList; 
        }
        resList.innerHTML += str;
        edit();
      }
      // let resRuledate =document.querySelectorAll('.resRuledate')
      let resOpenOrNot = document.querySelectorAll('.resOpenOrNot');
      let resHowMuchPeople = document.querySelectorAll('.resHowMuchPeople');
      // console.log(resOpenOrNot[0]);
      for(i=0; i<resOpenOrNot.length; i++){
        if(resOpenOrNot[i].innerHTML == 1){
          resOpenOrNot[i].innerHTML = '開放';
        }else{
          resOpenOrNot[i].innerHTML = '不開放';
          resHowMuchPeople[i].innerHTML = ' '
        }
      }
    }

    xhr.open("POST", "../dev/js/reservationRuleShow.php", true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    let resData = "anaStart=" + document.getElementById("anaStart").value + "&anaEnd=" + document.getElementById("anaEnd").value;
    xhr.send(resData);
  }

  // 顯示資料

  //按下編輯鈕更新資料
  function edit(){
    $('.edit').click(function(){
    // alert('haha');
    
      $('.edit').attr('disabled', true); //disabled其他編輯鈕
      let tr = $(this).parent().parent(); //找到當下那層tr
      
      let resRuledate = tr.find('td:eq(0)').text();
      tr.find('td:eq(0)').text("");
      tr.find('td:eq(0)').append(`<input class="resRuledate" name="resRuledate" value="${resRuledate}"  style="border:none"   type="text" size="15" readonly="readonly">`);
    

      let resOpenOrNot = tr.find('td:eq(1)').text();
      tr.find('td:eq(1)').text("");
      tr.find('td:eq(1)').append(`
                        <select name="resOpenOrNot" class="resOpenOrNot">
                          <option value="1" selected>開放</option>
                          <option value="0">不開放</option>
                        </select>
                      `);
      // 密碼
      let resHowMuchPeople = tr.find('td:eq(2)').text();
      tr.find('td:eq(2)').text("");
      tr.find('td:eq(2)').append(`<input class="resHowMuchPeople" name="resHowMuchPeople" value="${resHowMuchPeople}" type="text" size="15" required>`);

      // 編輯
      tr.find('td:eq(3)').text("");
      tr.find('td:eq(3)').append(`<button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button>`);
     

      // 按下取消鈕
      $('.cancel').click(function(){
        showRow();
      });

    });
  };


});
