window.onload = function () {


    //=====================
    // shopping cart function below

    // 購物車
    var ordProdCart = [];
    // 購物車 On
    var ordProdCartOn = [];
    // 暫存購物車
    var ordTempProdCart = [];
    // 配料購物車
    var ordSugarCart = [];
    var ordIceCart = [];
    var ordAsideCart = [];
    var ordSeasoningCart = [];
    // 裝有basicInfo的購物車
    var ordProdCartWithBasicInfo = [];


    // 裝三明治容器
    var ordSanCart = [];
    // 裝義大利麵容器
    var ordPasCart = [];
    // 裝漢堡容器
    var ordHamCart = [];
    // 裝瑪芬堡容器
    var ordMufCart = [];
    // 裝甜點容器
    var ordSweCart = [];
    // 裝咖啡容器
    var ordCofCart = [];
    // 裝飲料容器
    var ordDriCart = [];



    // 菜單區域
    var orderPageItemDivAll = document.getElementById("orderPageItemDivAll");

    var orderPageLeftSideMidItemAll = document.getElementById("orderPageLeftSideMidItemAll");
    var ordTotAmtShow = document.getElementById("ordTotAmtShow");
    var ordTotNumShow = document.getElementById("ordTotNumShow");

    var ordToppingSec = document.getElementById("ordToppingSec")

    var ordToppingSecSu = document.querySelector(".ordToppingSecSu");
    var ordToppingSecIce = document.querySelector(".ordToppingSecIce");
    var ordToppingSecAside = document.querySelector(".ordToppingSecAside");
    var ordToppingSecSeasoning = document.querySelector(".ordToppingSecSeasoning");

    var ordSugar = document.getElementById("ordSugar");
    var ordIce = document.getElementById("ordIce");
    var ordAside = document.getElementById("ordAside");
    var ordSeasoning = document.getElementById("ordSeasoning");

    var ordSugarItem = document.querySelectorAll('.ordSugarItem');
    var ordIceItem = document.querySelectorAll('.ordIceItem');
    var ordAsideItem = document.querySelectorAll('.ordAsideItem');
    var ordSeasoningItem = document.querySelectorAll('.ordSeasoningItem');

    var orderPageRightSideBottomBtn1 = document.getElementById('orderPageRightSideBottomBtn1'); // 出單按鈕
    var orderPageRightSideBottomBtn2 = document.getElementById("orderPageRightSideBottomBtn2"); // 整單取消按鈕
    var orderPageRightSideBottomBtn3 = document.getElementById("orderPageRightSideBottomBtn3"); // 結帳按鈕

    var ordPplPlus = document.getElementById("ordPplPlus"); // 加人數
    var ordPplMinus = document.getElementById("ordPplMinus"); // 減人數
    var ordPplAmt = document.getElementById("ordPplAmt"); // 顯示人數

    var orderList = document.getElementById("orderList"); //訂單編號
    var inOrOut = document.getElementById("inOrOut"); //內用外帶
    var number = document.getElementById("number"); //桌號

    var orderPageArrowDL = document.getElementById("orderPageArrowDL"); // 品項的左箭頭
    var orderPageArrowDR = document.getElementById("orderPageArrowDR"); // 品項的右箭頭

    var ordSan = document.getElementById("ordSan"); // 商品類別（三明治）
    var ordPas = document.getElementById("ordPas"); // 商品類別（義大利麵）
    var ordHam = document.getElementById("ordHam"); // 商品類別（漢堡）
    var ordMuf = document.getElementById("ordMuf"); // 商品類別（瑪芬堡）
    var ordSwe = document.getElementById("ordSwe"); // 商品類別（甜點）
    var ordCof = document.getElementById("ordCof"); // 商品類別（咖啡）
    var ordDri = document.getElementById("ordDri"); // 商品類別（飲料）

    // =========================

    // 把basicInfo存進localStorage
    function ordSaveBasicInfo() {
        localStorage.setItem("basicInfo", JSON.stringify(basicInfoGet));
    };

    // 把basicInfo從localStorage裡抓出來
    function ordLoadBasicInfo() {
        basicInfoGet = JSON.parse(localStorage.getItem("basicInfo"));
    }
    ordLoadBasicInfo();



    var ordList = basicInfoGet[0].orderList;// 訂單編號





    // 接收basicInfo資料
    function ordReceiveBasicInfo() {
        // ordLoadBasicInfo();

        // 把basicInfo的資料先推入購物車陣列
        ordProdCartWithBasicInfo.push(basicInfoGet[0]);
        localStorage.setItem("ordProdCartWithBasicInfo", JSON.stringify(ordProdCartWithBasicInfo));

        // 輸入訂單編號
        orderList.innerHTML = basicInfoGet[0].orderList;

        // 輸入內用外帶
        if (basicInfoGet[0].inOrOut == 'in') {
            inOrOut.innerHTML = "內用";
        } else {
            inOrOut.innerHTML = "外帶";
        };
        // 輸入桌號
        number.innerHTML = basicInfoGet[0].number;

    };
    ordReceiveBasicInfo();




    // 加減人數
    function ordPplAdjust() {
        let ordPplAmtShow = 0;

        // ordPplAmt.innerHTML = ordPplAmtShow;

        ordPplPlus.addEventListener("click", function () {
            ordPplAmtShow++;
            ordPplAmt.innerHTML = ordPplAmtShow;
            basicInfoGet[0].ppl = ordPplAmtShow;

            ordSaveBasicInfo();
            localStorage.setItem(`ordSavePpl_${ordList}`, JSON.stringify(ordPplAmtShow));


        });
        ordPplMinus.addEventListener("click", function () {
            ordPplAmtShow--;
            if (ordPplAmtShow < 0) {
                ordPplAmtShow = 0;
                ordPplAmt.innerHTML = ordPplAmtShow;
                basicInfoGet[0].ppl = ordPplAmtShow;

                ordSaveBasicInfo();
                localStorage.setItem(`ordSavePpl_${ordList}`, JSON.stringify(ordPplAmtShow));
            };
            ordPplAmt.innerHTML = ordPplAmtShow;
            basicInfoGet[0].ppl = ordPplAmtShow;

            ordSaveBasicInfo();
            localStorage.setItem(`ordSavePpl_${ordList}`, JSON.stringify(ordPplAmtShow));
        });
    };
    ordPplAdjust();

    // 抓回localstorage裡的人數
    function ordReloadPpl() {
        ordReloadPplAmt = JSON.parse(localStorage.getItem(`ordSavePpl_${ordList}`));
        ordPplAmt.innerHTML = ordReloadPplAmt;

        // 把人數放進basicInfo的ppl裡面
        basicInfoGet[0].ppl = ordReloadPplAmt;

        ordSaveBasicInfo();
    };
    ordReloadPpl();


    // =========================


    // call ajax(all prodInfo)
    function ordReceiveProdInfo() {
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "ordProdData.php";
        var asynchronous = true;

        ajax.open(method, url, asynchronous);
        // sending ajax request
        ajax.send();
        // var ordProdInfo;

        // receiving response from data.php
        ajax.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                ordProdInfo = JSON.parse(this.responseText);
                console.log(ordProdInfo); // for debugging
                // console.log(this); // XMLHttpRequest()
                localStorage.setItem("ordSaveProdInfo", JSON.stringify(ordProdInfo));
                // 先把裝品項的陣列依照類別分成四個小陣列
                for (let g = 0; g < ordProdInfo.length; g++) {
                    if (ordProdInfo[g].PRO_CATA_NO == 1) {
                        ordSanCart.push(ordProdInfo[g]);
                        localStorage.setItem("ordSaveSanInfo", JSON.stringify(ordSanCart));
                        ordReceiveSanInfo();
                    } else if (ordProdInfo[g].PRO_CATA_NO == 2) {
                        ordPasCart.push(ordProdInfo[g]);
                    } else if (ordProdInfo[g].PRO_CATA_NO == 3) {
                        ordHamCart.push(ordProdInfo[g]);
                    } else if (ordProdInfo[g].PRO_CATA_NO == 4) {
                        ordMufCart.push(ordProdInfo[g]);
                    } else if (ordProdInfo[g].PRO_CATA_NO == 5) {
                        ordSweCart.push(ordProdInfo[g]);
                    } else if (ordProdInfo[g].PRO_CATA_NO == 6) {
                        ordCofCart.push(ordProdInfo[g]);
                    } else if (ordProdInfo[g].PRO_CATA_NO == 7) {
                        ordDriCart.push(ordProdInfo[g]);
                    };
                };
            };
        };
    };
    ordReceiveProdInfo();


    // call ajax(sanInfo)
    function ordReceiveSanInfo() {
        // localStorage.setItem("ordSaveSanInfo", JSON.stringify(ordSanCart));

        // 顯示右側換頁箭頭按鈕
        orderPageArrowDR.style.display = "block";

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";

        // looping through the data 把從資料庫抓出來的商品品項加到HTML頁面上
        for (let g = 0; g < ordSanCart.length - 1; g++) {
            let ordDisCount = Number(ordSanCart[g].before);
            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
            if (ordDisCount > Number(ordSanCart[g].PRO_ITEM_PRICE)) {
                // 讓變數帶入css指令，讓他價錢變色
                ordDisCount = "border: 5px solid #67A8CE; Box-sizing: border-box;"
            };
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv" style="${ordDisCount}">
                                            <img src="./assets/${ordSanCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordSanCart[g].PRO_ITEM_NO}">${ordSanCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };
    ordReceiveSanInfo();


    // 當三明治換頁的時候
    function ordSanShow() {
        orderPageArrowDR.addEventListener("click", function () {
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "block";

            orderPageItemDivAll.innerHTML = "";
            let ordProdItemDiv = "";
            for (let g = ordSanCart.length - 1; g < ordSanCart.length; g++) {
                // 渲染商品進HTML頁面
                ordProdItemDiv = `<div class="orderPageItemDiv">
                                        <img src="./assets/${ordSanCart[g].PRO_ITEM_NO}.jpg" alt="">
                                        <div class="orderPageItemDivBottomBlack">
                                            <span class="ordProdName" id="${ordSanCart[g].PRO_ITEM_NO}">${ordSanCart[g].PRO_ITEM_NAME}</span>
                                        </div>
                                    </div>`;
            };
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        });
        // 點擊左側按鈕可以回到一開始的default點餐
        orderPageArrowDL.addEventListener("click", function () {
            orderPageArrowDL.style.display = "none";
            orderPageArrowDR.style.display = "block";
            ordReceiveSanInfo();
        });
    };

    ordSanShow();
    ordSan.addEventListener("click", function () {
        ordReceiveSanInfo();
        orderPageArrowDL.style.display = "none";
        orderPageArrowDR.style.display = "block";
    });


    // call ajax(pasInfo)
    function ordReceivePasInfo() {
        localStorage.setItem("ordSavePasInfo", JSON.stringify(ordPasCart));

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordPasCart.length; g++) {
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv">
                                            <img src="./assets/${ordPasCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordPasCart[g].PRO_ITEM_NO}">${ordPasCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };

    function ordPasShow() {
        ordPas.addEventListener("click", function () {
            ordReceivePasInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordPasShow();


    // call ajax(hamInfo)
    function ordReceiveHamInfo() {
        localStorage.setItem("ordSaveHamInfo", JSON.stringify(ordHamCart));

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordHamCart.length; g++) {
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv">
                                            <img src="./assets/${ordHamCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordHamCart[g].PRO_ITEM_NO}">${ordHamCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };


    function ordHamShow() {

        ordHam.addEventListener("click", function () {
            ordReceiveHamInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordHamShow();

    // call ajax(mufInfo)
    function ordReceiveMufInfo() {
        localStorage.setItem("ordSaveMufInfo", JSON.stringify(ordMufCart));

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordMufCart.length; g++) {
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv">
                                            <img src="./assets/${ordMufCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordMufCart[g].PRO_ITEM_NO}">${ordMufCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };

    function ordMufShow() {
        ordMuf.addEventListener("click", function () {
            ordReceiveMufInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordMufShow();

    // call ajax(sweInfo)
    function ordReceiveSweInfo() {
        localStorage.setItem("ordSaveSweInfo", JSON.stringify(ordSweCart));

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordSweCart.length; g++) {
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv">
                                            <img src="./assets/${ordSweCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordSweCart[g].PRO_ITEM_NO}">${ordSweCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };


    function ordSweShow() {
        ordSwe.addEventListener("click", function () {
            ordReceiveSweInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordSweShow();


    // call ajax(cofInfo)
    function ordReceiveCofInfo() {
        localStorage.setItem("ordSaveCofInfo", JSON.stringify(ordCofCart));

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordCofCart.length; g++) {
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv">
                                            <img src="./assets/${ordCofCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordCofCart[g].PRO_ITEM_NO}">${ordCofCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };


    function ordCofShow() {
        ordCof.addEventListener("click", function () {
            ordReceiveCofInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordCofShow();



    // call ajax(driInfo)
    function ordReceiveDriInfo() {
        localStorage.setItem("ordSaveDriInfo", JSON.stringify(ordDriCart));

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordDriCart.length; g++) {
            // 渲染商品進HTML頁面

            ordProdItemDiv = `<div class="orderPageItemDiv">
                                            <img src="./assets/${ordDriCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordDriCart[g].PRO_ITEM_NO}">${ordDriCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };


    function ordDriShow() {
        ordDri.addEventListener("click", function () {
            ordReceiveDriInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordDriShow();


    function ordReceiveToppingInfo() {
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "ordToppingData.php";
        var asynchronous = true;

        ajax.open(method, url, asynchronous);
        // sending ajax request
        ajax.send();
        // var ordToppingInfo;

        // receiving response from data.php
        ajax.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                ordToppingInfo = JSON.parse(this.responseText);
                console.log(ordToppingInfo); // for debugging
                // console.log(this); // XMLHttpRequest()

                localStorage.setItem("ordSaveToppingInfo", JSON.stringify(ordToppingInfo));

                // 先把裝配料的陣列依照類別分成四個小陣列
                for (let g = 0; g < ordToppingInfo.length; g++) {
                    if (ordToppingInfo[g].FILLING_CATA_NO == 1) {
                        ordSugarCart.push(ordToppingInfo[g]);
                    } else if (ordToppingInfo[g].FILLING_CATA_NO == 2) {
                        ordIceCart.push(ordToppingInfo[g]);
                    } else if (ordToppingInfo[g].FILLING_CATA_NO == 3) {
                        ordAsideCart.push(ordToppingInfo[g]);
                    } else if (ordToppingInfo[g].FILLING_CATA_NO == 4) {
                        ordSeasoningCart.push(ordToppingInfo[g]);
                    };
                };

                // looping through the data 把從資料庫抓出來的配料品項加到HTML頁面上
                for (let s = 0; s < ordSugarCart.length; s++) {
                    ordSugarItem[s].innerHTML = ordSugarCart[s].FILLING_ITEM_NAME;
                };
                for (let i = 0; i < ordIceCart.length; i++) {
                    ordIceItem[i].innerHTML = ordIceCart[i].FILLING_ITEM_NAME;
                };
                for (let a = 0; a < ordAsideCart.length; a++) {
                    ordAsideItem[a].innerHTML = ordAsideCart[a].FILLING_ITEM_NAME;
                };
                for (let o = 0; o < ordSeasoningCart.length; o++) {
                    ordSeasoningItem[o].innerHTML = ordSeasoningCart[o].FILLING_ITEM_NAME;
                };
            };
        };
    };
    ordReceiveToppingInfo();


    // 當頁面重新整理的時候，已經存在localStorage的資料會被重新撈出與印在頁面上
    function ordReload() {

        if (localStorage.getItem(`ordSaveProdInCart_${ordList}`)) {
            orderPageRightSideBottomBtn2.style.pointerEvents = "none";
            orderPageRightSideBottomBtn2.style.backgroundColor = "#ccc";
            ordLoadProdInCartHist();

            let ordReloadHTML = '';

            orderPageLeftSideMidItemAll.innerHTML = " ";
            for (let k = 0; k < ordGetProd.length; k++) {
                if (ordGetProd[k].status != 2) {
                    if (ordGetProd[k].topping.length > 0) {
                        // 把裝配料的容器清空
                        let ordtoppingReloadHTML = '';
                        let ordToppingTtlNum = 0;

                        for (let s = 0; s < ordGetProd[k].topping.length; s++) {
                            ordtoppingReloadHTML += `<span class="ordToppingSec"> ${ordGetProd[k].topping[s]}</span>`;
                            // 把配料的價錢將加算出總價
                            ordToppingTtlNum += parseInt(ordGetProd[k].topping[s].split("$")[1]);
                        };

                        ordReloadHTML += `
                                    <div class="orderPageLeftSideMidItem" style="pointer-events:none; color:#ccc">
                                        <div class="orderPageLeftSideMidItemTop">
                                            <span class="ordSele ${ordGetProd[k].PRO_CATA_NO}" data-itemno=${ordGetProd[k].PRO_ITEM_NO}>${ordGetProd[k].PRO_ITEM_NAME}</span>
                                            <span>1</span>
                                        </div>
                                        <div class="orderPageLeftSideMidItemBottom">
                                            <div class="orderPageLeftSideMidToppings" data-sec=${k}>
                                            ${ordtoppingReloadHTML}
                                            </div>
                                            <span class="ordItemPr" data-itempr=${ordGetProd[k].PRO_ITEM_PRICE}>$${parseInt(ordGetProd[k].PRO_ITEM_PRICE) + ordToppingTtlNum}</span>
                                        </div> 
                                    </div>
                                `;
                    } else {
                        ordReloadHTML += `
                            <div class="orderPageLeftSideMidItem" style="pointer-events:none; color:#ccc">
                                <div class="orderPageLeftSideMidItemTop">
                                    <span class="ordSele ${ordGetProd[k].PRO_CATA_NO}" data-itemno=${ordGetProd[k].PRO_ITEM_NO}>${ordGetProd[k].PRO_ITEM_NAME}</span>
                                    <span>1</span>
                                </div>
                                <div class="orderPageLeftSideMidItemBottom">
                                    <div class="orderPageLeftSideMidToppings" data-sec=${k}>
                                    </div>
                                    <span class="ordItemPr" data-itempr=${ordGetProd[k].PRO_ITEM_PRICE}>$${ordGetProd[k].PRO_ITEM_PRICE}</span>
                                </div> 
                            </div>
                        `;
                    };
                };
                orderPageLeftSideMidItemAll.innerHTML = ordReloadHTML;

                // 把資訊存入購物車On中
                ordAddProdItemToCartOn();

                // 計算購物車裡商品數量
                ordAllProdNumInCart();

                // 計算金額
                ordTotProdAmt();
            };
        };
    };
    ordReload();




    function ordAddToList() {
        orderPageItemDivAll.addEventListener("click", function () {
            // 點餐按鈕
            let ordAddToCart = document.querySelectorAll(".orderPageItemDiv");
            // let orderPageRightSideTop = document.getElementById("orderPageRightSideTop");
            event.preventDefault();
            event.stopImmediatePropagation();

            for (let i = 0; i < ordAddToCart.length; i++) {
                ordAddToCart[i].addEventListener("click", function (e) {
                    // 阻止冒泡事件
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    // 把值推入/拉出陣列
                    // 清空div
                    // 跑for迴圈

                    let ordChoseNum = Number(this.childNodes[3].childNodes[1].id);

                    // 把被選中的商品加入購物車的陣列裡，並同步存到localStorage
                    ordAddProdItemToCart(ordProdInfo[ordChoseNum - 1]);
                    // 叫出暫存購物車的資料
                    ordLoadProdInTempCartHist();

                    // 先判斷暫存的購物車裡面有沒有東西
                    if (ordGetTempProd != null) {
                        // 先清空要放入迴圈內容的容器
                        let ordReloadHTML = '';

                        // 以暫存的購物車的長度為基準，從此之後開始新增商品（因為點選完商品之後資料就會進入暫存購物車，所以只有第一次暫存購物車是null，之後都會跑這邊的function，且因為購物車的資訊比暫存購物車的資訊更早進去，所以兩者永遠相差一）
                        for (let k = ordGetTempProd.length; k < ordProdCart.length; k++) {
                            // 設定變數 ＝ before的價錢（未折價錢的價錢）
                            let ordDisCount = Number(ordProdCart[k].before);
                            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
                            if (ordDisCount > Number(ordProdCart[k].PRO_ITEM_PRICE)) {
                                // 讓變數帶入css指令，讓他價錢變色
                                ordDisCount = "color: #E98E89;"
                            };
                            ordReloadHTML += `
                                <div class="orderPageLeftSideMidItem">
                                    <div class="orderPageLeftSideMidItemTop">
                                        <div class="orderPageLeftSideMidItemDelete">
                                            <img src="./assets/icon_cancel.png" alt="" data-cnt='${k}'>
                                        </div>
                                        <span class="ordSele ${ordProdCart[k].PRO_CATA_NO}" data-itemno=${ordProdCart[k].PRO_ITEM_NO}>${ordProdCart[k].PRO_ITEM_NAME}</span>
                                        <span>1</span>
                                    </div>
                                    <div class="orderPageLeftSideMidItemBottom">
                                        <div class="orderPageLeftSideMidToppings" data-sec=${k}></div>
                                        <span class="ordItemPr" data-itempr=${ordProdCart[k].PRO_ITEM_PRICE} style = "${ordDisCount}">$${ordProdCart[k].PRO_ITEM_PRICE}</span>
                                    </div> 
                                </div>
                            `;
                        };
                        orderPageLeftSideMidItemAll.insertAdjacentHTML("beforeend", `${ordReloadHTML}`);

                    } else {
                        let ordHTML = '';
                        // 動態新增標籤與data-set
                        for (let k = 0; k < ordProdCart.length; k++) {
                            let ordDisCount = Number(ordProdCart[k].before);

                            if (ordDisCount > Number(ordProdCart[k].PRO_ITEM_PRICE)) {
                                ordDisCount = "color: #E98E89;"
                            };
                            ordHTML += `
                                <div class="orderPageLeftSideMidItem">
                                    <div class="orderPageLeftSideMidItemTop">
                                        <div class="orderPageLeftSideMidItemDelete">
                                            <img src="./assets/icon_cancel.png" alt="" data-cnt='${k}'>
                                        </div>
                                        <span class="ordSele ${ordProdCart[k].PRO_CATA_NO}" data-itemno=${ordProdCart[k].PRO_ITEM_NO}>${ordProdCart[k].PRO_ITEM_NAME}</span>
                                        <span>1</span>
                                    </div>
                                    <div class="orderPageLeftSideMidItemBottom">
                                        <div class="orderPageLeftSideMidToppings" data-sec=${k}></div>
                                        <span class="ordItemPr" data-itempr=${ordProdCart[k].PRO_ITEM_PRICE} style = "${ordDisCount}">$${ordProdCart[k].PRO_ITEM_PRICE}</span>
                                    </div> 
                                </div>
                            `;
                        };
                        orderPageLeftSideMidItemAll.innerHTML = ordHTML;
                    };
                    // 把購物車資訊存進屬於"暫時訂單的"localStorage與暫存購物車
                    ordAddProdItemToTempCart();
                    // 計算購物車裡商品數量
                    ordAllProdNumInCart();
                    // 計算購物車內的總品項金額
                    ordTotProdAmt();
                });
            };
        });
    };
    ordAddToList();


    function ordDeleteProd() {
        orderPageLeftSideMidItemAll.addEventListener("click", function (e) {

            if (e.target.nodeName == 'IMG') {
                // 讓被刪除的品項的狀態改為2，表示被刪除
                ordLoadProdInCartHist();
                // console.log("會成功ㄇ ", ordGetProd[parseInt(e.target.dataset.cnt)])
                ordGetProd[parseInt(e.target.dataset.cnt)].status = 2;

                // 把狀態改變的品項更新至購物車裡
                ordProdCart[parseInt(e.target.dataset.cnt)] = ordGetProd[parseInt(e.target.dataset.cnt)];
                // 把資料存入購物車的localStorage裡面
                ordSaveProdInCartHist();

                // ordGetDelProd.splice(parseInt(e.target.dataset.cnt), 1);
                orderPageLeftSideMidItemAll.removeChild(e.target.parentNode.parentNode.parentNode);

                // 放入localStorage
                ordSaveProdInCartHist();
                ordTotProdAmt();
                ordAllProdNumInCart();
            };
        });
    };
    ordDeleteProd();


    function ordToppingSecShow() {
        ordAddToList();
        orderPageLeftSideMidItemAll.addEventListener("click", function (e) {

            ordProdInfo = JSON.parse(localStorage.getItem("ordSaveProdInfo"));

            if (e.target.nodeName == 'DIV') {
                $(ordToppingSec).toggle(); // orderPageLeftSideMid
                $(e.target).toggleClass("lightblue"); // orderPageLeftSideMidItemTop

                // 先判斷所點選的商品的編號，再決定要讓哪些配料項目出現
                if (e.target.childNodes[3].classList[1] == 1 || e.target.childNodes[3].classList[1] == 2 || e.target.childNodes[3].classList[1] == 3 || e.target.childNodes[3].classList[1] == 4) {
                    ordToppingSecAside.style.display = "block";
                    ordToppingSecSeasoning.style.display = "block";
                    ordToppingSecSu.style.display = "none";
                    ordToppingSecIce.style.display = "none";

                    // 讓配料出現 for ordFood
                    $(ordAside).click(function () {
                        $("#ordAsideAll").toggle();
                    });
                    // 讓調味出現 for ordFood
                    $(ordSeasoning).click(function () {
                        $("#ordSeasoningAll").toggle();
                    });
                    // 弄一個容器（讓他等加），用parseInt(0)讓他初值變成數字0
                    let ordToppingTtlPr = parseInt(0);

                    for (let s = 0; s < ordAsideCart.length; s++) {
                        // let ordToppingTxt = '';
                        ordAsideItem[s].addEventListener("click", function (e) {
                            e.preventDefault();
                            e.stopImmediatePropagation();

                            document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].innerHTML += `<span class="ordToppingSec"> ${ordAsideCart[s].FILLING_ITEM_NAME}  $${ordAsideCart[s].FILLING_ITEM_PRICE}</span>`;

                            let ordLightBlueNum = parseInt(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].dataset.sec);

                            ordProdCart[ordLightBlueNum].topping.push(`${ordAsideCart[s].FILLING_ITEM_NAME} $${ordAsideCart[s].FILLING_ITEM_PRICE}`);



                            console.log("ejijeij", e.target)

                            // 單除抓出配料的錢
                            ordToppingTtlPr += parseInt(ordAsideCart[s].FILLING_ITEM_PRICE);
                            // 把商品的價錢轉換為數字
                            let ordPrdoItemPr = Number(ordProdCart[ordLightBlueNum].PRO_ITEM_PRICE);
                            // 用一個容器來裝配料與商品加總的總數
                            let ordProdnToppingPr = ordPrdoItemPr + ordToppingTtlPr;
                            // 讓總數加到該商品內
                            document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[3].innerHTML = "$" + ordProdnToppingPr;

                            ordTotProdAmt();
                        });
                        ordSaveProdInCartHist();
                    };

                    for (let s = 0; s < ordSeasoningCart.length; s++) {
                        // let ordToppingTxt = '';
                        ordSeasoningItem[s].addEventListener("click", function (e) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            // console.log("3333", document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1]);
                            document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].innerHTML += `<span class="ordToppingSec"> ${ordSeasoningCart[s].FILLING_ITEM_NAME} $${ordSeasoningCart[s].FILLING_ITEM_PRICE}</span>`;

                            let ordLightBlueNum = parseInt(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].dataset.sec);

                            ordProdCart[ordLightBlueNum].topping.push(`${ordSeasoningCart[s].FILLING_ITEM_NAME} $${ordSeasoningCart[s].FILLING_ITEM_PRICE}`);

                            ordSaveProdInCartHist();
                        });
                    };

                } else if (e.target.childNodes[3].classList[1] == 6 || e.target.childNodes[3].classList[1] == 7) {
                    ordToppingSecAside.style.display = "none";
                    ordToppingSecSeasoning.style.display = "none";
                    ordToppingSecSu.style.display = "block";
                    ordToppingSecIce.style.display = "block";
                    // 讓糖度出現 for ordDrink
                    $(ordSugar).click(function () {
                        $("#ordSugarAll").toggle();
                    });

                    // 讓冰塊出現 for ordDrink
                    $(ordIce).click(function () {
                        $("#ordIceAll").toggle();
                    });

                    for (let s = 0; s < ordSugarCart.length; s++) {
                        // let ordToppingTxt = '';
                        ordSugarItem[s].addEventListener("click", function (e) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            // console.log("3333", document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1]);
                            document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].innerHTML += `<span class="ordToppingSec"> ${ordSugarCart[s].FILLING_ITEM_NAME} $${ordSugarCart[s].FILLING_ITEM_PRICE}</span>`;


                            let ordLightBlueNum = parseInt(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].dataset.sec);

                            ordProdCart[ordLightBlueNum].topping.push(`${ordSugarCart[s].FILLING_ITEM_NAME} $${ordSugarCart[s].FILLING_ITEM_PRICE}`);
                            ordSaveProdInCartHist();
                        });
                    };

                    for (let s = 0; s < ordIceCart.length; s++) {
                        // let ordToppingTxt = '';
                        ordIceItem[s].addEventListener("click", function (e) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            // console.log("3333", document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1]);
                            document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].innerHTML += `<span class="ordToppingSec"> ${ordIceCart[s].FILLING_ITEM_NAME} $${ordIceCart[s].FILLING_ITEM_PRICE}</span>`;

                            let ordLightBlueNum = parseInt(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].dataset.sec);

                            ordProdCart[ordLightBlueNum].topping.push(`${ordIceCart[s].FILLING_ITEM_NAME} $${ordIceCart[s].FILLING_ITEM_PRICE}`);
                            ordSaveProdInCartHist();
                        });
                    };
                } else {
                    ordToppingSecAside.style.display = "none";
                    ordToppingSecSeasoning.style.display = "none";
                    ordToppingSecSu.style.display = "none";
                    ordToppingSecIce.style.display = "none";
                };
            };
        });
    };
    ordToppingSecShow();




    // 把新商品加進購物車
    function ordAddProdItemToCart(ordProdInfo) {

        ordProdInfo.status = 0; // 未出餐
        ordProdInfo.state = 0; // 後廚
        ordProdInfo.topping = []; // 加一個陣列紀錄配料

        ordProdCart.push(ordProdInfo);
        ordSaveProdInCartHist();
    };


    function ordAddProdItemToCartOn() {
        // 讓頁面重整的時候，購物車內的商品的狀態呈現1出餐
        for (let w = 0; w < ordGetProd.length; w++) {
            if (ordGetProd[w].status != 2) {
                ordGetProd[w].status = 1; // 出餐
            };
        };

        // 讓購物車On陣列裡的資料等於帶入狀態1的購物車的資料
        ordProdCartOn = ordGetProd;
        // 把資料存入購物車On的localStorage裡面
        ordSaveProdInCartOnHist();
        // 把資料從購物車On的localStorage裡面抓出來
        ordLoadProdInCartOnHist();
        // 讓購物車陣列裡的資料等於帶入狀態1的購物車On的資料
        ordProdCart = ordGetOnProd;

        // 把資料存入購物車的localStorage裡面
        ordSaveProdInCartHist();

    };

    // 把新商品加進暫存購物車
    function ordAddProdItemToTempCart() {
        // 把購物車從localstorage撈出，再放入暫時購物車的陣列裡
        ordLoadProdInCartHist();
        ordTempProdCart = ordGetProd;

        // 再把資料存進暫時購物車的localStorage
        ordSaveProdInTempCartHist();
    };


    // 整筆取消
    document.getElementById("orderPageRightSideBottomBtn2").addEventListener("click", ordClearCart);

    // 把購物車的所有品項與頁面上的金額、數量顯示清除
    function ordClearCart() {
        ordProdCart = [];
        ordProdCartOn = [];
        ordTempProdCart = [];
        orderPageLeftSideMidItemAll.innerHTML = "";
        ordTotAmtShow.innerText = 0;
        ordTotNumShow.innerText = 0;

        ordSaveProdInCartHist();
        ordSaveProdInCartOnHist();
        ordSaveProdInTempCartHist();
    };


    // 計算購物車內的商品數量
    function ordAllProdNumInCart() {
        // ordProdCart = JSON.parse(localStorage.getItem("ordSaveProdInCart"));
        ordLoadProdInCartHist();
        let ordAllProdNum = 0;

        for (let i in ordGetProd) {
            if (ordGetProd[i].status != 2) {
                ordAllProdNum += Number(ordGetProd[i].PRO_ITEM_ONOFF);
            };
            ordTotNumShow.innerText = ordAllProdNum;
        };
    };


    // 計算購物車內的總品項金額
    function ordTotProdAmt() {
        let ordItemPr = document.querySelectorAll(".ordItemPr");
        let ordTotAmt = parseInt(0);
        let ordItemTtlNum = "";

        for (let p = 0; p < ordItemPr.length; p++) {
            // console.log("dji", ordItemPr[p].innerText);
            ordItemTtlNum = ordItemPr[p].innerText;

            // 因為切割字串之後會變成陣列，[1]是為了選到數字
            ordItemTtlNum = parseInt(ordItemTtlNum.split("$")[1]);
            ordTotAmt += ordItemTtlNum;
            // console.log("!!!!???", ordTotAmt)
        };
        ordTotAmtShow.innerText = ordTotAmt;
        // console.log("LLLLLLLLLLL", typeof (ordTotAmt))
    };




    // 出單
    orderPageRightSideBottomBtn1.addEventListener("click", function () {
        ordReload();
        ordTotProdAmt();

        ordLoadProdInCartOnHist();
        ordLoadBasicInfo();

        // 要傳給廚房的資料
        var ordToKitchen = [];

        ordToKitchen = basicInfoGet.concat(ordGetOnProd);
        localStorage.setItem(`${ordList}`, JSON.stringify(ordToKitchen));
    });







    // 結帳
    orderPageRightSideBottomBtn3.addEventListener("click", function () {
        // 把左側餐點顯示清空
        orderPageLeftSideMidItemAll.innerHTML = " ";

        // 把點餐資訊輸入資料庫
        ordSentInfotoDb();
    });

    function ordSentInfotoDb() {
        // Creating a XHR object 
        let ordTotOrderProd = new XMLHttpRequest();
        let url = "ordSetData.php";
        // open a connection 
        ordTotOrderProd.open("POST", url, true);
        // Set the request header i.e. which type of content you are sending 
        ordTotOrderProd.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // 傳送資料去php
        ordTotOrderProd.send("ordTotOrder=" + JSON.stringify(ordProdCartOn));
        // 測試傳送的陣列內是否有資料
        console.log(ordProdCartOn);


        // 測試有php有沒有接到資料
        ordTotOrderProd.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                ordReceiveOrder = JSON.parse(this.responseText);
                console.log(ordReceiveOrder); // for debugging
            };
        };
    };


    // 把購物車資訊存進localStorage
    function ordSaveProdInCartHist() {
        localStorage.setItem(`ordSaveProdInCart_${ordList}`, JSON.stringify(ordProdCart));
    };
    // 把暫時購物車資訊存進localStorage
    function ordSaveProdInTempCartHist() {
        localStorage.setItem(`ordSaveProdInTempCart_${ordList}`, JSON.stringify(ordTempProdCart));
    };
    // 把購物車On資訊存進localStorage
    function ordSaveProdInCartOnHist() {
        localStorage.setItem(`ordSaveProdInCartOnHist_${ordList}`, JSON.stringify(ordProdCartOn));
    };


    // 把購物車資訊從localStorage裡抓出來
    function ordLoadProdInCartHist() {
        ordGetProd = JSON.parse(localStorage.getItem(`ordSaveProdInCart_${ordList}`));
    };
    // 把暫時購物車資訊從localStorage裡抓出來
    function ordLoadProdInTempCartHist() {
        ordGetTempProd = JSON.parse(localStorage.getItem(`ordSaveProdInTempCart_${ordList}`));
    };
    // 把購物車On資訊從localStorage裡抓出來
    function ordLoadProdInCartOnHist() {
        ordGetOnProd = JSON.parse(localStorage.getItem(`ordSaveProdInCartOnHist_${ordList}`));
    };
};

