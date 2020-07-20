//用來裝後台餐桌資料
var tabReceiveJson = (JSON.parse(localStorage.getItem("allData")));

//新增外帶訂單
var topTabToGo = document.getElementsByClassName('topTabToGo')[0]; 
// document.getElementById('topTapToGo');

//外帶訂單產生區域
var toGoZone =　document.getElementById('toGoZone');

var checkOutOrdSvg = document.getElementById('testQ'); //已出單未結帳

var OrdNoCheckOutSvg = document.getElementById('testZ'); //已點餐未出餐


//  預約/關閉/清潔中/用餐中
var tabEditColor = tabReceiveJson[0].selectEmptyColor;
var tabResColor = tabReceiveJson[0].selectResColor;
var tabCloseColor = tabReceiveJson[0].selectCloseColor;
var tabCleanColor = tabReceiveJson[0].selectCleanColor;
var tabEatColor = tabReceiveJson[0].selectEatColor;

//取出餐桌資料並畫回桌面
var tabConstrainZone = document.getElementById('showTableToResPage');

//---------------------------------
//記訂單    
var posHomePageOrd = 0;

var ttt = localStorage.getItem('posHomePageOrd');
//產生訂單編號，要下ajax
if(ttt == undefined){
    posHomePageOrd = 0;
}else{
    posHomePageOrd = ttt;
}

//----------------------------
//紀錄傳到點餐頁面的資訊
var loadOrdListTips = JSON.parse(localStorage.getItem('ordlistTips'));
var ordlistTips = {orderList: ' ',
                   inOrOut: ' ',
                   number: ' '
                  };

if(loadOrdListTips == undefined){
    ordlistTips = {orderList: ' ',
                   inOrOut: ' ',
                   number: ' '
                  };
}else{
    ordlistTips = loadOrdListTips;
}

//出餐boolean
var ordPostBool = localStorage.getItem('ordPostBool');

//儲存外帶的資料，看要生成多少個li
var toGoArr = [];

if(localStorage.getItem('toGoArr') == undefined){
   
    toGoArr = [];
}else{
    
    toGoArr = JSON.parse(localStorage.getItem('toGoArr'));
    
}

var tmpBackKitchen = [];
//確認是否有後廚完成訂單，有渲染內用外帶訂單
var tmpBackKitchenDone = [];

function checkBackKitchenDone(){
    for(var i = 0; i < localStorage.length; i++){
        tmpBackKitchen.push(localStorage.key(i));
    }

    for(j=0;j<tmpBackKitchen.length;j++){
        if(tmpBackKitchen[j].includes('done_')){
            tmpBackKitchenDone.push(tmpBackKitchen[j]);
        }
    }

}

