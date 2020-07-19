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

    var ordToppingSec = document.getElementById("ordToppingSec");

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


    var ordNavList = document.querySelector(".ordNavList");
    // console.log(ordNavList)


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
                    } else if (ordProdInfo[g].PRO_CATA_NO == 2) {
                        ordPasCart.push(ordProdInfo[g]);
                        localStorage.setItem("ordSavePasInfo", JSON.stringify(ordPasCart));
                    } else if (ordProdInfo[g].PRO_CATA_NO == 3) {
                        ordHamCart.push(ordProdInfo[g]);
                        localStorage.setItem("ordSaveHamInfo", JSON.stringify(ordHamCart));
                    } else if (ordProdInfo[g].PRO_CATA_NO == 4) {
                        ordMufCart.push(ordProdInfo[g]);
                        localStorage.setItem("ordSaveMufInfo", JSON.stringify(ordMufCart));
                    } else if (ordProdInfo[g].PRO_CATA_NO == 5) {
                        ordSweCart.push(ordProdInfo[g]);
                        localStorage.setItem("ordSaveSweInfo", JSON.stringify(ordSweCart));
                    } else if (ordProdInfo[g].PRO_CATA_NO == 6) {
                        ordCofCart.push(ordProdInfo[g]);
                        localStorage.setItem("ordSaveCofInfo", JSON.stringify(ordCofCart));
                    } else if (ordProdInfo[g].PRO_CATA_NO == 7) {
                        ordDriCart.push(ordProdInfo[g]);
                        localStorage.setItem("ordSaveDriInfo", JSON.stringify(ordDriCart));
                    };
                };
            };
        };
    };
    ordReceiveProdInfo();

    // 當大種類被下架時
    function ordProdOnOff() {
        // 三明治
        ordProdSan = JSON.parse(localStorage.getItem("ordSaveSanInfo"));
        let ordSanTitle = "";

        if (ordProdSan[0].PRO_CATA_ONOFF == 1) {
            ordSanTitle = `<li id="ordSan">${ordProdSan[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordSanTitle);
        } else {
            ordSanTitle = `<li id="ordSan" style="display:none">${ordProdSan[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordSanTitle);
        }


        // 義大利麵
        ordProdPas = JSON.parse(localStorage.getItem("ordSavePasInfo"));
        let ordPasTitle = "";
        if (ordProdPas[0].PRO_CATA_ONOFF == 1) {
            ordPasTitle = `<li id="ordPas">${ordProdPas[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordPasTitle);
        } else {
            ordPasTitle = `<li id="ordPas" style="display:none">${ordProdPas[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordPasTitle);
        };

        // 漢堡
        ordProdHam = JSON.parse(localStorage.getItem("ordSaveHamInfo"));
        let ordHamTitle = "";
        if (ordProdHam[0].PRO_CATA_ONOFF == 1) {
            ordHamTitle = `<li id="ordHam">${ordProdHam[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordHamTitle);
        } else {
            ordHamTitle = `<li id="ordHam" style="display:none">${ordProdHam[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordHamTitle);
        };

        // 瑪芬
        ordProMuf = JSON.parse(localStorage.getItem("ordSaveMufInfo"));
        let ordMufTitle = "";
        if (ordProMuf[0].PRO_CATA_ONOFF == 1) {
            ordMufTitle = `<li id="ordMuf">${ordProMuf[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordMufTitle);
        } else {
            ordMufTitle = `<li id="ordMuf" style="display:none">${ordProMuf[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordMufTitle);
        };

        // 甜點
        ordProSwe = JSON.parse(localStorage.getItem("ordSaveSweInfo"));
        let ordSweTitle = "";
        if (ordProSwe[0].PRO_CATA_ONOFF == 1) {
            ordSweTitle = `<li id="ordSwe">${ordProSwe[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordSweTitle);
        } else {
            ordSweTitle = `<li id="ordSwe" style="display:none">${ordProSwe[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordSweTitle);
        };

        // 咖啡
        ordProCof = JSON.parse(localStorage.getItem("ordSaveCofInfo"));
        let ordCofTitle = "";
        if (ordProCof[0].PRO_CATA_ONOFF == 1) {
            ordCofTitle = `<li id="ordCof">${ordProCof[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordCofTitle);
        } else {
            ordCofTitle = `<li id="ordCof" style="display:none">${ordProCof[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordCofTitle);
        };

        // 飲料

        ordProDri = JSON.parse(localStorage.getItem("ordSaveDriInfo"));
        let ordDriTitle = "";
        if (ordProDri[0].PRO_CATA_ONOFF == 1) {
            ordDriTitle = `<li id="ordDri">${ordProDri[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordDriTitle);
        } else {
            ordDriTitle = `<li id="ordDri" style="display:none">${ordProDri[0].PRO_CATA_NAME}</li>`;
            ordNavList.insertAdjacentHTML("beforeend", ordDriTitle);
        };
    }
    ordProdOnOff();


    console.log("位置", ordNavList.childNodes)

    // call ajax(sanInfo)
    function ordReceiveSanInfo() {
        // 顯示右側換頁箭頭按鈕
        orderPageArrowDR.style.display = "block";

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";

        // looping through the data 把從資料庫抓出來的商品品項加到HTML頁面上
        for (let g = 0; g < ordProdSan.length - 1; g++) {
            let ordDisCount = Number(ordProdSan[g].before);
            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
            if (ordDisCount > Number(ordProdSan[g].PRO_ITEM_PRICE)) {
                // 讓變數帶入css指令，讓他價錢變色
                ordDisCount = "border: 5px solid #F8C54E; Box-sizing: border-box;"
            } else { };
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv" style="${ordDisCount}">
                                                <img src="./assets/${ordProdSan[g].PRO_ITEM_NO}.jpg" alt="">
                                                <div class="orderPageItemDivBottomBlack">
                                                    <span class="ordProdName" id="${ordProdSan[g].PRO_ITEM_NO}">${ordProdSan[g].PRO_ITEM_NAME}</span>
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
            for (let g = ordProdSan.length - 1; g < ordProdSan.length; g++) {
                let ordDisCount = Number(ordProdSan[g].before);
                // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
                if (ordDisCount > Number(ordProdSan[g].PRO_ITEM_PRICE)) {
                    // 讓變數帶入css指令，讓他價錢變色
                    ordDisCount = "border: 5px solid #F8C54E; Box-sizing: border-box;"
                } else { };
                // 渲染商品進HTML頁面
                ordProdItemDiv = `<div class="orderPageItemDiv" style="${ordDisCount}">
                                        <img src="./assets/${ordProdSan[g].PRO_ITEM_NO}.jpg" alt="">
                                        <div class="orderPageItemDivBottomBlack">
                                            <span class="ordProdName" id="${ordProdSan[g].PRO_ITEM_NO}">${ordProdSan[g].PRO_ITEM_NAME}</span>
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

        ordNavList.childNodes[1].addEventListener("click", function () {
            ordReceiveSanInfo();
            orderPageArrowDL.style.display = "none";
            orderPageArrowDR.style.display = "block";
        });
    };
    ordSanShow();



    // call ajax(pasInfo)
    function ordReceivePasInfo() {

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordPasCart.length; g++) {
            let ordDisCount = Number(ordPasCart[g].before);
            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
            if (ordDisCount > Number(ordPasCart[g].PRO_ITEM_PRICE)) {
                // 讓變數帶入css指令，讓他價錢變色
                ordDisCount = "border: 5px solid #F8C54E; Box-sizing: border-box;"
            } else { };
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv"  style="${ordDisCount}">
                                            <img src="./assets/${ordPasCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordPasCart[g].PRO_ITEM_NO}">${ordPasCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };

    function ordPasShow() {
        ordNavList.childNodes[2].addEventListener("click", function () {
            ordReceivePasInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordPasShow();


    // // call ajax(hamInfo)
    function ordReceiveHamInfo() {

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordHamCart.length; g++) {
            let ordDisCount = Number(ordHamCart[g].before);
            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
            if (ordDisCount > Number(ordHamCart[g].PRO_ITEM_PRICE)) {
                // 讓變數帶入css指令，讓他價錢變色
                ordDisCount = "border: 5px solid #F8C54E; Box-sizing: border-box;"
            } else { };
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv" style="${ordDisCount}">
                                            <img src="./assets/${ordHamCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordHamCart[g].PRO_ITEM_NO}">${ordHamCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };

    function ordHamShow() {

        ordNavList.childNodes[3].addEventListener("click", function () {
            ordReceiveHamInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordHamShow();

    // // call ajax(mufInfo)
    function ordReceiveMufInfo() {

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordMufCart.length; g++) {
            let ordDisCount = Number(ordMufCart[g].before);
            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
            if (ordDisCount > Number(ordMufCart[g].PRO_ITEM_PRICE)) {
                // 讓變數帶入css指令，讓他價錢變色
                ordDisCount = "border: 5px solid #F8C54E; Box-sizing: border-box;"
            } else { };
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv" style="${ordDisCount}">
                                            <img src="./assets/${ordMufCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordMufCart[g].PRO_ITEM_NO}">${ordMufCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };

    function ordMufShow() {
        ordNavList.childNodes[4].addEventListener("click", function () {
            ordReceiveMufInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordMufShow();

    // call ajax(sweInfo)
    function ordReceiveSweInfo() {

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordSweCart.length; g++) {
            let ordDisCount = Number(ordSweCart[g].before);
            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
            if (ordDisCount > Number(ordSweCart[g].PRO_ITEM_PRICE)) {
                // 讓變數帶入css指令，讓他價錢變色
                ordDisCount = "border: 5px solid #F8C54E; Box-sizing: border-box;"
            } else { };
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv" style="${ordDisCount}">
                                            <img src="./assets/${ordSweCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordSweCart[g].PRO_ITEM_NO}">${ordSweCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };


    function ordSweShow() {
        ordNavList.childNodes[5].addEventListener("click", function () {
            ordReceiveSweInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordSweShow();


    // call ajax(cofInfo)
    function ordReceiveCofInfo() {

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordCofCart.length; g++) {
            let ordDisCount = Number(ordCofCart[g].before);
            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
            if (ordDisCount > Number(ordCofCart[g].PRO_ITEM_PRICE)) {
                // 讓變數帶入css指令，讓他價錢變色
                ordDisCount = "border: 5px solid #F8C54E; Box-sizing: border-box;"
            } else { };
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv" style="${ordDisCount}">
                                            <img src="./assets/${ordCofCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordCofCart[g].PRO_ITEM_NO}">${ordCofCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };


    function ordCofShow() {
        ordNavList.childNodes[6].addEventListener("click", function () {
            ordReceiveCofInfo();
            orderPageArrowDR.style.display = "none";
            orderPageArrowDL.style.display = "none";
        });
    };
    ordCofShow();



    // call ajax(driInfo)
    function ordReceiveDriInfo() {

        orderPageItemDivAll.innerHTML = "";
        let ordProdItemDiv = "";
        for (let g = 0; g < ordDriCart.length; g++) {
            let ordDisCount = Number(ordDriCart[g].before);
            // 如果before的價錢（未折價錢的價錢）> 折價後的價錢，即代表該商品有參與折扣
            if (ordDisCount > Number(ordDriCart[g].PRO_ITEM_PRICE)) {
                // 讓變數帶入css指令，讓他價錢變色
                ordDisCount = "border: 5px solid #F8C54E; Box-sizing: border-box;"
            } else { };
            // 渲染商品進HTML頁面
            ordProdItemDiv = `<div class="orderPageItemDiv" style="${ordDisCount}">
                                            <img src="./assets/${ordDriCart[g].PRO_ITEM_NO}.jpg" alt="">
                                            <div class="orderPageItemDivBottomBlack">
                                                <span class="ordProdName" id="${ordDriCart[g].PRO_ITEM_NO}">${ordDriCart[g].PRO_ITEM_NAME}</span>
                                            </div>
                                        </div>`;
            orderPageItemDivAll.insertAdjacentHTML("beforeend", ordProdItemDiv);
        };
    };


    function ordDriShow() {
        ordNavList.childNodes[7].addEventListener("click", function () {
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
                ordToppingSec.innerHTML = "";
                // 糖份
                let ordToppingSuSec = "";
                ordToppingSuSec = `<div class="ordToppingSecSu">
                                <button class="ordFillBtn" id="ordSugar" data-timer=0>${ordSugarCart[0].FILLING_CATA_NAME}</button>
                                <div id="ordSugarAll">
                                </div>
                            </div>`;

                ordToppingSec.insertAdjacentHTML("beforeend", ordToppingSuSec);
                // 冰塊
                let ordToppingIceSec = "";
                ordToppingIceSec = `<div class="ordToppingSecIce">
                                <button class="ordFillBtn" id="ordIce" data-timer=0>${ordIceCart[0].FILLING_CATA_NAME}</button>
                                <div id="ordIceAll">
                                </div>
                            </div>`;
                ordToppingSec.insertAdjacentHTML("beforeend", ordToppingIceSec);
                // 配料
                let ordToppingAsideSec = "";
                ordToppingAsideSec = `<div class="ordToppingSecAside">
                                <button class="ordFillBtn" id="ordAside" data-timer=0>${ordAsideCart[0].FILLING_CATA_NAME}</button>
                                <div id="ordAsideAll">
                                </div>
                            </div>`;
                ordToppingSec.insertAdjacentHTML("beforeend", ordToppingAsideSec);
                // 調味
                let ordToppingSeasoningSec = "";
                ordToppingSeasoningSec = `<div class="ordToppingSecSeasoning">
                                <button class="ordFillBtn" id="ordSeasoning" data-timer=0>${ordSeasoningCart[0].FILLING_CATA_NAME}</button>
                                <div id="ordSeasoningAll">
                                </div>
                            </div>`;
                ordToppingSec.insertAdjacentHTML("beforeend", ordToppingSeasoningSec);
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


    // 計算配料金額時弄一個容器（讓他等加），用parseInt(0)讓他初值變成數字0
    let ordToppingTtlPr = parseInt(0);

    function ordToppingSecShow() {
        ordAddToList();
        orderPageLeftSideMidItemAll.addEventListener("click", function (e) {

            ordProdInfo = JSON.parse(localStorage.getItem("ordSaveProdInfo"));

            if (e.target.nodeName == 'DIV') {
                $(ordToppingSec).toggle(); // orderPageLeftSideMid
                $(e.target).toggleClass("lightblue"); // orderPageLeftSideMidItemTop

                // 先判斷所點選的商品的編號，再決定要讓哪些配料項目出現
                if (e.target.childNodes[3].classList[1] == 1 || e.target.childNodes[3].classList[1] == 2 || e.target.childNodes[3].classList[1] == 3 || e.target.childNodes[3].classList[1] == 4) {
                    // 如果配料大分類下架，讓他不出現在畫面上
                    if (ordAsideCart[0].FILLING_CATA_ONOFF == 0) {
                        // 配料按鈕消失
                        ordToppingSec.childNodes[2].childNodes[1].style.display = "none";
                    } else {
                        // 配料按鈕顯現
                        ordToppingSec.childNodes[2].childNodes[1].style.display = "block";
                    }

                    // 如果調味大分類下架，讓他不出現在畫面上
                    if (ordSeasoningCart[0].FILLING_CATA_ONOFF == 0) {
                        // 調味按鈕消失
                        ordToppingSec.childNodes[3].childNodes[1].style.display = "none";
                    } else {
                        // 調味按鈕顯現
                        ordToppingSec.childNodes[3].childNodes[1].style.display = "block";
                    }

                    // 糖分按鈕消失
                    ordToppingSec.childNodes[0].childNodes[1].style.display = "none";
                    // 冰塊按鈕消失
                    ordToppingSec.childNodes[1].childNodes[1].style.display = "none";


                    // 綁定ordFillBtn（配料）的監聽事件
                    ordToppingSec.childNodes[2].childNodes[1].addEventListener("click", function () {
                        event.stopPropagation;
                        event.stopImmediatePropagation;
                        // 先把ordAsideAll內的空間清空
                        ordToppingSec.childNodes[2].childNodes[3].innerHTML = "";
                        // 渲染配料進HTML頁面
                        let ordToppingAside = "";

                        for (let g = 0; g < ordAsideCart.length; g++) {
                            ordToppingAside = `<div class="ordAsideItem">${ordAsideCart[g].FILLING_ITEM_NAME}</div>`;
                            ordToppingSec.childNodes[2].childNodes[3].insertAdjacentHTML("beforeend", ordToppingAside);
                        };


                        // 弄一個容器（讓他等加），用parseInt(0)讓他初值變成數字0
                        // let ordToppingTtlPr = parseInt(0);
                        if (ordToppingSec.childNodes[2].childNodes[1].dataset.timer == 0) {
                            ordToppingSec.childNodes[2].childNodes[3].style.display = "block";
                            // 弄一個容器（讓他等加），用parseInt(0)讓他初值變成數字0
                            // let ordToppingTtlPr = parseInt(0);
                            // 綁定每一個配料的事件監聽
                            for (let s = 0; s < ordAsideCart.length; s++) {
                                ordToppingSec.childNodes[2].childNodes[3].childNodes[s].addEventListener("click", function (e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    // 渲染進品項下面的空間
                                    document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].innerHTML += `<span class="ordToppingSec"> ${ordAsideCart[s].FILLING_ITEM_NAME} $${ordAsideCart[s].FILLING_ITEM_PRICE}</span>`;

                                    let ordLightBlueNum = parseInt(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].dataset.sec);

                                    ordProdCart[ordLightBlueNum].topping.push(`${ordAsideCart[s].FILLING_ITEM_NAME} $${ordAsideCart[s].FILLING_ITEM_PRICE}`);

                                    // 單獨抓出配料的錢
                                    ordToppingTtlPr += parseInt(ordAsideCart[s].FILLING_ITEM_PRICE);
                                    // 把商品的價錢轉換為數字
                                    let ordPrdoItemPr = Number(ordProdCart[ordLightBlueNum].PRO_ITEM_PRICE);
                                    // 用一個容器來裝配料與商品加總的總數
                                    let ordProdnToppingPr = ordPrdoItemPr + ordToppingTtlPr;
                                    // console.log("價錢", ordProdCart[ordLightBlueNum].PRO_ITEM_PRICE)

                                    // 讓總數加到該商品內
                                    document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[3].innerHTML = "$" + ordProdnToppingPr;

                                    ordTotProdAmt();

                                    // 存入購物車
                                    ordSaveProdInCartHist();
                                    // 點擊一個配料後該空間就會關閉
                                    ordToppingSec.childNodes[2].childNodes[3].style.display = "none";
                                });
                            };
                            ordToppingSec.childNodes[2].childNodes[1].dataset.timer++;
                        } else {
                            ordToppingSec.childNodes[2].childNodes[3].style.display = "none";
                            ordToppingSec.childNodes[2].childNodes[1].dataset.timer--;
                        }
                    })

                    // 綁定ordFillBtn（調味）的監聽事件
                    ordToppingSec.childNodes[3].childNodes[1].addEventListener("click", function () {
                        event.stopPropagation;
                        event.stopImmediatePropagation;
                        // 先把ordSeasoningAll內的空間清空
                        ordToppingSec.childNodes[3].childNodes[3].innerHTML = "";
                        let ordToppingSea = "";
                        for (let g = 0; g < ordSeasoningCart.length; g++) {
                            ordToppingSea = `<div class="ordSeasoningItem">${ordSeasoningCart[g].FILLING_ITEM_NAME}</div>`;
                            ordToppingSec.childNodes[3].childNodes[3].insertAdjacentHTML("beforeend", ordToppingSea);
                        };
                        // 用js寫toggle
                        if (ordToppingSec.childNodes[3].childNodes[1].dataset.timer == 0) {
                            ordToppingSec.childNodes[3].childNodes[3].style.display = "block";
                            // 綁定每一個調味的事件監聽
                            for (let s = 0; s < ordSeasoningCart.length; s++) {
                                // let ordToppingTxt = '';
                                ordToppingSec.childNodes[3].childNodes[3].childNodes[s].addEventListener("click", function (e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    // 渲染進品項下面的空間
                                    document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].innerHTML += `<span class="ordToppingSec"> ${ordSeasoningCart[s].FILLING_ITEM_NAME} $${ordSeasoningCart[s].FILLING_ITEM_PRICE}</span>`;

                                    let ordLightBlueNum = parseInt(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].dataset.sec);

                                    ordProdCart[ordLightBlueNum].topping.push(`${ordSeasoningCart[s].FILLING_ITEM_NAME} $${ordSeasoningCart[s].FILLING_ITEM_PRICE}`);

                                    // 存入購物車
                                    ordSaveProdInCartHist();
                                    // 點擊一個調味後該空間就會關閉
                                    ordToppingSec.childNodes[3].childNodes[3].style.display = "none";
                                });
                            };
                            ordToppingSec.childNodes[3].childNodes[1].dataset.timer++;
                        } else {
                            ordToppingSec.childNodes[3].childNodes[3].style.display = "none";
                            ordToppingSec.childNodes[3].childNodes[1].dataset.timer--;
                        };

                    });

                } else if (e.target.childNodes[3].classList[1] == 6 || e.target.childNodes[3].classList[1] == 7) {
                    event.stopPropagation;
                    event.stopImmediatePropagation;

                    // 如果糖分大分類下架，讓他不出現在畫面上
                    if (ordSugarCart[0].FILLING_CATA_ONOFF == 0) {
                        // 糖分按鈕消失
                        ordToppingSec.childNodes[0].childNodes[1].style.display = "none";
                    } else {
                        // 糖分按鈕顯現
                        ordToppingSec.childNodes[0].childNodes[1].style.display = "block";
                    }

                    if (ordIceCart[0].FILLING_CATA_ONOFF == 0) {
                        // 冰塊按鈕消失
                        ordToppingSec.childNodes[1].childNodes[1].style.display = "none";
                    } else {
                        // 冰塊按鈕顯現
                        ordToppingSec.childNodes[1].childNodes[1].style.display = "block";
                    }

                    // 配料按鈕消失
                    ordToppingSec.childNodes[2].childNodes[1].style.display = "none";
                    // 調味按鈕消失
                    ordToppingSec.childNodes[3].childNodes[1].style.display = "none";

                    // 綁定ordFillBtn（糖度）的監聽事件
                    ordToppingSec.childNodes[0].childNodes[1].addEventListener("click", function () {
                        event.stopPropagation;
                        event.stopImmediatePropagation;
                        // 先把ordSugarAll內的空間清空
                        ordToppingSec.childNodes[0].childNodes[3].innerHTML = "";
                        // 渲染糖份進HTML頁面
                        let ordToppingSu = "";

                        for (let g = 0; g < ordSugarCart.length; g++) {
                            ordToppingSu = `<div class="ordSugarItem">${ordSugarCart[g].FILLING_ITEM_NAME}</div>`;
                            ordToppingSec.childNodes[0].childNodes[3].insertAdjacentHTML("beforeend", ordToppingSu);
                        };


                        // 用js寫toggle
                        if (ordToppingSec.childNodes[0].childNodes[1].dataset.timer == 0) {
                            ordToppingSec.childNodes[0].childNodes[3].style.display = "block";
                            // 綁定每一個糖份的事件監聽
                            for (let s = 0; s < ordSugarCart.length; s++) {
                                // let ordToppingTxt = '';
                                ordToppingSec.childNodes[0].childNodes[3].childNodes[s].addEventListener("click", function (e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    // 渲染進品項下面的空間
                                    document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].innerHTML += `<span class="ordToppingSec"> ${ordSugarCart[s].FILLING_ITEM_NAME} $${ordSugarCart[s].FILLING_ITEM_PRICE}</span>`;

                                    let ordLightBlueNum = parseInt(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].dataset.sec);

                                    ordProdCart[ordLightBlueNum].topping.push(`${ordSugarCart[s].FILLING_ITEM_NAME} $${ordSugarCart[s].FILLING_ITEM_PRICE}`);

                                    // 存入購物車
                                    ordSaveProdInCartHist();
                                    // 點擊一個糖分後該空間就會關閉
                                    ordToppingSec.childNodes[0].childNodes[3].style.display = "none";
                                });
                            };
                            ordToppingSec.childNodes[0].childNodes[1].dataset.timer++;
                        } else {
                            ordToppingSec.childNodes[0].childNodes[3].style.display = "none";
                            ordToppingSec.childNodes[0].childNodes[1].dataset.timer--;
                        }
                    });

                    // 綁定ordFillBtn（冰塊）的監聽事件
                    ordToppingSec.childNodes[1].childNodes[1].addEventListener("click", function () {
                        event.stopPropagation;
                        event.stopImmediatePropagation;
                        // 先把ordIceAll內的空間清空
                        ordToppingSec.childNodes[1].childNodes[3].innerHTML = "";
                        // 渲染糖份進HTML頁面
                        let ordToppingIce = "";
                        for (let g = 0; g < ordIceCart.length; g++) {
                            ordToppingIce = `<div class="ordIceItem">${ordIceCart[g].FILLING_ITEM_NAME}</div>`;
                            ordToppingSec.childNodes[1].childNodes[3].insertAdjacentHTML("beforeend", ordToppingIce);
                        };
                        // 用js寫toggle
                        if (ordToppingSec.childNodes[1].childNodes[1].dataset.timer == 0) {
                            ordToppingSec.childNodes[1].childNodes[3].style.display = "block";
                            // 綁定每一個冰塊的事件監聽
                            for (let s = 0; s < ordIceCart.length; s++) {
                                // let ordToppingTxt = '';
                                ordToppingSec.childNodes[1].childNodes[3].childNodes[s].addEventListener("click", function (e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    // 渲染進品項下面的空間
                                    document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].innerHTML += `<span class="ordToppingSec"> ${ordIceCart[s].FILLING_ITEM_NAME} $${ordIceCart[s].FILLING_ITEM_PRICE}</span>`;

                                    let ordLightBlueNum = parseInt(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1].dataset.sec);

                                    ordProdCart[ordLightBlueNum].topping.push(`${ordIceCart[s].FILLING_ITEM_NAME} $${ordIceCart[s].FILLING_ITEM_PRICE}`);

                                    // 存入購物車
                                    ordSaveProdInCartHist();
                                    // 點擊一個糖分後該空間就會關閉
                                    ordToppingSec.childNodes[1].childNodes[3].style.display = "none";
                                });
                            };
                            ordToppingSec.childNodes[1].childNodes[1].dataset.timer++;
                        } else {
                            ordToppingSec.childNodes[1].childNodes[3].style.display = "none";
                            ordToppingSec.childNodes[1].childNodes[1].dataset.timer--;
                        }
                    });
                } else {
                    // 灰階的時候讓整個配料區都消失，點擊也不會出現
                    ordToppingSec.style.display = "none";
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
        localStorage.setItem(`orderNo_${ordList}`, JSON.stringify(ordToKitchen));
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

