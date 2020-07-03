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
    var ordToppingSuagrCart = [];


    // 點菜按鈕
    var ordAddToCart = document.querySelectorAll(".orderPageItemDiv");

    var orderPageLeftSideMidItemAll = document.getElementById("orderPageLeftSideMidItemAll");
    var ordTotAmtShow = document.getElementById("ordTotAmtShow");
    var ordTotNumShow = document.getElementById("ordTotNumShow");

    let ordSugar = document.getElementById("ordSugar");
    let ordSugarItem = document.querySelectorAll(".ordSugarItem");

    var orderPageRightSideBottomBtn1 = document.getElementById('orderPageRightSideBottomBtn1') // 出單按鈕

    // console.log(ordCloseBtn);


    // 菜單資訊


    // var ordSugarInfo = [
    //     {
    //         ordSugarName: "全糖",
    //         ordSugarPr: 10,
    //         ordSugarId: "TS001",
    //         ordSugarCnt: 1
    //     },
    //     {
    //         ordSugarName: "少糖",
    //         ordSugarPr: 5,
    //         ordSugarId: "TS002",
    //         ordSugarCnt: 1
    //     },
    //     {
    //         ordSugarName: "半糖",
    //         ordSugarPr: 0,
    //         ordSugarId: "TS003",
    //         ordSugarCnt: 1
    //     },
    //     {
    //         ordSugarName: "微糖",
    //         ordSugarPr: 30,
    //         ordSugarId: "TS004",
    //         ordSugarCnt: 1
    //     },
    //     {
    //         ordSugarName: "無糖",
    //         ordSugarPr: 20,
    //         ordSugarId: "TS005",
    //         ordSugarCnt: 1
    //     },
    // ]


    // call ajax
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
            console.log(this); // XMLHttpRequest()


            localStorage.setItem("ordSaveProdInfo", JSON.stringify(ordProdInfo));

            // let ordRender = "";

            // looping through the data 把從資料庫抓出來的商品品項加到HTML頁面上
            for (let g = 0; g < ordProdInfo.length; g++) {
                let orderPageItemDivBottomBlack = document.querySelectorAll('.orderPageItemDivBottomBlack');


                // console.log("88888888", orderPageItemDivBottomBlack[g].childNodes[1])
                orderPageItemDivBottomBlack[g].childNodes[1].innerText = ordProdInfo[g].PRO_ITEM_NAME;

            }
        }
    }



    // 當頁面重新整理的時候，已經存在localStorage的資料會被重新撈出與印在頁面上
    function ordReload() {

        if (localStorage.getItem("ordSaveProdInCart")) {
            // alert("123");
            ordLoadProdInCartHist();


            // var ordGetProd = JSON.parse(localStorage.getItem("ordSaveProdInCart"));
            let ordReloadHTML = '';
            orderPageLeftSideMidItemAll.innerHTML = " ";
            for (let k = 0; k < ordGetProd.length; k++) {
                if (ordGetProd[k].status != 2) {
                    // 讓因為重整頁面重新載入的東西disable，同時把刪除的icon拿掉，顏色改灰階
                    ordReloadHTML += `
                    <div class="orderPageLeftSideMidItem" style="pointer-events:none; color:#ccc">
                        <div class="orderPageLeftSideMidItemTop">
                            <span class="ordSele">${ordGetProd[k].PRO_ITEM_NAME}</span>
                            <span>1</span>
                        </div>
                        <div class="orderPageLeftSideMidItemBottom">
                            <div class="orderPageLeftSideMidToppings data-sec=${k}">
                            </div>
                            <span class="ordItemPr">$${ordGetProd[k].PRO_ITEM_PRICE}</span>
                        </div> 
                    </div>
                `;
                }
            }


            orderPageLeftSideMidItemAll.innerHTML = ordReloadHTML;

            // 把資訊存入購物車On中
            ordAddProdItemToCartOn();

            // 計算購物車裡商品數量
            ordAllProdNumInCart();

            // 計算購物車內的總品項金額
            ordTotProdAmt();

            // 把localStorage裡存的配料資料撈出來
            // ordGetToppingBack();

        }
    }

    ordReload();




    function ordAddToList() {
        for (let i = 0; i < ordAddToCart.length; i++) {
            ordAddToCart[i].addEventListener("click", function () {

                // 把值推入/拉出陣列
                // 清空div
                // 跑for迴圈

                // 把被選中的商品加入購物車的陣列裡，並同步存到localStorage
                ordAddProdItemToCart(ordProdInfo[i]);

                // 叫出暫存購物車的資料
                ordLoadProdInTempCartHist();
                // console.log("7777777", ordGetTempProd)
                // console.log("長度2", ordProdCart)


                // 先判斷暫存的購物車裡面有沒有東西
                if (ordGetTempProd != null) {

                    let ordReloadHTML = '';
                    // ordNewDivForReord.innerHTML = " ";

                    // 以暫存的購物車的長度為基準，從此之後開始新增商品（因為點選完商品之後資料就會進入暫存購物車，所以只有第一次暫存購物車是null，之後都會跑這邊的function，且因為購物車的資訊比暫存購物車的資訊更早進去，所以兩者永遠相差一）
                    for (let k = ordGetTempProd.length; k < ordProdCart.length; k++) {



                        ordReloadHTML += `
                            <div class="orderPageLeftSideMidItem">
                                <div class="orderPageLeftSideMidItemTop">
                                    <div class="orderPageLeftSideMidItemDelete">
                                        <img src="./assets/icon_cancel.png" alt="" data-cnt='${k}'>
                                    </div>
                                    <span class="ordSele">${ordProdCart[k].PRO_ITEM_NAME}</span>
                                    <span>1</span>
                                </div>
                                <div class="orderPageLeftSideMidItemBottom">
                                    <div class="orderPageLeftSideMidToppings data-sec=${k}"></div>
                                    <span class="ordItemPr">$${ordProdCart[k].PRO_ITEM_PRICE}</span>
                                </div> 
                            </div>
                        `;

                    }

                    orderPageLeftSideMidItemAll.insertAdjacentHTML("beforeend", `${ordReloadHTML}`);


                } else {
                    let ordHTML = '';
                    // orderPageLeftSideMidItemAll.innerHTML = " ";

                    // 動態新增標籤與data-set
                    for (let k = 0; k < ordProdCart.length; k++) {


                        ordHTML += `
                            <div class="orderPageLeftSideMidItem">
                                <div class="orderPageLeftSideMidItemTop">
                                    <div class="orderPageLeftSideMidItemDelete">
                                        <img src="./assets/icon_cancel.png" alt="" data-cnt='${k}'>
                                    </div>
                                    <span class="ordSele">${ordProdCart[k].PRO_ITEM_NAME}</span>
                                    <span>1</span>
                                </div>
                                <div class="orderPageLeftSideMidItemBottom">
                                    <div class="orderPageLeftSideMidToppings data-sec=${k}"></div>
                                    <span class="ordItemPr">$${ordProdCart[k].PRO_ITEM_PRICE}</span>
                                </div> 
                            </div>
                        `;
                    }
                    orderPageLeftSideMidItemAll.innerHTML = ordHTML;


                    // orderPageLeftSideMidItemAll.insertAdjacentHTML("beforeend", `${ordHTML}`);

                }



                // 把購物車資訊存進屬於"暫時訂單的"localStorage與暫存購物車
                ordAddProdItemToTempCart();

                // 計算購物車裡商品數量
                ordAllProdNumInCart();

                // 計算購物車內的總品項金額
                ordTotProdAmt();

                // 把localStorage裡存的配料資料撈出來
                // ordGetToppingBack();
            });
        };
    }

    ordAddToList();




    // function ordGetToppingBack() {

    //     // var ordGetProd = JSON.parse(localStorage.getItem("ordSaveProdInCart"));
    //     // 從localStorage把資料拉回來
    //     ordLoadProdInCartHist();

    //     // 先跑for迴圈抓到品項
    //     for (let g = 0; g < ordGetProd.length; g++) {
    //         if (ordGetProd[g].ordTopping.length != 0) {

    //             // 再跑for迴圈抓到品項內的配料
    //             for (let j = 0; j < ordGetProd[g].ordTopping.length; j++) {

    //                 // console.log("122", ordGetProd[g].ordTopping[j])
    //                 $(document.querySelectorAll('.orderPageLeftSideMidItemTop')[g].nextElementSibling.childNodes[1]).append(`<span class="ordToppingSec"> ${ordGetProd[g].ordTopping[j].ordSugarName}  $${ordGetProd[g].ordTopping[j].ordSugarPr}</span>`);
    //             }
    //         }
    //     }
    // }


    // orderPageLeftSideMidItemAll.addEventListener('click', function (e) {

    //     // 觸發配料區塊
    //     if (e.target.nodeName == 'DIV') {

    //         $(e.target.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling).toggle(); // orderPageLeftSideMid
    //         $(e.target).toggleClass("lightblue"); // orderPageLeftSideMidItemTop

    //         if (e.target.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.id == 'ordToppingSec') {

    //             // 讓配料區塊出現
    //             $(ordSugar).click(function () {
    //                 $("#ordSugarAll").toggle();
    //             });
    //         }

    //         // 增加配料（甜度）  

    //         for (let s = 0; s < ordSugarItem.length; s++) {

    //             ordSugarItem[s].addEventListener("click", function (e) {

    //                 // 加上e.preventDefault()、e.stopImmediatePropagation()阻止冒泡事件
    //                 e.preventDefault();
    //                 e.stopImmediatePropagation();


    //                 let ordToppingCoProd = Number(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').childNodes[1].childNodes[1].dataset.cnt);


    //                 // 把配料加進被點選的品項下
    //                 $(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[1]).append(`<span class="ordToppingSec"> ${ordSugarInfo[s].ordSugarName}  $${ordSugarInfo[s].ordSugarPr}</span>`);


    //                 // 把配料寫進被點選的品項裡面，再一起紀錄進localstorage
    //                 ordProdCart[ordToppingCoProd].ordTopping.push(ordSugarInfo[s]);
    //                 ordSaveProdInCartHist();

    //                 // 呼叫配料價格的function
    //                 ordToppingItemPr();

    //                 // 用變數ordProdItemPrWithTopping來裝品項與配料加總後的價格
    //                 let ordProdItemPrWithTopping = Number(document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[3].innerText.split("$")[1]) + ordToppingItemAmt;

    //                 // 用innerHTML把加總後的價格放進正確的位置裡
    //                 document.querySelector('.orderPageLeftSideMidItemTop.lightblue').nextElementSibling.childNodes[3].innerHTML = `$${ordProdItemPrWithTopping}`;


    //                 // 收起配料品項的欄位
    //                 $("#ordSugarAll").toggle();

    //                 ordTotProdAmt();
    //             })
    //         }
    //     }


    //     // 把配料移除，一次一項





    //     // 把商品從購物車移除，一次一個
    //     if (e.target.nodeName == 'IMG') {

    //         // console.log("DATASET", e.target.parentNode.parentNode.parentNode); //orderPageLeftSideMidItem

    //         ordProdCart.splice(parseInt(e.target.dataset.cnt), 1);
    //         orderPageLeftSideMidItemAll.removeChild(e.target.parentNode.parentNode.parentNode);

    //         let ordHTML = '';
    //         orderPageLeftSideMidItemAll.innerHTML = "";


    //         for (let o = 0; o < ordProdCart.length; o++) {

    //             // 重跑data-set 
    //             ordHTML += `
    //                 <div class= "orderPageLeftSideMidItem">
    //                     <div class="orderPageLeftSideMidItemTop">
    //                         <div class="orderPageLeftSideMidItemDelete"  >
    //                             <img src="./assets/icon_cancel.png" alt="" data-cnt='${o}'>
    //                         </div>
    //                             <span class="ordSele">${ordProdCart[o].PRO_ITEM_NAME}</span>
    //                             <span>1</span>
    //                     </div>
    //                     <div class="orderPageLeftSideMidItemBottom">
    //                         <div class="orderPageLeftSideMidToppings data-sec=${o}"></div>
    //                         <span class="ordItemPr">$${ordProdCart[o].PRO_ITEM_PRICE}</span>
    //                     </div>
    //                 </div> 
    //             `;

    //         }
    //         orderPageLeftSideMidItemAll.innerHTML = ordHTML;


    //         // 放入localStorage
    //         ordSaveProdInCartHist();

    //         // 把購物車資訊存進屬於"暫時訂單的"localStorage
    //         ordSaveProdInTempCartHist()

    //         ordTotProdAmt();

    //         ordAllProdNumInCart();

    //         // ordGetToppingBack();
    //     }

    // });



    function ordDeleteProd() {
        orderPageLeftSideMidItemAll.addEventListener("click", function (e) {
            console.log("找巡", e.target)

            if (e.target.nodeName == 'IMG') {
                // console.log("DATASET", e.target.parentNode.parentNode.parentNode); //orderPageLeftSideMidItem

                // 讓被刪除的品項的狀態改為2，表示被刪除
                ordLoadProdInCartHist();
                console.log("會成功ㄇ ", ordGetProd[parseInt(e.target.dataset.cnt)])
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

                // ordGetToppingBack();
            }
        })
    }

    ordDeleteProd();



    // 把新商品加進購物車
    function ordAddProdItemToCart(ordProdInfo) {
        ordProdInfo.status = 0; // 未出餐
        ordProdCart.push(ordProdInfo);

        ordSaveProdInCartHist();
    };

    function ordAddProdItemToCartOn() {
        // 讓頁面重整的時候，購物車內的商品的狀態呈現1出餐
        for (let w = 0; w < ordGetProd.length; w++) {
            if (ordGetProd[w].status != 2) {
                ordGetProd[w].status = 1; // 出餐
            }
        }

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
            }
            ordTotNumShow.innerText = ordAllProdNum;
        }
    };


    // 計算購物車內的總品項金額
    function ordTotProdAmt() {
        ordLoadProdInCartHist();

        ordTotAmt = 0;
        // ordToppingAmt = 0;

        for (let i in ordGetProd) {
            if (ordGetProd[i].status != 2) {
                ordTotAmt += Number(ordGetProd[i].PRO_ITEM_PRICE);
                ordTotAmtShow.innerText = ordTotAmt;
            }
        }

        // for (let g = 0; g < ordGetProd.length; g++) {
        //     if (ordGetProd[g].ordTopping.length != 0) {
        //         // 再跑for迴圈抓到品項內的配料的價錢
        //         for (let j = 0; j < ordGetProd[g].ordTopping.length; j++) {
        //             ordToppingAmt += ordGetProd[g].ordTopping[j].ordSugarPr;
        //         }
        //     }
        // }

        // console.log(ordToppingAmt);

        // ordTotAmtShow.innerText = ordTotAmt + ordToppingAmt;

    };
    ordTotProdAmt();


    // 配料各項價錢
    function ordToppingItemPr() {
        // var ordGetTopping = JSON.parse(localStorage.getItem("ordSaveProdInCart"));
        ordLoadProdInCartHist();
        ordToppingItemAmt = 0;

        for (let g = 0; g < ordGetProd.length; g++) {
            if (ordGetProd[g].ordTopping.length != 0) {
                // 再跑for迴圈抓到品項內的配料的價錢
                for (let j = 0; j < ordGetProd[g].ordTopping.length; j++) {
                    ordToppingItemAmt += ordGetProd[g].ordTopping[j].ordSugarPr;

                }
            }
        }
        // console.log("配料價錢", ordToppingItemAmt)

    }






    // 把購物車資訊存進localStorage
    function ordSaveProdInCartHist() {
        localStorage.setItem("ordSaveProdInCart", JSON.stringify(ordProdCart));
    };

    // 把暫時購物車資訊存進localStorage
    function ordSaveProdInTempCartHist() {
        localStorage.setItem("ordSaveProdInTempCart", JSON.stringify(ordTempProdCart));
    };

    // 把購物車On資訊存進localStorage
    function ordSaveProdInCartOnHist() {
        localStorage.setItem("ordSaveProdInCartOnHist", JSON.stringify(ordProdCartOn));
    };






    // 把購物車資訊從localStorage裡抓出來
    function ordLoadProdInCartHist() {
        ordGetProd = JSON.parse(localStorage.getItem("ordSaveProdInCart"));
    };

    // 把暫時購物車資訊從localStorage裡抓出來
    function ordLoadProdInTempCartHist() {
        ordGetTempProd = JSON.parse(localStorage.getItem("ordSaveProdInTempCart"));
    };

    // 把購物車On資訊從localStorage裡抓出來
    function ordLoadProdInCartOnHist() {
        ordGetOnProd = JSON.parse(localStorage.getItem("ordSaveProdInCartOnHist"));
    };




    // ========VueJs========

    new Vue({
        el: "#orderPageLeftSideTop",
        data: {
            ordNo: "S0001",
            ordTabNo: "T001",
            ordPplAmt: ""

        },
        methods: {
            ordCalPplAmtPlus() {
                this.ordPplAmt++;
                localStorage.setItem('ordPplNum', this.ordPplAmt);

            },
            ordCalPplAmtMinus() {
                this.ordPplAmt--;
                if (this.ordPplAmt < 0) {
                    this.ordPplAmt = 0;
                }

                localStorage.setItem('ordPplNum', this.ordPplAmt);
            },
            // ordGetPpl() {
            //     this.ordPplAmt = localStorage.getItem("ordPplNum");
            // }
        },

    })

}