function componentToHex(color) {
    var hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

window.addEventListener('load',function(e){
    loadEditTab();
    //確認是否有後廚完成訂單
    checkBackKitchenDone();
    
    //渲染內用"已點餐未出餐"訂單
    for(i=0;i<tabConstrainZone.childElementCount;i++){
        
        // console.log(tabConstrainZone.childNodes[i].basicInfo.orderList);
        if(tabConstrainZone.childNodes[i].basicInfo.orderList == ""){
            console.log(`餐桌${i}沒有產生新訂單`);
            
        }else{
           
            //已點餐未出餐
            let newlist = OrdNoCheckOutSvg.cloneNode(true); 
            //已出餐未結帳
            let ordlist = checkOutOrdSvg.cloneNode(true); 

            newlist.style.setProperty("display","inline-block");
            ordlist.style.setProperty("display","inline-block");
            tabConstrainZone.childNodes[i].appendChild(newlist);
            //0708-------產生餐桌的訂單改為用餐中
            tabConstrainZone.childNodes[i].style.backgroundColor = tabEatColor;
            //0714 把用餐中狀態寫入localstorage
            tabReceiveJson[i].bgc = tabEatColor;
            saveDataToLocal('allData',tabReceiveJson);
            console.log("產生內用訂單");


            if(tmpBackKitchenDone.length >0 ){
        
                for(k=0;k<tmpBackKitchenDone.length;k++){
                    let checktmpBack = tmpBackKitchenDone[k].substring(5,tmpBackKitchenDone[k].length);
                    if(tabConstrainZone.childNodes[i].basicInfo.orderList == checktmpBack){
                    //已出餐未結帳
               
                        if(tabConstrainZone.childNodes[i].hasChildNodes() == true){
                        // console.log(tabConstrainZone.childNodes[i].childNodes[0].nextSibling);
                        tabConstrainZone.childNodes[i].removeChild(tabConstrainZone.childNodes[i].childNodes[0].nextSibling);
                        let ordlist = checkOutOrdSvg.cloneNode(true); 
                        ordlist.style.setProperty("display","inline-block");
                        tabConstrainZone.childNodes[i].appendChild(ordlist);
                        tabConstrainZone.childNodes[i].style.backgroundColor = tabEatColor;
                        tabReceiveJson[i].bgc = tabEatColor;
                        saveDataToLocal('allData',tabReceiveJson);
                    }else{
                    
                        let ordlist = checkOutOrdSvg.cloneNode(true); 
                        ordlist.style.setProperty("display","inline-block");
                        tabConstrainZone.childNodes[i].appendChild(ordlist);
                        tabConstrainZone.childNodes[i].style.backgroundColor = tabEatColor;
                        tabReceiveJson[i].bgc = tabEatColor;
                        saveDataToLocal('allData',tabReceiveJson);
                    }
                
                    }
                }
            }
            
        }
    }
    
    
    if(toGoArr.length == 0){
        
    }else{
        
        //渲染外帶訂單
        for(k=0;k<toGoArr.length;k++){
            
            let el = document.createElement('li');
            toGoZone.appendChild(el);

            //已點餐未出餐
            let newlist = OrdNoCheckOutSvg.cloneNode(true); 
            newlist.style.setProperty("display","inline-block");
            //已出餐未結帳
            let ordlist = checkOutOrdSvg.cloneNode(true); 
            ordlist.style.setProperty("display","inline-block");
            el.appendChild(newlist);
            
            //產生外帶訂單時寫屬性
            for(i=0;i<toGoZone.childElementCount;i++){

                toGoZone.childNodes[i].orderList = toGoArr[k].orderList;
                toGoZone.childNodes[i].inOrOut = "out";
            }
            // console.log(toGoZone.childNodes[0].orderList);
            if(tmpBackKitchenDone.length >0){
                
                for(j=0;j<tmpBackKitchenDone.length;j++){
                let checktmpBack = tmpBackKitchenDone[j].substring(5,tmpBackKitchenDone[j].length);
                    if(toGoZone.childNodes[k].orderList == checktmpBack){
                    //已出餐未結帳
                        console.log(toGoZone.childNodes[k]);
                        if(toGoZone.childNodes[k].hasChildNodes() == true){
                        // console.log(toGoZone.childNodes[k].childNodes[0].nextSibling);
                            toGoZone.childNodes[k].removeChild(toGoZone.childNodes[k].childNodes[0]);
                            let ordlist = checkOutOrdSvg.cloneNode(true); 
                            ordlist.style.setProperty("display","inline-block");
                            toGoZone.childNodes[k].appendChild(ordlist);
                            
                        }else{
                    
                            let ordlist = checkOutOrdSvg.cloneNode(true); 
                            ordlist.style.setProperty("display","inline-block");
                            toGoZone.childNodes[k].appendChild(ordlist);
                           
                        }
            
                    }      
                }
            }


        }
        
        
    }
    
    //從外帶訂單進到點餐畫面，要先等外帶區有訂單出現才能點訂單
    if(toGoZone.childElementCount == 0){

    }else{
        
        toGoZone.addEventListener('click',e=>{
            const li = e.target.closest('li');
            //ES6 可用
            console.log(Array.from(li.parentNode.children).indexOf(li));
            //不支援ES6語法可用
            console.log(Array.prototype.indexOf.call(li.parentNode.children,li));
            ordlistTips.orderList = toGoArr[Array.prototype.indexOf.call(li.parentNode.children,li)].orderList;
            ordlistTips.inOrOut = "out";
            ordlistTips.number = "";
            saveDataToLocal('ordlistTips',ordlistTips);
            location.replace('http://localhost/phplab/tableAjax/Table/html/orderTestPage.html');
        });
    }

});

//從localstorage撈出資料後渲染畫面
function loadEditTab(){
    
    for(i=0;i<tabReceiveJson.length;i++){
        let tabElement = document.createElement('li');
        tabElement.id = tabReceiveJson[i].id;
        tabElement.style.width =  tabReceiveJson[i].width;
        tabElement.style.height = tabReceiveJson[i].height;
        tabElement.style.backgroundColor = tabReceiveJson[i].bgc;
        tabElement.style.borderRadius = tabReceiveJson[i].borderRadius;
        tabElement.style.position = "absolute";
        tabElement.style.transform = `translate(${tabReceiveJson[i].x}px,${tabReceiveJson[i].y}px)`;
        tabElement.style.listStyle = "none";
        tabElement.tabChangeCheckClose = true;
        tabElement.tabChangeCheckRes = true;
        tabElement.tabChangeCheckOrd = true;
        tabElement.shape = tabReceiveJson[i].shape;
        //餐桌綁訂單
        tabElement.tabOrdList = tabReceiveJson[i].tabOrdList;
        //餐桌有無點擊出餐
        tabElement.tabClickOrder = tabReceiveJson[i].tabClickOrder;
        //餐桌有無點擊結帳
        tabElement.tabClickCheckOut = tabReceiveJson[i].tabClickCheckOut;
        //餐桌綁訂單
        tabElement.basicInfo = tabReceiveJson[i].basicInfo;

        tabElement.innerText = tabReceiveJson[i].number;
        tabConstrainZone.appendChild(tabElement);
    }
}

function saveDataToLocal(name,data){  
    localStorage.setItem(name,JSON.stringify(data));            
}

function appendOrder(){
    
}

//點擊餐桌
tabConstrainZone.addEventListener('click', e => {
    
    e.preventDefault();
    e.stopImmediatePropagation();

    const li = e.target.closest('li');
    //---------- Hex -> RGB

    var color = li.style.backgroundColor;
    var start = color.indexOf('(');
    var stop = color.lastIndexOf(')');
    var d = color.substring(start+1, stop);
    var bColor = parseInt(d.substring(d.lastIndexOf(' ')+1,d.length));
    var gColor = parseInt(d.substring(d.indexOf(' ')+1,d.lastIndexOf(',')));
    var rColor = parseInt(d.substring(0,d.indexOf(',')));
    //轉換後的值
    var transformColor = rgbToHex(rColor, gColor, bColor);

    switch(transformColor){

        case tabCloseColor:
            alert('此餐桌被關閉無法進行點餐');
        break;

        //空桌
        case tabEditColor:
            if(li.basicInfo.orderList.length != 0){
                //該桌已新增訂單但未出單
                //內用/桌號/訂單編號
                ordlistTips.orderList = li.basicInfo.orderList;
                ordlistTips.inOrOut = "in";
                ordlistTips.number = li.basicInfo.number;
                saveDataToLocal('ordlistTips',ordlistTips);
                location.replace('http://localhost/phplab/tableAjax/Table/html/orderTestPage.html');
            }else{
                //產生新訂單編號
                posHomePageOrd++;
                //把訂單編號次數寫入localstorage
                localStorage.setItem('posHomePageOrd',posHomePageOrd);
                //餐桌綁訂單
                li.basicInfo.orderList = posHomePageOrd;
                li.basicInfo.inOrOut = "in";
                saveDataToLocal('allData',tabReceiveJson);

                //寫入共用資料
                ordlistTips.orderList = posHomePageOrd;
                ordlistTips.inOrOut = "in";
                ordlistTips.number = li.basicInfo.number;
                saveDataToLocal('ordlistTips',ordlistTips);
                //跳轉頁面
                location.replace('http://localhost/phplab/tableAjax/Table/html/orderTestPage.html');
            }
            
            
        break;

        //預約桌
        case tabResColor:
            
            if(li.basicInfo.orderList.length != 0){
                //該桌已新增訂單但未出單
                //內用/桌號/訂單編號
                ordlistTips.orderList = li.basicInfo.orderList;
                ordlistTips.inOrOut = "in";
                ordlistTips.number = li.basicInfo.number;
                saveDataToLocal('ordlistTips',ordlistTips);
                location.replace('http://localhost/phplab/tableAjax/Table/html/orderTestPage.html');
            }else{
                posHomePageOrd++;
                //把訂單編號次數寫入localstorage
                // saveDataToLocal('posHomePageOrd',posHomePageOrd);
                localStorage.setItem('posHomePageOrd',posHomePageOrd);
                // li.tabOrdList = `O${posHomePageOrd}`;
                li.basicInfo.orderList = posHomePageOrd;
                li.basicInfo.inOrOut = "in";
                // saveDataToLocal('ordlistTips',ordlistTips);
                saveDataToLocal('allData',tabReceiveJson);

                //寫入共用資料
                ordlistTips.orderList = posHomePageOrd;
                ordlistTips.inOrOut = "in";
                ordlistTips.number = li.basicInfo.number;
                saveDataToLocal('ordlistTips',ordlistTips);
                //跳轉頁面
                location.replace('http://localhost/phplab/tableAjax/Table/html/orderTestPage.html');
            }
        break;
            
        //用餐中
        case tabEatColor:
            //0708用餐中
                ordlistTips.orderList = li.basicInfo.orderList;
                ordlistTips.inOrOut = "in";
                ordlistTips.number = li.basicInfo.number;
                saveDataToLocal('ordlistTips',ordlistTips);
                location.replace('http://localhost/phplab/tableAjax/Table/html/orderTestPage.html');
        break;
        //清潔中
        case tabCleanColor:
            //0708清潔中
            li.style.backgroundColor = tabEditColor;
            tabReceiveJson[Array.prototype.indexOf.call(li.parentNode.children,li)].bgc = tabEditColor;
            
            saveDataToLocal('allData',tabReceiveJson);
        break;
    }

});


//點擊外帶區
topTabToGo.addEventListener('click',e=>{
    
    //訂單編號+1
    posHomePageOrd++;
    //把訂單編號次數寫入localstorage
    // saveDataToLocal('posHomePageOrd',posHomePageOrd);
    localStorage.setItem('posHomePageOrd',posHomePageOrd);
    
    //在外帶區生成訂單
    let toGoli = document.createElement('li');
    toGoli.basicInfo = {
                        orderList: posHomePageOrd,
                        inOrOut: "out",
                        number: ""                  
                       };

    //已點餐未出餐
    let newlist = OrdNoCheckOutSvg.cloneNode(true); 
    //已出餐未結帳
    let ordlist = checkOutOrdSvg.cloneNode(true);                    
    toGoZone.appendChild(toGoli);
    newlist.style.display = 'inline-block';
    toGoli.appendChild(newlist);
    
    toGoArr.push(toGoli.basicInfo);

    //把外帶資訊存到localstorage
    localStorage.setItem('toGoArr',JSON.stringify(toGoArr));
    //把資訊傳到共用的localstorage
    ordlistTips.orderList = toGoli.basicInfo.orderList;
    ordlistTips.inOrOut = "out";
    ordlistTips.number = "";
    
    saveDataToLocal('ordlistTips',ordlistTips);

    //跳轉到點餐頁面
    location.replace('http://localhost/phplab/tableAjax/Table/html/orderTestPage.html');
});