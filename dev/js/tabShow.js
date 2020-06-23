//用來裝後台餐桌資料
var tabReceiveJson = (JSON.parse(localStorage.getItem("allData")));
        
        
//取出餐桌資料並畫回桌面
var tabConstrainZone = document.getElementById('showTableToPage');

//從localstorage撈出資料後渲染畫面
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
    tabConstrainZone.appendChild(tabElement);
}