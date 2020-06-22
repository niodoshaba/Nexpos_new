
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
var fpPercentCont={val:0} , fpPercentNewVal = 58 ;

TweenMax.to(fpPercentCont,5,{
  val:fpPercentNewVal,
  roundProps:"val",
  onUpdate:function(){
  document.getElementById("fpPercent").innerHTML=fpPercentCont.val + "%"
}});
// ----------------------
var fpSaleNoCont={val:0} , fpSaleNoNewVal = 97 ;

TweenMax.to(fpSaleNoCont,5,{
  val:fpSaleNoNewVal,
  roundProps:"val",
  onUpdate:function(){
  document.getElementById("fpSaleNo").innerHTML=fpSaleNoCont.val + "%"
}});
// -----------------------
var fpStoreNoCont={val:0} , fpStoreNoNewVal = 12378 ;

TweenMax.to(fpStoreNoCont,5,{
  val:fpStoreNoNewVal,
  roundProps:"val",
  onUpdate:function(){
  document.getElementById("fpStoreNo").innerHTML=fpStoreNoCont.val;
}});


//----------parallax----------
var controller = new ScrollMagic.Controller();

$(".fpParallaxWrapper").each(function() {
  var tl = new TimelineMax();
  var fpChild = $(this).find(".fpChild");
  tl.to(fpChild, 1, { y: -180, ease: Linear.easeNone });

  var scene = new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0.4,
    duration: "100%"
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

//-----------change background color------------
var scrollMagicController = new ScrollMagic.Controller();

var t1 = TweenMax.to('.section1', 0.6);

var t2a = new TimelineLite();
t2a.to('.section2', 0.6);

var t2b = TweenMax.to('.section2', 0.6);


var sceneForSection1 = new ScrollMagic.Scene({
  triggerElement: '.section1',
  offset: 30
})
.setTween(t1)
.addIndicators({
  name: 'indicator0',
  colorTigger: 'black',
  colorStart: 'black',
  colorEnd: 'black'
})
.addTo(scrollMagicController);

var sceneForSection2a = new ScrollMagic.Scene({
triggerElement: '.section2',
// duration: 500,
triggerHook: 0.6,
offset: -300 /* offset the trigger 100px below #scene's top */
})
.setTween(t2a)
.addIndicators({
  name: 'indicator2a',
  colorTigger: 'black',
  colorStart: 'black',
  colorEnd: 'black'
})
.addTo(scrollMagicController);

var sceneForSection2b = new ScrollMagic.Scene({
triggerElement: '.section2',
// duration: 500,
triggerHook: 0.8,
offset: 500 /* offset the trigger 800px over #scene's top */
})
.setTween(t2b)
.addIndicators({
name: 'indicator2b',
colorTigger: 'black',
colorStart: 'black',
colorEnd: 'black'
})
.addTo(scrollMagicController);




  
  












