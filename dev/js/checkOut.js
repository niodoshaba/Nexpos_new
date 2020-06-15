window.addEventListener('load',function(){


    let checkoutLeftSideMidItemTop = document.getElementsByClassName("checkoutLeftSideMidItemTop")
 
    let checkoutIfEachCheck = document.getElementById("checkoutIfEachCheck")
    let checkoutIfDiscount = document.getElementById("checkoutIfDiscount")
    let checkoutIfPoint = document.getElementById("checkoutIfPoint")
    let checkoutDiscountBtn = document.getElementById("checkoutDiscountBtn")
    let checkoutPointBtn = document.getElementById("checkoutPointBtn")
    let checkoutEachCheckBtn = document.getElementById("checkoutEachCheckBtn")


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
    })
    checkoutPointBtn.addEventListener("click",function(){
        checkoutIfEachCheck.style.display = "none";
        checkoutIfDiscount.style.display = "none";
        checkoutIfPoint.style.display = "initial";
    })
    checkoutEachCheckBtn.addEventListener("click",function(){
        checkoutIfEachCheck.style.display = "initial";
        checkoutIfDiscount.style.display = "none";
        checkoutIfPoint.style.display = "none";
    })



})