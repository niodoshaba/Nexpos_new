
    var Calendar = {
    month: document.querySelectorAll('[calendarArea="month"]')[0],
    next: document.querySelectorAll('[calendarToggle="next"]')[0],
    previous: document.querySelectorAll('[calendarToggle="previous"]')[0],
    label: document.querySelectorAll('[calendarLabel="month"]')[0],
    activeDates: [],
    date: new Date(),
    todaysDate: new Date(),
    DAILY_RES : [],

    
    //初始化
    init: function (options) {
      this.options = options
      this.date.setDate(1)
      this.createMonth()
      this.createListeners()
    },
  
    //前後月份
    createListeners: function () {
      var _this = this
      this.next.addEventListener('click', function () {
        _this.clearCalendar()
        var nextMonth = _this.date.getMonth() + 1
        _this.date.setMonth(nextMonth)
        _this.createMonth()
      })
  
      this.previous.addEventListener('click', function () {
        _this.clearCalendar()
        var prevMonth = _this.date.getMonth() - 1
        _this.date.setMonth(prevMonth)
        _this.createMonth()
      })
    },
  
      //產生每個日期，加上class=calendarDate, data-calendar-date
    createDay: function (num, day, year) {
      var newDay = document.createElement('div')
      var dateEl = document.createElement('span')
      var DAILY_TABLE = this.DAILY_RES

      // console.log(DAILY_TABLE)


  
      dateEl.innerHTML = num
      newDay.className = 'calendarDate'
  
        ///GMT轉格式
        let curdate = new Date(this.date)
        let currentDate=curdate.getFullYear() + "-" +
        (curdate.getMonth()+1<10 ? '0' : '') + (curdate.getMonth() + 1) + "-" + 
        (curdate.getDate()<10 ? '0' : '') + curdate.getDate() + ""
  
      newDay.setAttribute('data-calendar-date',currentDate)
     
      //如果是1號的時候，判斷星期幾(day)
      //根據空格數推marginLeft
      //14.28是100/7
      if (num === 1) {
          newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
      }
  
      //如果日期小於今天日期加上disable的class，其他的加上active
      if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
        newDay.classList.add('calendarDate--disabled') //
      } else {
        newDay.classList.add('calendarDate--active')
        newDay.setAttribute('data-calendar-status', 'active')
      }
      
      newDay.appendChild(dateEl)
      this.month.appendChild(newDay)
      

      // console.log(newDay)


///渲染時判斷日期是否客滿

      let calendarDateClass =document.getElementsByClassName("calendarDate")
      


      for(i=0;i<calendarDateClass.length;i++){

        let resAbleDateRander = calendarDateClass[i].dataset.calendarDate

      // console.log(resAbleDateRander)
      // console.log(DAILY_TABLE)

        var resAbleCountRander = DAILY_TABLE.find(function(item, index, array){
          return item.DAILY_DATE === resAbleDateRander
      });
        let resDateOpenRander = resAbleCountRander.DAILY_STA
      console.log(resDateOpenRander)

        resAbleNumRander = resAbleCountRander.DAILY_AVA - resAbleCountRander.DAILY_NUM
        if(resAbleNumRander == 0 ){
          calendarDateClass[i].style.color = "#E98E89";
          calendarDateClass[i].style.cursor = "not-allowed";
        }else if(resDateOpenRander == 0){
          
          calendarDateClass[i].classList.remove()
          calendarDateClass[i].classList.add('calendarDate--disabled')
        }
      }

    },
  

  
    dateClicked: function () {
    
      var _this = this
      this.activeDates = document.querySelectorAll(
        '[data-calendar-status="active"]'
      )
      var DAILY_TABLE = this.DAILY_RES
      ///每個日期建立點擊事件
      for (var i = 0; i < this.activeDates.length; i++) {
  
        // let resAbleNum = DAILY_RES[i].DAILY_AVA - DAILY_RES[i].DAILY_NUM
        var resable =  document.querySelectorAll(
          '[calendarResAble="respeople"]'
        )[0]
  
        this.activeDates[i].addEventListener('click', function (event) {
          var picked = document.querySelectorAll(
            '[calendarLabel="picked"]'
          )[0]
          let resAbleDate = this.dataset.calendarDate;
          // console.log(this.dataset.calendarDate)
          // console.log(DAILY_RES[0].DAILY_DATE)
  
          var resAbleCount = DAILY_TABLE.find(function(item, index, array){
              return item.DAILY_DATE === resAbleDate
          });
  
        //   console.log(resAbleCount)
          resAbleNum = resAbleCount.DAILY_AVA - resAbleCount.DAILY_NUM
          resDateOpen = resAbleCount.DAILY_STA
          console.log(resDateOpen)
            if(resAbleNum <= 0){
              
            document.getElementById("calendarPickDate").value="";
            // picked.innerHTML = ''
            resable.innerHTML = '<span style="color:#E98E89"> 已客滿，請選擇其他日期</span>'
            _this.removeActiveClass()
            this.classList.add('calendarDate--full')
            //   console.log(13)
            }else if(resDateOpen == 0){
            resable.innerHTML = '<span style="color:#9C9C9C"> 該日期不開放預約，請選擇其他日期</span>'
            _this.removeActiveClass()
            this.classList.add('calendarDate--full')

            }else{
              resable.innerHTML = resAbleNum

            ///顯示選取日期在下方
            ///移除其他選取日期
            ///改變選取日期CSS(加框框)
            // console.log(15)
            document.getElementById("calendarPickDate").value=resAbleDate;
            // picked.innerHTML = resAbleDate
            _this.removeActiveClass()
            this.classList.add('calendarDate--selected')  
            }
            console.log(resAbleDate)
            
            //點擊日曆左滑然後表單出現的效果
            $("#calendarAll").css("width","65%")
            $("#calendarAll").css("marginLeft","0%")
            $(".calendarRight").css("marginLeft","65%")
            $(".calendarRight").css("opacity","1")
            $(".result").css("opacity","1")
          })
      }
    },
  
    createMonth: function () {
      var currentMonth = this.date.getMonth()
      while (this.date.getMonth() === currentMonth) {
        this.createDay(
          this.date.getDate(),
          this.date.getDay(),
          this.date.getFullYear()
        )
        this.date.setDate(this.date.getDate() + 1)
      }
    
      this.date.setDate(1)
      this.date.setMonth(this.date.getMonth() - 1)
  
      this.label.innerHTML =
        this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
      this.dateClicked()
    },
  
    monthsAsString: function (monthIndex) {
      return [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ][monthIndex]
    },
  
    clearCalendar: function () {
      Calendar.month.innerHTML = ''
    },
  
    removeActiveClass: function () {
      for (var i = 0; i < this.activeDates.length; i++) {
        this.activeDates[i].classList.remove('calendarDate--selected')
        this.activeDates[i].classList.remove('calendarDate--full')
      }
    },
    addCalendarInfo: function(){
      for(var i =0 ; i < this.activeDates.length; i++) {
  
      }
    },  

    //輸入預約資料判斷正確格式
    
    matchcalendarInfo: function(){
      var ResName = /^[\u4E00-\u9FA5]{1,2}$/   //2-4個中文字

      var ResPhone = /^09\d{8}$/  //09後接8個數字
      var ResPeopleCount =  /^\d{1,2}$/  //1-2個數字

      $('#resFormFirstName').blur(function(){
        if(resFormFirstName.value.match(ResName)){
          resFormFirstName.style.color = "black"
        }else{
          resFormFirstName.style.color = "#E98E89"
        }
      })
      $('#resFormLastName').blur(function(){
        if(resFormLastName.value.match(ResName)){
          resFormLastName.style.color = "black"
        }else{
          resFormLastName.style.color = "#E98E89"
        }
      })

      $('#resFormPhone').blur(function(){
        if(resFormPhone.value.match(ResPhone)){
          resFormPhone.style.color = "black"
        }else{
          resFormPhone.style.color = "#E98E89"
        }
      })

      $('#resFormPeopleCount').blur(function(){
        if(resFormPeopleCount.value.match(ResPeopleCount)){
          resFormPeopleCount.style.color = "black"
        }else{
          resFormPeopleCount.style.color = "#E98E89"
        }
      })

    },

    getCalendarData: function(){
      // // var calendarDataFromPHP = []
      // let xhr = new XMLHttpRequest();
      
      // xhr.onload = function (){
      //   if(xhr.status == 200){
      //     Calendar.DAILY_RES = JSON.parse(xhr.responseText);
      //           console.log(Calendar.DAILY_RES)
      //   }
      // }
      // xhr.open("get", "../dev/js/calendarData.php", true);
      // xhr.send(null);
    },
  }
    // [
    //   {
    //     DAILY_DATE:"2020-06-01",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   },
    //   {
    //     DAILY_DATE:"2020-06-02",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:2
    //   },
    //   {
    //     DAILY_DATE:"2020-06-03",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:12
    //   },
    //   {
    //     DAILY_DATE:"2020-06-04",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   },
    //   {
    //     DAILY_DATE:"2020-06-05",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   },
    //   {
    //     DAILY_DATE:"2020-06-06",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   },
    //   {
    //     DAILY_DATE:"2020-06-07",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:2
    //   },
    //   {
    //     DAILY_DATE:"2020-06-08",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-09",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:9
    //   },
    //   {
    //     DAILY_DATE:"2020-06-10",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:2
    //   },
    //   {
    //     DAILY_DATE:"2020-06-11",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:9
    //   },
    //   {
    //     DAILY_DATE:"2020-06-12",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:7
    //   },
    //   {
    //     DAILY_DATE:"2020-06-13",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:5
    //   },
    //   {
    //     DAILY_DATE:"2020-06-14",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-15",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   },
    //   {
    //     DAILY_DATE:"2020-06-16",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:2
    //   },
    //   {
    //     DAILY_DATE:"2020-06-17",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-18",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-19",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-20",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-21",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-22",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:4
    //   },
    //   {
    //     DAILY_DATE:"2020-06-23",
    //     DAILY_STA:0,
    //     DAILY_AVA:21,
    //     DAILY_NUM:8
    //   },
    //   {
    //     DAILY_DATE:"2020-06-24",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-25",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:15
    //   },
    //   {
    //     DAILY_DATE:"2020-06-26",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:17
    //   },
    //   {
    //     DAILY_DATE:"2020-06-27",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:16
    //   },
    //   {
    //     DAILY_DATE:"2020-06-28",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:10
    //   },
    //   {
    //     DAILY_DATE:"2020-06-29",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:4
    //   },
    //   {
    //     DAILY_DATE:"2020-06-30",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   },
    //   {
    //     DAILY_DATE:"2020-07-01",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:8
    //   },
    //   {
    //     DAILY_DATE:"2020-07-02",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:11
    //   },
    //   {
    //     DAILY_DATE:"2020-07-03",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   },
    //   {
    //     DAILY_DATE:"2020-07-04",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:1
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-05",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:17
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-06",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:5
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-07",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:1
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-08",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:1
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-09",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:6
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-10",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:1
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-11",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:18
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-12",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:11
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-13",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-14",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:11
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-15",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:18
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-16",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:1
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-17",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:14
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-18",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-19",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:1
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-20",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:1
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-21",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:3
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-22",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:6
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-23",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-24",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-25",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:9
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-26",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:8
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-27",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:2
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-28",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:16
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-29",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:17
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-30",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:18
    //   }, 
    //   {
    //     DAILY_DATE:"2020-07-31",
    //     DAILY_STA:0,
    //     DAILY_AVA:20,
    //     DAILY_NUM:20
    //   }, 
    // ],