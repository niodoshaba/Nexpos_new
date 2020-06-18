window.onload = function () {
    //=====================
    // shopping cart function below

    // 購物車

    var ordProdCart = [];


    // 點菜按鈕
    var ordAddToCart = document.querySelectorAll(".orderPageItemDiv");
    // 刪除單一品項按鈕
    // var orderPageLeftSideMidItemDelete = document.querySelectorAll(".orderPageLeftSideMidItemDelete");


    var orderPageLeftSideMidItemAll = document.getElementById("orderPageLeftSideMidItemAll");
    var ordTotAmtShow = document.getElementById("ordTotAmtShow");
    var ordTotNumShow = document.getElementById("ordTotNumShow");


    var orderPageLeftSideMidItemTop = document.querySelectorAll(".orderPageLeftSideMidItemTop");


    var ordFill = document.getElementById("ordFill");






    // console.log(ordCloseBtn);


    // 菜單資訊
    var ordProdInfo = [
        {
            ordProdName: "醬燒姑姑",
            ordProdPr: 600,
            ordProdId: "A001",
            ordProdCnt: 1
        },
        {
            ordProdName: "奶爸薯泥",
            ordProdPr: 300,
            ordProdId: "A002",
            ordProdCnt: 1
        },
        {
            ordProdName: "青醬雞柳",
            ordProdPr: 100,
            ordProdId: "A003",
            ordProdCnt: 1
        },
        {
            ordProdName: "舒巴大叔",
            ordProdPr: 10,
            ordProdId: "A004",
            ordProdCnt: 1
        },
        {
            ordProdName: "番茄小丸子",
            ordProdPr: 600,
            ordProdId: "A005",
            ordProdCnt: 1
        },
        {
            ordProdName: "紅燒牛柳",
            ordProdPr: 380,
            ordProdId: "A006",
            ordProdCnt: 1
        },
        {
            ordProdName: "章魚嘴",
            ordProdPr: 170,
            ordProdId: "A007",
            ordProdCnt: 1
        },
        {
            ordProdName: "綺夢的＿＿",
            ordProdPr: 1000,
            ordProdId: "A008",
            ordProdCnt: 1
        },
        {
            ordProdName: "班花特製",
            ordProdPr: 300,
            ordProdId: "A009",
            ordProdCnt: 1
        },
        {
            ordProdName: "天龍聖品",
            ordProdPr: 300,
            ordProdId: "A010",
            ordProdCnt: 1
        },
        {
            ordProdName: "彗星香蕉",
            ordProdPr: 500,
            ordProdId: "A011",
            ordProdCnt: 1
        },
        {
            ordProdName: "極讚大腿",
            ordProdPr: 900,
            ordProdId: "A012",
            ordProdCnt: 1
        },
    ];

    function ordSaveProdInfo() {
        localStorage.setItem("ordSaveProdInfo", JSON.stringify(ordProdInfo));
    };

    // 讓頁面在load完之後觸發ordSaveProdInfo，把菜單資訊帶入頁面
    window.addEventListener('load', ordSaveProdInfo);






    for (let i = 0; i < ordAddToCart.length; i++) {
        ordAddToCart[i].addEventListener("click", function () {

            // 把值推入/拉出陣列
            // 清空div
            // 跑for迴圈

            ordAddProdItemToCart(ordProdInfo[i]);

            let ordHTML = '';
            orderPageLeftSideMidItemAll.innerHTML = " ";

            // console.log("長度", ordProdCart.length);

            // 動態新增標籤與data-set
            for (let k = 0; k < ordProdCart.length; k++) {
                ordHTML += `
                    <div class="orderPageLeftSideMidItem" >
                        <div class="orderPageLeftSideMidItemTop">
                            <div class="orderPageLeftSideMidItemDelete" >
                                <img src="../img/icon_cancel.png" alt="" data-cnt='${k}'>
                            </div>
                            <span class="ordSele">${ordProdCart[k].ordProdName}</span>
                            <span>${ordProdCart[k].ordProdCnt}</span>
                        </div>
                        <div class="orderPageLeftSideMidItemBottom">
                            <div class="orderPageLeftSideMidToppings">
                            </div>
                            <span class="ordItemPr">$${ordProdCart[k].ordProdPr}</span>
                        </div> 
                    </div>
                `;

            }
            orderPageLeftSideMidItemAll.innerHTML = ordHTML;

            // 把購物車資訊存進localStorage
            ordSaveProdInCartHist();

            // 把購物車資訊存進屬於"暫時訂單的"localStorage
            ordSaveProdInCartTemp();

            // 計算購物車裡商品數量
            ordAllProdNumInCart();

            // 計算購物車內的總品項金額
            ordTotProdAmt();
        });

    };









    // 把商品從購物車移除，一次一個
    orderPageLeftSideMidItemAll.addEventListener('click', function (e) {

        // let ordHTML = '';
        // console.log("找到了嗎", e.target.nodeName)

        // // 觸發配料區塊
        // if (e.target.nodeName == 'SPAN') {


        //     $("#ordFill").slideToggle();
        //     $(e.target).toggleClass("gray");

        console.log(e.target.nodeName); // IMG或DIV

        // }

        if (e.target.nodeName == 'IMG') {

            console.log("找到", e.target.nodeName) // IMG
            console.log("爸爸", e.target.parentNode); //orderPageLeftSideMidItemDelete
            console.log("爸爸的爸爸", e.target.parentNode.parentNode); //orderPageLeftSideMidItemTop
            console.log("爸爸的爸爸的爸爸", e.target.parentNode.parentNode.parentNode); //orderPageLeftSideMidItem



            console.log("DATASET", e.target.dataset.cnt); //orderPageLeftSideMidItem


            // console.log("名稱", ordProdCart[e.target.dataset.cnt].ordProdName);
            // localStorage.removeItem("ordSaveProdInCart"); //清空ordSaveProdInCart

            ordProdCart.splice(parseInt(e.target.dataset.cnt), 1);
            orderPageLeftSideMidItemAll.removeChild(e.target.parentNode.parentNode.parentNode);


            let ordHTML = '';

            // console.log("刪除的商品", ordProdCart.splice(0, 1));
            for (let o = 0; o < ordProdCart.length; o++) {
                // console.log("啊啊啊啊啊啊啊啊", ordProdCart[o].ordProdName);

                orderPageLeftSideMidItemAll.innerHTML = "";

                // console.log("長度", ordProdCart.length);


                // // 重跑data-set 
                // ordHTML += `<li class="ordSele"  style="display: inline-block" data-ordCnt='${o}'><button class="ordCloseBtn" data-cnt='${o}}'>X</button></ion-icon>${ordProdCart[o].ordProdName}</li>`;
                // // console.log("除錯", o)


                // 重跑data-set 
                ordHTML += `
                    <div class="orderPageLeftSideMidItem" >
                        <div class="orderPageLeftSideMidItemTop">
                            <div class="orderPageLeftSideMidItemDelete"  >
                                <img src="../img/icon_cancel.png" alt="" data-cnt='${o}'>
                            </div>
                            <span class="ordSele">${ordProdCart[o].ordProdName}</span>
                            <span>${ordProdCart[o].ordProdCnt}</span>
                        </div>
                    
                        <div class="orderPageLeftSideMidItemBottom">
                            <div class="orderPageLeftSideMidToppings">
                            
                            </div>
                            <span class="ordItemPr">$${ordProdCart[o].ordProdPr}</span>
                        </div> 
                    </div> 
                `;
                // console.log("除錯", o)

            }
            orderPageLeftSideMidItemAll.innerHTML = ordHTML;


            // 放入localStorage
            ordSaveProdInCartHist();

            // 把購物車資訊存進屬於"暫時訂單的"localStorage
            ordSaveProdInCartTemp();

            ordTotProdAmt();

            ordAllProdNumInCart();

        }

    });


    // 特定商品，出現配料區





    // 把新商品加進購物車
    function ordAddProdItemToCart(ordProdInfo) {
        ordProdCart.push(ordProdInfo);
        // console.log("寫進購物車陣列", ordProdCart)

        ordSaveProdInCartHist();

        // 把購物車資訊存進屬於"暫時訂單的"localStorage
        // ordSaveProdInCartTemp();
    };




    document.getElementById("orderPageRightSideBottomBtn2").addEventListener("click", ordClearCart);

    // 把購物車的所有品項與頁面上的金額、數量顯示清除
    function ordClearCart() {
        ordProdCart = [];
        orderPageLeftSideMidItemAll.innerHTML = "";
        ordTotAmtShow.innerText = 0;
        ordTotNumShow.innerText = 0;

        ordSaveProdInCartHist();
    };


    // 計算購物車內的商品數量
    function ordAllProdNumInCart() {
        ordProdCart = JSON.parse(localStorage.getItem("ordSaveProdInCart"));
        ordTotNumShow.innerText = ordProdCart.length;
    };


    // 計算購物車內的總品項金額
    function ordTotProdAmt() {
        ordTotAmt = 0;
        for (let i in ordProdCart) {
            ordTotAmt += ordProdCart[i].ordProdPr;
        }
        ordTotAmtShow.innerText = ordTotAmt;
        // console.log("刺激", typeof ordProdCart);
        // console.log("刺激1995", ordProdCart);
    };




    // 把購物車資訊存進localStorage
    function ordSaveProdInCartHist() {
        localStorage.setItem("ordSaveProdInCart", JSON.stringify(ordProdCart));
    };

    // 把購物車資訊存進屬於"暫時訂單的"localStorage
    function ordSaveProdInCartTemp() {
        localStorage.setItem("ordSaveProdInCartTemp", JSON.stringify(ordProdCart));
    };



    // 把購物車資訊從localStorage裡抓出來
    function ordLoadProdInCartHist() {
        ordProdCart = JSON.parse(localStorage.getItem("ordSaveProdInCart"));
    };




}