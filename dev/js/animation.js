
// import $ from 'jquery'

//----------GSAP第一屏的球球----------
TweenMax.to('#fpBall_db',28, {
    bezier: function(){
      return  [{x: 20,y: 30},{x: 10,y: 10,},{x: 15,y: 15,},{x: 20,y: 50},{x: 10,y: 60,}]
    },
    repeat: -1,
    yoyo: true,
})
TweenMax.to('#fpBall_g',26, {
  bezier: function(){
    return  [{x: 25,y: 20},{x: 40,y: 40,},{x: 15,y: 15,},{x: 30,y: 50},{x: 20,y: 10,}]
  },
  repeat: -1,
  yoyo: true,
})
TweenMax.to('#fpBall_o',24, {
  bezier: function(){
    return  [{x: 0,y: 0},{x: 10,y: 10,},{x: 15,y: 15,},{x: 20,y: 50},{x: 10,y: 10,}]
  },
  repeat: -1,
  yoyo: true,
})
TweenMax.to('#fpBall_b',26, {
  bezier: function(){
    return  [{x: 20,y: 15},{x: 20,y: 20,},{x: 30,y: 15,},{x: 25,y: 50},{x: 30,y: 10,}]
  },
  repeat: -1,
  yoyo: true,
})
TweenMax.to('#fpBall_p',18, {
  bezier: function(){
    return  [{x: 10,y: 5},{x: 10,y: 10,},{x: 15,y: 15,},{x: 20,y: 50},{x: 10,y: 10,}]
  },
  repeat: -1,
  yoyo: true,
})
TweenMax.to('#fpBall_y',20, {
  bezier: function(){
    return  [{x: 40,y: 40},{x: 30,y: 30,},{x: 15,y: 15,},{x: 20,y: 50},{x: 0,y: 0,}]
  },
  repeat: -1,
  yoyo: true,
})

//----------GSAP數字遞增----------
var numStart = document.querySelector('.fpHomepage4');

function start(){
  var fpPercentCont={val:0} , fpPercentNewVal = 58 ;
  TweenMax.to(fpPercentCont,3,{
    val:fpPercentNewVal,
    roundProps:"val",
    onUpdate:function(){
    document.getElementById("fpPercent").innerHTML=fpPercentCont.val + "%"
  }});
  //........................ 
  var fpSaleNoCont={val:0} , fpSaleNoNewVal = 97 ;

  TweenMax.to(fpSaleNoCont,3,{
    val:fpSaleNoNewVal,
    roundProps:"val",
    onUpdate:function(){
    document.getElementById("fpSaleNo").innerHTML=fpSaleNoCont.val + "%"
  }});
  //........................ 
  var fpStoreNoCont={val:0} , fpStoreNoNewVal = 12378 ;

  TweenMax.to(fpStoreNoCont,3,{
    val:fpStoreNoNewVal,
    roundProps:"val",
    onUpdate:function(){
    document.getElementById("fpStoreNo").innerHTML=fpStoreNoCont.val;
  }});
}
  numStart.addEventListener('mouseover', start, {once:true});

//----------parallax----------
var controller = new ScrollMagic.Controller();

$(".fpParallaxWrapper").each(function() {
  var tl = new TimelineMax();
  var fpChild_left = $(this).find(".fpChild_left");
  tl.to(fpChild_left, 1, { y: -80, ease: Linear.easeNone });
  var fpChild_right = $(this).find(".fpChild_right");
  tl.to(fpChild_right, 1, { y: -80, ease: Linear.easeNone });

  var scene = new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0.4,
    duration: 300
  })
  .setTween(tl)
  // .addIndicators({
  //   colorTrigger: "black",
  //   colorStart: "black",
  //   colorEnd: "black",
  //   indent: 10
  // })
  .addTo(controller);
});



  
  












