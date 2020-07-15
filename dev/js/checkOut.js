window.addEventListener('load',function(){


    let checkoutLeftSideMidItemTop = document.getElementsByClassName("checkoutLeftSideMidItemTop");
    let checkoutIfEachCheck = document.getElementById("checkoutIfEachCheck");
    let checkoutIfDiscount = document.getElementById("checkoutIfDiscount");
    let checkoutIfPoint = document.getElementById("checkoutIfPoint");
    let checkoutDiscountBtn = document.getElementById("checkoutDiscountBtn");
    let checkoutPointBtn = document.getElementById("checkoutPointBtn");
    let checkoutEachCheckBtn = document.getElementById("checkoutEachCheckBtn");
    let checkoutTotal = document.getElementById('checkoutTotal');
    //輸入折扣
    let checkOutDiscountInput = document.getElementById('checkOutDiscountInput');
    let checkoutDiscount = document.getElementById('checkoutDiscount');
    //結帳按鈕
    let checkoutLastBtn = document.getElementById('checkoutLastBtn');
    //記錄幾筆訂單
    let checkoutMenuCount = 0;
    //拆單結帳按鈕
    let checkoutBtn = document.getElementById('checkoutBtn');
    //剩餘品項
    let checkoutLeftSideBottomTop = document.getElementById('checkoutLeftSideBottomTop');
    
    let checkoutLeftSideTopBtn = document.getElementById('checkoutLeftSideTopBtn');
    //接從後端撈回的紅利規則
    // let bonusRule = "";

    //接會員點數
    // let cusPoint = 0;

    function bonusRuleGetData(){
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            
            if(xhr.readyState == 4 && xhr.status == 200){
                let result = xhr.responseText;
                bonusRule = result;
                console.log(bonusRule);
            }
        }
        xhr.open("post","../dev/js/checkOut.php",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(null);
        
    }
    
    bonusRuleGetData();
    
    function checkCustomer(data){
        
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            console.log(xhr.readyState);
            if(xhr.readyState == 4 && xhr.status == 200){
                let phone = JSON.parse(xhr.responseText);

                
                if(phone == ""){
                    //查無此會員
                    checkoutLeftSideTopBtn.children[0].value = "無會員資料";
                    checkoutLeftSideTopBtn.children[0].style.color = "#E98E89";
                    checkoutLeftSideTopBtn.children[0].style.fontSize = "25px";

                }else{
                    checkoutLeftSideTopBtn.children[1].style.display = "none";
                    checkoutLeftSideTopBtn.children[0].style.padding = "0";
                    checkoutNowBouns.innerText = phone.CUS_POINT;
                    cusPoint = phone.CUS_POINT;
                    if(phone.CUS_GEN == "男"){
                        checkoutLeftSideTopBtn.children[0].value = `${phone.CUS_LAST}先生您好`
                    }else{
                        checkoutLeftSideTopBtn.children[0].value = `${phone.CUS_LAST}小姐您好`
                    }
                    

                }
                
            }
        }
        xhr.open("post","../dev/js/customerSearch.php",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(`customer=${data}`);
        
    }

    //-------------------------- 紅利相關 --------------------------
    //取得暫存區裡的紅利規則
    // console.log(bonusRule);
    let bounsCom = parseInt(bonusRule.substring(bonusRule.indexOf('費')+1, bonusRule.indexOf('元')));
    let bonusExchange = parseInt(bonusRule.substring(bonusRule.indexOf('每')+1,bonusRule.lastIndexOf('點')));
    console.log(bounsCom);
    console.log(bonusExchange);
    //let bonusRule = "消費500元累積1點，每300點可折抵1元";
    
    //輸入紅利點數
    let checkoutGetPoint = document.getElementById('checkoutGetPoint');
    //每筆品項金額
    let checkOutPrice = document.getElementsByClassName('checkOutPrice');
    //總金額
    let checkOutTotalPrice = parseInt(0);
    //折扣總金額
    let checkoutDiscountTotalPrice = parseInt(0);
    
    let checkoutNowBouns = document.getElementById('checkoutNowBouns');
    
    let checkoutDiscountPrice = document.getElementById('checkoutDiscountPrice');

    
        //立即函式 
        //1. 計算總金額
        (function checkOutSum(){
            for(i=0;i<checkOutPrice.length;i++){
            checkOutTotalPrice = checkOutTotalPrice+parseInt(checkOutPrice[i].innerText.substring(1, checkOutPrice[i].innerText.length));
            }
            checkoutTotal.innerHTML = `<span>總計：</span> <span>${checkOutTotalPrice}</span>`;
        })();
    
    // 點擊訂單項目反藍
    for(i=0;i<checkoutLeftSideMidItemTop.length;i++){
        checkoutLeftSideMidItemTop[i].addEventListener("click",function(){
            $(this).toggleClass("-toblue")
        })
    }

    //切換三種結帳模式
    checkoutDiscountBtn.addEventListener("click",function(){
        checkoutIfEachCheck.style.display = "none";
        checkoutIfDiscount.style.display = "initial";
        checkoutIfPoint.style.display = "none";
        checkoutLastBtn.style.display = "initial";
        checkoutSeparateBtn.style.display = "none";
    });
    checkoutPointBtn.addEventListener("click",function(){
        checkoutIfEachCheck.style.display = "none";
        checkoutIfDiscount.style.display = "none";
        checkoutIfPoint.style.display = "initial";
        checkoutLastBtn.style.display = "initial";
        checkoutSeparateBtn.style.display = "none";
    });
    checkoutEachCheckBtn.addEventListener("click",function(){
        checkoutIfEachCheck.style.display = "initial";
        checkoutIfDiscount.style.display = "none";
        checkoutIfPoint.style.display = "none";
        checkoutLastBtn.style.display = "none";
        checkoutSeparateBtn.style.display = "initial";
    });

    // //送資料給後端程式同時
    // checkoutLastBtn.addEventListener('click',function(){   
    // });

    //----- 拆帳 -----
    //拆帳刪除選擇的品項
    //從陣列後面開始刪除就可以排除index亂跑的問題
    checkoutSeparateBtn.addEventListener('click',function(e){
        //拆單
        let checkOutSepratePrice = parseInt(0);
        
        for(i=checkoutLeftSideMidItemTop.length-1; i>=0; i--){
            //品項是否有被點選
            if(checkoutLeftSideMidItemTop[i].className.match('-toblue') != null){
                //子單加總
                checkOutSepratePrice = checkOutSepratePrice+parseInt(checkoutLeftSideMidItemTop[i].nextSibling.nextSibling.children[1].innerText.substring(1, checkoutLeftSideMidItemTop[i].nextSibling.nextSibling.children[1].innerText.length));
                console.log(checkOutSepratePrice);
                checkoutLeftSideMidItemTop[i].parentNode.parentNode.removeChild(checkoutLeftSideMidItemTop[i].parentNode);                    
            }
            checkoutLeftSideBottomTop.innerHTML = `<div></div><span>剩餘品項:${checkoutLeftSideMidItemTop.length}</span>`; 
            if(checkoutLeftSideMidItemTop.length == 0){
                checkoutLastBtn.style.display = "initial";
                checkoutSeparateBtn.style.display = "none";
            }
        }
        document.getElementById('checkoutEachTotal').innerHTML = `<span>拆單總計：</span><span>${checkOutSepratePrice}</span>`
        checkOutTotalPrice = checkOutTotalPrice-checkOutSepratePrice;
        checkoutTotal.innerHTML = `<span>總計：</span> <span>${checkOutTotalPrice}</span>`;
        //console.log(checkOutTotalPrice);
    });
    
    checkoutLeftSideBottomTop.innerHTML = `<div></div><span>剩餘品項:${checkoutLeftSideMidItemTop.length}</span>`; 
    
    //----- 折扣 -----
    //單品項價錢
    // console.log(checkoutLeftSideMidItemTop[0].nextSibling.nextSibling.children[1].innerText);
    checkOutDiscountInput.addEventListener('change',function(){
        //取得輸入的折扣%數
        var discount = checkOutDiscountInput.value;
        //清空總金額
        checkoutDiscountTotalPrice = parseInt(0);
        // console.log(discount);
        for(i=0;i<checkOutPrice.length;i++){
            var x = parseInt(checkOutPrice[i].innerText.substring(1, checkOutPrice[i].innerText.length));
            x = Math.round(x*discount);
            //折扣後品項加總
            checkoutDiscountTotalPrice += x;
            checkOutPrice[i].innerText = "$"+x;
        }
        //寫回折扣總價
        document.getElementById('checkoutDiscountTotalPrice').innerText = checkOutTotalPrice-checkoutDiscountTotalPrice;
        checkoutTotal.innerHTML = `<span>總計：</span> <span>${checkoutDiscountTotalPrice}</span>`;
        // var afterPrice = parseInt(document.getElementById('checkOutTotalPriceShow').innerText); 
        checkOutTotalPrice = checkoutDiscountTotalPrice;
        console.log(checkOutTotalPrice);
    });

    //----- 紅利 -----
    //紅利折點
    
    checkoutGetPoint.addEventListener('change',function(){
        
        //欲折抵點數
        var getPoint = parseInt(checkoutGetPoint.value); //輸入的紅利點數(整數)
        var bonusPoint = cusPoint - getPoint;           //扣掉後剩餘的紅利點數(整數) -- 第一筆

        //取第一個品項的金額
        var firstItem = parseInt(checkOutPrice[0].innerText.substring(1, checkOutPrice[0].innerText.length));
       

        //會員有的紅利點數 - 會員逾兌換的紅利點數
        if(bonusPoint>0){   //可兌換
          //折抵流程
          //1. 輸入的紅利點數 / __點可換1元
          //console.log(parseInt(getPoint/bonusExchange)); //折抵金額
          console.log(getPoint%bonusExchange);           //折抵後剩餘的紅利點數 -- 第二筆
          
          //寫入折抵金額 與 折扣總計一致
          checkoutDiscountPrice.innerText = parseInt(getPoint/bonusExchange);
          //寫回折扣總計 與 折扣折抵金額
          document.getElementById('checkoutDiscountTotalPrice').innerText = parseInt(getPoint/bonusExchange);

          checkoutTotal.innerHTML = `<span>總計：</span> <span>${checkOutTotalPrice - parseInt(getPoint/bonusExchange)}</span>`; 
          
          //
          checkOutTotalPrice = checkOutTotalPrice - parseInt(getPoint/bonusExchange);
         
          //紅利折抵金額 用第一筆品項去扣
          checkOutPrice[0].innerText = "$" + (firstItem - parseInt(getPoint/bonusExchange));
        }
        

       
    });
    
    checkoutLeftSideTopBtn.addEventListener('submit',e=>{
        e.preventDefault();
        let senddata = checkoutLeftSideTopBtn.children[0].value;
        checkCustomer(senddata);
        
    });
});