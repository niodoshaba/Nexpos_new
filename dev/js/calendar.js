
    var Calendar = {
    month: document.querySelectorAll('[calendarArea="month"]')[0],
    next: document.querySelectorAll('[calendarToggle="next"]')[0],
    previous: document.querySelectorAll('[calendarToggle="previous"]')[0],
    label: document.querySelectorAll('[calendarLabel="month"]')[0],
    activeDates: [],
    date: new Date(),
    todaysDate: new Date(),
    
    init: function (options) {
      this.options = options
      this.date.setDate(1)
      this.createMonth()
      this.createListeners()
    },
  
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
  
      dateEl.innerHTML = num
      newDay.className = 'calendarDate'
  
        ///GMT轉格式
        let curdate = new Date(this.date)
        let currentDate=curdate.getFullYear() + "-" +
        (curdate.getMonth() + 1) + "-" + 
        curdate.getDate() + ""
  
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
      
    //   console.log(newDay)
    },
  

  
    dateClicked: function () {
      DAILY_RES = [
  
      {
        DAILY_DATE:"2020-6-22",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:4
      },
      {
        DAILY_DATE:"2020-6-23",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:8
      },
      {
        DAILY_DATE:"2020-6-24",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:10
      },
      {
        DAILY_DATE:"2020-6-25",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:15
      },
      {
        DAILY_DATE:"2020-6-26",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:17
      },
      {
        DAILY_DATE:"2020-6-27",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:16
      },
      {
        DAILY_DATE:"2020-6-28",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:10
      },
      {
        DAILY_DATE:"2020-6-29",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:4
      },
      {
        DAILY_DATE:"2020-6-30",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:20
      },
      {
        DAILY_DATE:"2020-7-1",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:8
      },
      {
        DAILY_DATE:"2020-7-2",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:11
      },
      {
        DAILY_DATE:"2020-7-3",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:20
      },
      {
        DAILY_DATE:"2020-7-4",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:1
      }, 
      {
        DAILY_DATE:"2020-7-5",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:17
      }, 
      {
        DAILY_DATE:"2020-7-6",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:5
      }, 
      {
        DAILY_DATE:"2020-7-7",
        DAILY_STA:0,
        DAILY_AVA:20,
        DAILY_NUM:1
      }, 
    ]
  
      var _this = this
      this.activeDates = document.querySelectorAll(
        '[data-calendar-status="active"]'
      )
      
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
        //   console.log(this.dataset.calendarDate)
          // console.log(DAILY_RES[0].DAILY_DATE)
  
          var resAbleCount = DAILY_RES.find(function(item, index, array){
              return item.DAILY_DATE === resAbleDate
          });
  
        //   console.log(resAbleCount)
          resAbleNum = resAbleCount.DAILY_AVA - resAbleCount.DAILY_NUM
  
            if(resAbleNum === 0){
              
            document.getElementById("calendarPickDate").value="";
            // picked.innerHTML = ''
            resable.innerHTML = '<span style="color:#E98E89"> 已客滿，請選擇其他日期</span>'
            _this.removeActiveClass()
            this.classList.add('calendarDate--full')
            //   console.log(13)
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
      var ResName = /^[\u4E00-\u9FA5]{2,4}$/   //2-4個中文字
      var ResPhone = /^09\d{8}$/  //09後接8個數字
      var ResPeopleCount =  /^\d{1,2}$/  //1-2個數字

      $('#resFormName').blur(function(){
        if(resFormName.value.match(ResName)){
          resFormName.style.color = "black"
        }else{
          resFormName.style.color = "#E98E89"
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

      // $("#resFormSubmit").mouseover(function(){
      //   if(resFormName.style.color = "#E98E89"){
      //     $('#resFormSubmit').attr("disabled","disabled");
      //     resFormSubmit.style.cursor = "not-allowed"

      //   }else if(resFormPeopleCount.style.color = "#E98E89"){
      //     $('#resFormSubmit').attr("disabled","disabled");
      //     resFormSubmit.style.cursor = "not-allowed"

      //   }else if(resFormPhone.style.color = "#E98E89"){
      //     $('#resFormSubmit').attr("disabled","disabled");
      //     resFormSubmit.style.cursor = "not-allowed"
          
      //   }else{
      //     $('#resFormSubmit').attr("disabled",false);
      //     resFormSubmit.style.cursor = "pointer"
      //   }
      // })
    }
  }
