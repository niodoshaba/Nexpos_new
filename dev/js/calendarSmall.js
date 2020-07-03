
    var Calendar = {
    month: document.querySelectorAll('[calendarArea="month"]')[0],
    next: document.querySelectorAll('[calendarToggle="next"]')[0],
    previous: document.querySelectorAll('[calendarToggle="previous"]')[0],
    label: document.querySelectorAll('[calendarLabel="month"]')[0],



    activeDates: [],
    date: new Date(),
    todaysDate: new Date(),


    
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

      // console.log(DAILY_TABLE)
      dateEl.innerHTML = num
      newDay.className = 'S_calendarDate'
  
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

        newDay.classList.add('calendarDate--active')
        newDay.setAttribute('data-calendar-status', 'active')
      
      
      newDay.appendChild(dateEl)
      this.month.appendChild(newDay)
      

      // console.log(newDay)
    },
  

  
    dateClicked: function () {
    
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
          // console.log(this.dataset.calendarDate)
          // console.log(DAILY_RES[0].DAILY_DATE)

  
            
            ///顯示選取日期在下方
            ///移除其他選取日期
            ///改變選取日期CSS(加框框)
            // console.log(15)
            document.getElementById("calendarPickDate").innerHTML=resAbleDate;
            // picked.innerHTML = resAbleDate
            _this.removeActiveClass()
            this.classList.add('calendarDate--selected')
            
            console.log(resAbleDate)

          })
      }
    },
  
    createMonth: function () {
      var currentMonth = this.date.getMonth()
      while (this.date.getMonth() === currentMonth) {
        this.createDay(
          this.date.getDate(),
          this.date.getDay(),
        )
        this.date.setDate(this.date.getDate() + 1)
      }
    
      this.date.setDate(1)
      this.date.setMonth(this.date.getMonth() - 1)
  
      this.label.innerHTML =
        this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
      this.dateClicked()
      // console.log(this)


      let yearCalendarSelect = document.getElementById('yearCalendarSelect')
      let S_calendarHeaderTop = document.getElementsByClassName('S_calendarHeaderTop')
      let eachYearClass = document.getElementsByClassName('eachYearClass')

      let allYear = this.date

      let str = ""
      for(i=0;i<60;i++){
        
        let eachYear = "<div id='eachYearDiv'><span class='eachYearClass'>" + (allYear.getFullYear() - i) +"</span></div>"

        str += eachYear
      }
      
      yearCalendarSelect.innerHTML = str
      

      //點擊年份產生年份選擇
      for(i=0;i<S_calendarHeaderTop.length;i++)
      S_calendarHeaderTop[i].addEventListener('click', function(){
          yearCalendarSelect.style.width="100%"
          yearCalendarSelect.style.height="100%"
          yearCalendarSelect.style.opacity="1"

      })

      for(i=0;i<eachYearClass.length;i++){
        eachYearClass[i].addEventListener('click', function(){
          yearCalendarSelect.style.width="0%"
          yearCalendarSelect.style.height="0%"

          console.log(this.innerHTML)

          Calendar.date.setFullYear(this.innerHTML)
          var currentYear = Calendar.date.getFullYear()

          while (Calendar.date.getFullYear() === currentYear) {
            Calendar.createDay(
              Calendar.date.getDate(),
              Calendar.date.getDay(),
            )
            Calendar.date.setDate(Calendar.date.getDate() + 1)
          }
        
          Calendar.date.setDate(1)
          Calendar.date.setMonth(Calendar.date.getMonth() - 1)

          Calendar.clearCalendar()
          Calendar.createMonth()
   
          Calendar.label.innerHTML =
          Calendar.monthsAsString(Calendar.date.getMonth()) + ' ' + Calendar.date.getFullYear()
          Calendar.dateClicked()

          console.log(Calendar.date.getFullYear(this.innerHTML))
        })
      }
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


  } 