window.onload = function () {
    //=====================
    // shopping cart function below

    // 購物車
    var ordProdCart = [];

    // 配料購物車
    var ordToppingSuagrCart = [];


    // 點菜按鈕
    var ordAddToCart = document.querySelectorAll(".orderPageItemDiv");
    // 刪除單一品項按鈕
    // var orderPageLeftSideMidItemDelete = document.querySelectorAll(".orderPageLeftSideMidItemDelete");


    var orderPageLeftSideMidItemAll = document.getElementById("orderPageLeftSideMidItemAll");
    var ordTotAmtShow = document.getElementById("ordTotAmtShow");
    var ordTotNumShow = document.getElementById("ordTotNumShow");


    // var orderPageLeftSideMidItemTop = document.querySelectorAll(".orderPageLeftSideMidItemTop");


    var ordToppingSec = document.getElementById("ordToppingSec");


    let ordSugar = document.getElementById("ordSugar");
    let ordSugarItem = document.querySelectorAll(".ordSugarItem");
    let orderPageLeftSideMidToppings = document.querySelectorAll(".orderPageLeftSideMidToppings");


    let ordSele = document.querySelectorAll(".ordSele")






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


    var ordSugarInfo = [
        {
            ordSugarName: "全糖",
            ordSugarPr: 0,
            ordSugarId: "TS001",
            ordSugarCnt: 1
        },
        {
            ordSugarName: "少糖",
            ordSugarPr: 0,
            ordSugarId: "TS002",
            ordSugarCnt: 1
        },
        {
            ordSugarName: "半糖",
            ordSugarPr: 0,
            ordSugarId: "TS003",
            ordSugarCnt: 1
        },
        {
            ordSugarName: "微糖",
            ordSugarPr: 0,
            ordSugarId: "TS004",
            ordSugarCnt: 1
        },
        {
            ordSugarName: "無糖",
            ordSugarPr: 0,
            ordSugarId: "TS005",
            ordSugarCnt: 1
        },
    ]



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
                            <div class="orderPageLeftSideMidToppings data-sec=${k}">
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


    orderPageLeftSideMidItemAll.addEventListener('click', function (e) {
        // 觸發配料區塊
        if (e.target.nodeName == 'DIV') {

            $(e.target.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling).toggle(); // orderPageLeftSideMid
            $(e.target).toggleClass("lightblue"); // orderPageLeftSideMidItemTop

            if (e.target.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.id == 'ordToppingSec') {

                // 讓配料區塊出現
                $(ordSugar).click(function () {
                    $("#ordSugarAll").toggle();
                });
            }

            // 增加配料（甜度）  

            for (let s = 0; s < ordSugarItem.length; s++) {

                // alert(ordSugarItem.length);
                ordSugarItem[s].addEventListener("click", function () {

                    console.log(ordSugarItem[3])

                    ordAddToppingSugarToCart(ordSugarInfo[s]);


                    console.log("咔咔咔咔", e.target.nextSibling.nextElementSibling.children[0].innerHTML)
                    console.log("神秘的陣列", ordToppingSuagrCart[s])

                    $(e.target.nextSibling.nextElementSibling.children[0]).append(`<span> ${ordSugarInfo[s].ordSugarName}  $${ordSugarInfo[s].ordSugarPr}</span>`);

                    e.stopImmediatePropagation();
                    console.log("咔咔", e.target.nextSibling.nextElementSibling.children[0].innerHTML)


                    $("#ordSugarAll").toggle();

                    ordSaveToppingSugarInCartHist();



                })
            }
        }

        // 把商品從購物車移除，一次一個
        if (e.target.nodeName == 'IMG') {

            console.log("DATASET", e.target.parentNode.parentNode.parentNode); //orderPageLeftSideMidItem

            ordProdCart.splice(parseInt(e.target.dataset.cnt), 1);
            orderPageLeftSideMidItemAll.removeChild(e.target.parentNode.parentNode.parentNode);

            let ordHTML = '';
            orderPageLeftSideMidItemAll.innerHTML = "";


            for (let o = 0; o < ordProdCart.length; o++) {

                // 重跑data-set 
                ordHTML += `
                    <div class= "orderPageLeftSideMidItem">
                        <div class="orderPageLeftSideMidItemTop">
                            <div class="orderPageLeftSideMidItemDelete"  >
                                <img src="../img/icon_cancel.png" alt="" data-cnt='${o}'>
                            </div>
                                <span class="ordSele">${ordProdCart[o].ordProdName}</span>
                                <span>${ordProdCart[o].ordProdCnt}</span>
                        </div>
                        <div class="orderPageLeftSideMidItemBottom">
                            <div class="orderPageLeftSideMidToppings data-sec=${o}">

                            </div>
                            <span class="ordItemPr">$${ordProdCart[o].ordProdPr}</span>
                        </div>
                    </div> 
                `;

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

    // 把配料加進購物車
    function ordAddToppingSugarToCart(ordSugarInfo) {
        ordToppingSuagrCart.push(ordSugarInfo);
        console.log("寫進配料_糖陣列", ordToppingSuagrCart)
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

    };




    // 把購物車資訊存進localStorage
    function ordSaveProdInCartHist() {
        localStorage.setItem("ordSaveProdInCart", JSON.stringify(ordProdCart));
    };

    function ordSaveToppingSugarInCartHist() {
        localStorage.setItem("ordSaveToppingSugarInCart", JSON.stringify(ordToppingSuagrCart));

    }

    // 把購物車資訊存進屬於"暫時訂單的"localStorage
    function ordSaveProdInCartTemp() {
        localStorage.setItem("ordSaveProdInCartTemp", JSON.stringify(ordProdCart));
    };



    // 把購物車資訊從localStorage裡抓出來
    function ordLoadProdInCartHist() {
        ordProdCart = JSON.parse(localStorage.getItem("ordSaveProdInCart"));
    };


    // ========VueJs========

    new Vue({
        el: "#orderPageLeftSideTop",
        data: {
            ordNo: " ",
            ordTabNo: "T001",
            ordPplAmt: ""

        },
        methods: {
            ordCalPplAmtPlus() {
                this.ordPplAmt++;
            },
            ordCalPplAmtMinus() {
                this.ordPplAmt--;
                if (this.ordPplAmt < 0) {
                    this.ordPplAmt = 0;
                }
            }
        }
    })

}



