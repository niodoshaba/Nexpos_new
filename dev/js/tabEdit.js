var shapeText = document.querySelector('option').innerText;
//var shape = document.querySelector('option').innerText; //ok
var tabShapeSelect = document.querySelector('#tabShapeSelect');
tabShapeSelect.addEventListener('change', (e) => {
  shapeText = e.target.value;
});

//產生餐桌按鈕
let tabAddBtn = document.getElementById('tabAddBtn');
//儲存按鈕
let tabSaveBtn = document.getElementById('tabSaveBtn');  
let tabContainer = document.getElementById('resize-tabContainer');

//計數按幾次
var count = 0;
var positionArr = [];

//interactjs
//要讓不同形狀都可移動就是讓他們共用一個css樣式
interact(".tabragobj")

//限制餐桌只能在限制範圍內裡移動
interact(".tabragobj").draggable({
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent'
    })
  ]
})

.draggable({
  onmove: window.dragMoveListener
})
.resizable({
  preserveAspectRatio: false,
  edges: { left: false, right: false, bottom: false, top: false }
})
.on('resizemove', function (event) {
  var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

  // update the element's style
  target.style.width  = event.rect.width + 'px';
  target.style.height = event.rect.height + 'px';

  // translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)';

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  //target.textContent = event.rect.width + '×' + event.rect.height;
  
});

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

  //刪除餐桌
  interact('.dropzone')
  .dropzone({
    ondragenter: function (event){
    //var draggableElement = event.relatedTarget
    var draggableElement = event.relatedTarget.parentNode
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    // draggableElement.classList.add('hidden')
    draggableElement.removeChild(event.relatedTarget)
  
    }
  })                                  


function saveAllDataToJson(data){
  localStorage.setItem("allData",JSON.stringify(data));
} 

tabSaveBtn.addEventListener('click',function(){
  
  // console.log(tabContainer.childElementCount);
  if(tabContainer.childElementCount == 0){
    console.log('至少要有一個位置才能儲存');
  }else{
  var positionArr = [];
  // console.log(tabContainer.childElementCount);
    for(i=0;i<tabContainer.childElementCount;i++){
      var tabShapeName = tabContainer.childNodes[i].getAttribute('class');
      positionArr.push(
        {
          id: tabContainer.childNodes[i].getAttribute('id'),
          x: tabContainer.childNodes[i].getAttribute('data-x'),
          y: tabContainer.childNodes[i].getAttribute('data-y'),
          test: tabContainer.childNodes[i].getAttribute('style'),
          top: window.getComputedStyle(tabContainer.childNodes[i]).getPropertyValue('top'),
          left: window.getComputedStyle(tabContainer.childNodes[i]).getPropertyValue('left'),
          shape: tabShapeName.substring(0, tabShapeName.indexOf(' ')),
          bgc: window.getComputedStyle(tabContainer.childNodes[i]).getPropertyValue('background-color'),
          height: window.getComputedStyle(tabContainer.childNodes[i]).getPropertyValue('height'),
          width: window.getComputedStyle(tabContainer.childNodes[i]).getPropertyValue('width'),
          borderRadius: window.getComputedStyle(tabContainer.childNodes[i]).getPropertyValue('border-radius')
        }
      );
      
    }
    // console.log(positionArr);
    saveAllDataToJson(positionArr);
  }
  
});

tabAddBtn.addEventListener('click',function(){

  count ++;
  //appendchild
  let tabItem = document.createElement('li');
  //餐桌編號
  tabItem.textContent = `A${count}`;
  //
  tabItem.className = shapeText + " tabragobj" + " tabPosition";

  tabItem.id = `A${count}`;
  
  tabContainer.appendChild(tabItem);
  
});