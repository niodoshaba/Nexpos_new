//用來裝後台餐桌資料
var tabReceiveJson = (JSON.parse(localStorage.getItem("allData")));


//取出餐桌資料並畫回桌面
var tabConstrainZone = document.getElementById('showTableToResPage');
var tabBgc = tabReceiveJson[0].bgc;
//  預約/關閉/清潔中/用餐中
var tabEditColor = tabReceiveJson[0].selectEmptyColor;
var tabResColor = tabReceiveJson[0].selectResColor;
var tabCloseColor = tabReceiveJson[0].selectCloseColor;
var tabCleanColor = tabReceiveJson[0].selectCleanColor;
var tabEatColor = tabReceiveJson[0].selectEatColor;

console.log(tabEditColor);
console.log(tabResColor);
console.log(tabCloseColor);
console.log(tabCleanColor);
console.log(tabEatColor);

var tabStatus = document.querySelector('option').innerText;
var tabResOrCloseSelect = document.querySelector('#tabResOrCloseSelect');
//判斷燈號，拿來取代無法判斷背景色 <= 要寫在編輯餐桌的頁面
var tabCloseBtn = document.getElementById('tabCloseBtn');

function componentToHex(color) {
    var hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//Ajax從資料庫撈餐桌狀態顏色

//從localstorage撈出資料後渲染畫面
for (i = 0; i < tabReceiveJson.length; i++) {

    let tabElement = document.createElement('li');
    tabElement.id = tabReceiveJson[i].id;
    tabElement.style.width = tabReceiveJson[i].width;
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

// console.log(tabConstrainZone.childNodes[0].shape);

//給下拉式選單初值
tabChangeStatus("tabRes");
// console.log(tabResOrCloseSelect);
tabResOrCloseSelect.addEventListener('change', function (e) {
    var ResOrClose = e.target.value; //tabClose || tabRes

    if (ResOrClose == "tabClose") {

        tabChangeStatus(tabCloseColor);

    } else {

        tabChangeStatus(tabResColor);

    }
});

function tabChangeStatus(bgc) {
    // console.log(bgc);
    tabConstrainZone.addEventListener('click', function (e) {
        var test = tabResOrCloseSelect.value;
        e.preventDefault();
        e.stopImmediatePropagation();

        // console.log(bgc);
        const li = e.target.closest('li');

        var color = li.style.backgroundColor;
        var start = color.indexOf('(');
        var stop = color.lastIndexOf(')');
        var d = color.substring(start + 1, stop);
        var bColor = parseInt(d.substring(d.lastIndexOf(' ') + 1, d.length));
        var gColor = parseInt(d.substring(d.indexOf(' ') + 1, d.lastIndexOf(',')));
        var rColor = parseInt(d.substring(0, d.indexOf(',')));
        //轉換後的值
        var transformColor = rgbToHex(rColor, gColor, bColor);

        //判斷目前在預約頁面或在關閉頁面
        if (test == "tabClose") {
            li.tabChangeCheckClose = true;

            // if(li.style.backgroundColor == tabBgc){
            //     li.style.backgroundColor = tabCloseColor;
            //     li.tabChangeCheckClose = false;

            // }
            // console.log(li.style.backgroundColor);
            if (transformColor == tabEditColor) {

                li.style.backgroundColor = tabCloseColor;
                li.tabChangeCheckClose = false;

            } else if (transformColor == tabCloseColor) {
                li.style.backgroundColor = tabEditColor;

            }
            // else if(li.tabChangeCheckRes == false){
            //     alert('此桌已被預約無法關閉');

            // }
            else {
                alert('此桌預約/用餐/清潔中無法關閉');
            }
            // else{
            //     li.style.backgroundColor = tabBgc;

            // } 
        }

        if (test == "tabRes") {
            // li.tabChangeCheckRes = true;

            // if(li.style.backgroundColor == tabBgc){
            //     li.style.backgroundColor = tabResColor;
            //     li.tabChangeCheckRes = false;

            // }
            if (transformColor == tabEditColor) {

                li.style.backgroundColor = tabResColor;
                // li.tabChangeCheckRes = false;

            } else if (transformColor == tabResColor) {

                li.style.backgroundColor = tabEditColor;

            }

            // else if(li.tabChangeCheckClose == false){
            //     alert('此桌已被關閉無法預約');

            // }
            else {
                alert('此桌關閉/用餐/清潔中無法預約');
            }
            // else{
            //     li.style.backgroundColor = tabBgc;

            // }  
        }

    });
}
function saveAllDataToJson(data) {
    localStorage.setItem("allData", JSON.stringify(data));
}
tabCloseBtn.addEventListener('click', function (e) {
    // var positionArr = [];
    e.preventDefault();
    e.stopImmediatePropagation();
    // console.log(tabConstrainZone.childElementCount);
    for (i = 0; i < tabConstrainZone.childElementCount; i++) {
        var tabShapeName = tabConstrainZone.childNodes[i].getAttribute('class');
        //tabConstrainZone.childNodes[i].style.backgroundColor 顏色是對的
        tabReceiveJson[i].bgc = tabConstrainZone.childNodes[i].style.backgroundColor;

    }

    saveAllDataToJson(tabReceiveJson);
});