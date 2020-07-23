
window.addEventListener('load', function () {
    let toptab = document.getElementsByClassName('topTab')
    let anaResBtn = document.getElementById('anaResBtn')
    let anaMoneyBtn = document.getElementById('anaMoneyBtn')
    let anaPeopleBtn = document.getElementById('anaPeopleBtn')
    let anaProBtn = document.getElementById('anaProBtn')
    let chartDiv = document.getElementById('chartDiv')


    //隨機顏色
    function randColors() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ", 0.8)";
    }

    //產生陣列多個隨機顏色
    function gogoColors(a) {
        let pool = [];

        for (i = 0; i < a; i++) {
            pool.push(randColors());
        }

        return pool;
    }

    let now = new Date();
    let today = `${now.getFullYear()}-${(now.getMonth() + 1) < 10 ? 0 : ''}${now.getMonth() + 1}-${(now.getDate() + 1) < 10 ? 0 : ''}${now.getDate()}`;
    // document.getElementById("anaStart").setAttribute('min',today)
    // document.getElementById("anaStart").setAttribute('value',today)


    document.getElementById('resAnaTag').addEventListener('click', function () {
        toptab[0].setAttribute('id', 'topTabactives')
        toptab[1].removeAttribute('id', 'topTabactives')
        toptab[2].removeAttribute('id', 'topTabactives')
        toptab[3].removeAttribute('id', 'topTabactives')

        anaResBtn.style.display = "inline-block"
        anaMoneyBtn.style.display = "none"
        anaPeopleBtn.style.display = "none"
        anaProBtn.style.display = "none"

    })

    document.getElementById('moneyAnaTag').addEventListener('click', function () {
        toptab[1].setAttribute('id', 'topTabactives')
        toptab[0].removeAttribute('id', 'topTabactives')
        toptab[2].removeAttribute('id', 'topTabactives')
        toptab[3].removeAttribute('id', 'topTabactives')

        anaResBtn.style.display = "none"
        anaMoneyBtn.style.display = "inline-block"
        anaPeopleBtn.style.display = "none"
        anaProBtn.style.display = "none"

    })

    document.getElementById('peopleAnaTag').addEventListener('click', function () {
        toptab[2].setAttribute('id', 'topTabactives')
        toptab[0].removeAttribute('id', 'topTabactives')
        toptab[1].removeAttribute('id', 'topTabactives')
        toptab[3].removeAttribute('id', 'topTabactives')

        anaResBtn.style.display = "none"
        anaMoneyBtn.style.display = "none"
        anaPeopleBtn.style.display = "inline-block"
        anaProBtn.style.display = "none"

    })

    document.getElementById('proAnaTag').addEventListener('click', function () {
        toptab[3].setAttribute('id', 'topTabactives')
        toptab[0].removeAttribute('id', 'topTabactives')
        toptab[2].removeAttribute('id', 'topTabactives')
        toptab[1].removeAttribute('id', 'topTabactives')

        anaResBtn.style.display = "none"
        anaMoneyBtn.style.display = "none"
        anaPeopleBtn.style.display = "none"
        anaProBtn.style.display = "inline-block"

    })

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    ///////↓↓↓↓↓預約日期+預約人數↓↓↓↓↓↓
    document.getElementById('anaResBtn').addEventListener('click', function () {
        chartDiv.innerHTML = "&nbsp"
        chartDiv.innerHTML = `<canvas id="myChart1"></canvas>`;
        let myChart1 = document.getElementById('myChart1')



        console.log(document.getElementById("anaStart").value)
        console.log(document.getElementById("anaEnd").value)

        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status == 200) {
                var AnaAll = JSON.parse(xhr.responseText);
                console.log(AnaAll)

                // let AnaAllDate = []
                let DateList = AnaAll[0].map(item => Object.values(item)[0])  //預約日期
                let NumList = AnaAll[1].map(item => Object.values(item)[0])  //預約人數
                // let OrdDateList = AnaAll[2].map(item => Object.values(item)[0])  //訂單日期
                // let OrdNumList = AnaAll[3].map(item => Object.values(item)[0])  //訂單金額
                // let OrdMoneyList = AnaAll[4].map(item => Object.values(item)[0])  //訂單人數


                console.log(DateList)
                console.log(NumList)

                //一定要 canvas 的標籤才能使用getContext('2d');
                myChart1.getContext('2d');
                //整體文字樣式設定
                Chart.defaults.global.defaultFontFamily = 'cwTeXYen';
                Chart.defaults.global.defaultFontSize = 18;
                Chart.defaults.global.defaultFontColor = '#777';

                let massPopChart = new Chart(myChart1, {
                    type: 'bar', //圖表類型 bar , horizontalBar, pie, line, doughnut, radar, polarArea
                    //--------------
                    data: {
                        labels: DateList, //項目
                        datasets: [{
                            
                            data: NumList, //資料內容
                            backgroundColor: gogoColors(DateList.length),
                            borderWidth: 0,

                        }]
                    },
                    //--------------
                    options: {  //對各玩意兒設定
                        responsive: true,  //資料從0開始
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true

                                }
                            }],
                            xAxes: [{
                                ticks: {

                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false,
                                },
                            }]
                        },
                        title: {  //標題設定
                            display: true,
                            text: '預約報表( 預約人數 / 預約日期 )',
                            fontSize: 25,
                            position: 'top'
                        },
                        legend: {  //小標題設定
                            display: false,
                            position: 'right',
                            labels: {
                                fontColor: 'black'
                            }
                        },
                        layout: {  //整塊圖表範圍的調整
                            padding: {
                                left: 0,
                                right: 0,
                                bottom: 0,
                                top: 30
                            }
                        },
                        tooltips: {  //tooltip開關
                            enabled: true
                        }
                    }
                });
            }
        }

        xhr.open("POST", "./js/dataAnalysis.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        let anaData = "anaStart=" + document.getElementById("anaStart").value + "&anaEnd=" + document.getElementById("anaEnd").value;
        xhr.send(anaData);
    })


    /////// 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    ///////↓↓↓↓↓日期+營收↓↓↓↓↓↓


    document.getElementById('anaMoneyBtn').addEventListener('click', function () {
        chartDiv.innerHTML = "&nbsp"
        chartDiv.innerHTML = `<canvas id="myChart2"></canvas>`;
        let myChart2 = document.getElementById('myChart2')
        // let myChart3 = document.getElementById('myChart3')
        // let myChart4 = document.getElementById('myChart4')

        console.log(document.getElementById("anaStart").value)
        console.log(document.getElementById("anaEnd").value)

        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status == 200) {
                var AnaAll = JSON.parse(xhr.responseText);
                console.log(AnaAll)

                // let AnaAllDate = []
                // let DateList = AnaAll[0].map(item => Object.values(item)[0])  //預約日期
                // let NumList = AnaAll[1].map(item => Object.values(item)[0])  //預約人數
                let OrdDateList = AnaAll[2].map(item => Object.values(item)[0])  //訂單日期
                let OrdMoneyList = AnaAll[3].map(item => Object.values(item)[0])  //訂單金額
                // let OrdMoneyList = AnaAll[4].map(item => Object.values(item)[0])  //訂單人數



                //一定要 canvas 的標籤才能使用getContext('2d');
                myChart2.getContext('2d');
                //整體文字樣式設定
                Chart.defaults.global.defaultFontFamily = 'cwTeXYen';
                Chart.defaults.global.defaultFontSize = 18;
                Chart.defaults.global.defaultFontColor = '#777';

                let massPopChart = new Chart(myChart2, {
                    type: 'line', //圖表類型 bar , horizontalBar, pie, line, doughnut, radar, polarArea
                    //--------------
                    data: {
                        labels: OrdDateList, //項目
                        datasets: [{
                            label: '營收', //圖表標題
                            data: OrdMoneyList, //資料內容
                            backgroundColor: gogoColors(OrdDateList.length),
                            borderWidth: 0,

                        }]
                    },
                    //--------------
                    options: {  //對各玩意兒設定
                        responsive: true,  //資料從0開始
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        title: {  //標題設定
                            display: true,
                            text: '營收報表( 訂單金額 / 訂單日期 )',
                            fontSize: 25,
                            position: 'top'
                        },
                        legend: {  //小標題設定
                            display: false,
                            position: 'right',
                            labels: {
                                fontColor: 'black'
                            }
                        },
                        layout: {  //整塊圖表範圍的調整
                            padding: {
                                left: 0,
                                right: 0,
                                bottom: 0,
                                top: 30
                            }
                        },
                        tooltips: {  //tooltip開關
                            enabled: true
                        }
                    }
                });
            }
        }

        xhr.open("POST", "./js/dataAnalysis.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        let anaData = "anaStart=" + document.getElementById("anaStart").value + "&anaEnd=" + document.getElementById("anaEnd").value;
        xhr.send(anaData);
    })
    /////// 
    ///////↓↓↓↓↓日期+客流↓↓↓↓↓


    document.getElementById('anaPeopleBtn').addEventListener('click', function () {
        chartDiv.innerHTML = "&nbsp"
        chartDiv.innerHTML = `<canvas id="myChart3"></canvas>`;
        // let myChart2 = document.getElementById('myChart2')
        let myChart3 = document.getElementById('myChart3')
        // let myChart4 = document.getElementById('myChart4')

        console.log(document.getElementById("anaStart").value)
        console.log(document.getElementById("anaEnd").value)

        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status == 200) {
                var AnaAll = JSON.parse(xhr.responseText);
                console.log(AnaAll)

                // let AnaAllDate = []
                // let DateList = AnaAll[0].map(item => Object.values(item)[0])  //預約日期
                // let NumList = AnaAll[1].map(item => Object.values(item)[0])  //預約人數
                let OrdDateList = AnaAll[2].map(item => Object.values(item)[0])  //訂單日期
                // let OrdMoneyList = AnaAll[3].map(item => Object.values(item)[0])  //訂單金額
                let OrdNumList = AnaAll[4].map(item => Object.values(item)[0])  //訂單人數
                // let ProNumList = AnaAll[5].map(item => Object.values(item)[0])  //銷貨量
                // let ProItemList = AnaAll[6].map(item => Object.values(item)[0])  //銷貨商品



                //一定要 canvas 的標籤才能使用getContext('2d');
                myChart3.getContext('2d');
                //整體文字樣式設定
                Chart.defaults.global.defaultFontFamily = 'cwTeXYen';
                Chart.defaults.global.defaultFontSize = 18;
                Chart.defaults.global.defaultFontColor = '#777';

                let massPopChart = new Chart(myChart3, {
                    type: 'horizontalBar', //圖表類型 bar , horizontalBar, pie, line, doughnut, radar, polarArea
                    //--------------
                    data: {
                        labels: OrdDateList, //項目
                        datasets: [{
                            label: '來客數', //圖表標題
                            data: OrdNumList, //資料內容
                            backgroundColor: gogoColors(OrdDateList.length),
                            borderWidth: 0,

                        }]
                    },
                    //--------------
                    options: {  //對各玩意兒設定
                        responsive: true,  //資料從0開始
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false,
                                },
                            }]

                        },
                        title: {  //標題設定
                            display: true,
                            text: '客流報表( 訂單日期 / 總訂單人數 )',
                            fontSize: 25,
                            position: 'top'
                        },
                        legend: {  //小標題設定
                            display: false,
                            position: 'right',
                            labels: {
                                fontColor: 'black'
                            }
                        },
                        layout: {  //整塊圖表範圍的調整
                            padding: {
                                left: 0,
                                right: 0,
                                bottom: 0,
                                top: 30
                            }
                        },
                        tooltips: {  //tooltip開關
                            enabled: true
                        }
                    }
                });
            }
        }

        xhr.open("POST", "./js/dataAnalysis.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        let anaData = "anaStart=" + document.getElementById("anaStart").value + "&anaEnd=" + document.getElementById("anaEnd").value;
        xhr.send(anaData);
    })

    /////// 
    ///////↓↓↓↓↓商品+銷量↓↓↓↓↓↓


    document.getElementById('anaProBtn').addEventListener('click', function () {
        chartDiv.innerHTML = "&nbsp"
        chartDiv.innerHTML = `<canvas id="myChart4"></canvas>`;
        // let myChart2 = document.getElementById('myChart2')
        let myChart4 = document.getElementById('myChart4')
        // let myChart4 = document.getElementById('myChart4')

        console.log(document.getElementById("anaStart").value)
        console.log(document.getElementById("anaEnd").value)

        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status == 200) {
                var AnaAll = JSON.parse(xhr.responseText);
                console.log(AnaAll)

                // let AnaAllDate = []
                // let DateList = AnaAll[0].map(item => Object.values(item)[0])  //預約日期
                // let NumList = AnaAll[1].map(item => Object.values(item)[0])  //預約人數
                // let OrdDateList = AnaAll[2].map(item => Object.values(item)[0])  //訂單日期
                // let OrdMoneyList = AnaAll[3].map(item => Object.values(item)[0])  //訂單金額
                // let OrdNumList = AnaAll[4].map(item => Object.values(item)[0])  //訂單人數
                let ProNumList = AnaAll[5].map(item => Object.values(item)[0])  //訂單人數
                let ProItemList = AnaAll[6].map(item => Object.values(item)[0])  //訂單人數



                //一定要 canvas 的標籤才能使用getContext('2d');
                myChart4.getContext('2d');
                //整體文字樣式設定
                Chart.defaults.global.defaultFontFamily = 'cwTeXYen';
                Chart.defaults.global.defaultFontSize = 18;
                Chart.defaults.global.defaultFontColor = '#777';

                let massPopChart = new Chart(myChart4, {
                    type: 'pie', //圖表類型 bar , horizontalBar, pie, line, doughnut, radar, polarArea
                    //--------------
                    data: {
                        labels: ProItemList, //項目
                        datasets: [{
                            label: '銷量', //圖表標題
                            data: ProNumList, //資料內容
                            backgroundColor: gogoColors(ProItemList.length),
                            borderWidth: 0,

                        }]
                    },
                    //--------------
                    options: {  //對各玩意兒設定
                        responsive: true,  //資料從0開始
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    display: false
                                },
                                gridLines: {
                                    display: false,
                                },
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    display: false
                                },
                                gridLines: {
                                    display: false,
                                },
                            }]
                        },
                        title: {  //標題設定
                            display: true,
                            text: '銷貨報表',
                            fontSize: 25,
                            position: 'top'
                        },
                        legend: {  //小標題設定
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontColor: 'black'
                            }
                        },
                        layout: {  //整塊圖表範圍的調整
                            padding: {
                                left: 30,
                                right: 30,
                                bottom: 30,
                                top: 30
                            }
                        },
                        tooltips: {  //tooltip開關
                            enabled: true
                        }
                    }
                });
            }
        }

        xhr.open("POST", "./js/dataAnalysis.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        let anaData = "anaStart=" + document.getElementById("anaStart").value + "&anaEnd=" + document.getElementById("anaEnd").value;
        xhr.send(anaData);
    })

    /////// 
})