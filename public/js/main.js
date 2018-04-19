/**
 * Created by 41925 on 2018/4/17.
 */
var Chart_1 = echarts.init(document.getElementById('chart_1'));
var Chart_2 = echarts.init(document.getElementById('chart_2'));
var Chart_4 = echarts.init(document.getElementById('chart_4'));
var Chart_5 = echarts.init(document.getElementById('chart_5'));
//获取城市统计信息
function getCityStatisticsCounter(){
    $.get("getCityStatisticsCounter",{},function(data){
        var series = [];
        var captureNumberSeries      = [];
        var checkNumberSeries        = [];
        var interceptionNumberSeries = [];
        var data = data.response;
        for (var i in data){
            var captureNumber      = parseInt(data[i].captureNumber);
            var checkNumber        = parseInt(data[i].checkNumber);
            var interceptionNumber = parseInt(data[i].interceptionNumber);
            captureNumberSeries.push(captureNumber);
            interceptionNumberSeries.push(interceptionNumber);
            checkNumberSeries.push(checkNumber);
        }

        series.push({
            name: "捕获次数",
            type: 'bar',
            data: captureNumberSeries
        });
        series.push({
            name: "拦截次数",
            type: 'bar',
            data: interceptionNumberSeries
        });
        series.push({
            name: "检测次数",
            type: 'bar',
            data: checkNumberSeries
        });

        var option = {
            textStyle:{
                color:"white"
            },
            title: {
                text: "各城市检测/拦截/捕获情况",
                textStyle:{
                    color:"white"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                top:30,
                data: ["捕获次数","拦截次数","检测次数"],
                textStyle:{
                    color:"white"
                }
            },
            grid: {
                left: 35
            },
            color:["#F9D345","#F1637B","#4179FE"],
            xAxis: {
                type: 'value',
                name: '次数',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                data: ["福州","莆田","泉州","厦门","宁德","漳州","龙岩","三明","南平"],
            },
            series: series
        };

        Chart_1.setOption(option);
    })
}
//获取城市资产信息
function getCityASSetInfo(){
    $.get("getCityASSetInfo",function(data){
        var series = [];
        var WindowsHostCounterSeries  = [];
        var LinuxHostCounterSeries    = [];
        var otherHostCOunterSeries    = [];
        var data = data.response;
        for (var i in data){
            var WindowsHostCounter = parseInt(data[i].WindowsHostCounter);
            var LinuxHostCounter   = parseInt(data[i].LinuxHostCounter);
            var otherHostCOunter   = parseInt(data[i].otherHostCOunter);
            WindowsHostCounterSeries.push(WindowsHostCounter);
            LinuxHostCounterSeries.push(LinuxHostCounter);
            otherHostCOunterSeries.push(otherHostCOunter);
        }
        series.push({
            name: "Windows",
            type: 'bar',
            stack: '总量',
            data: WindowsHostCounterSeries
        });
        series.push({
            name: "Linux",
            type: 'bar',
            stack: '总量',
            data: LinuxHostCounterSeries
        });
        series.push({
            name: "其它",
            type: 'bar',
            stack: '总量',
            data: otherHostCOunterSeries
        });
        var option = {
            textStyle:{
                color:"white"
            },
            title: {
                text: "各城市资产情况",
                textStyle:{
                    color:"white"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                top:30,
                data: ["Windows","Linux","其它"],
                textStyle:{
                    color:"white"
                }
            },
            grid: {
                left: 35
            },
            color:["#4267E1","#FAD344","#50CA74"],
            xAxis: {
                type: 'value',
                name: '次数',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            yAxis: {
                type: 'category',
                data: ["福州","莆田","泉州","厦门","宁德","漳州","龙岩","三明","南平"],
            },
            series: series
        };
        Chart_4.setOption(option);
    })
}
//获取城市主机上线
function getHostOnlineInfo(){
    $.get("getHostOnlineInfo",function(data){
        var series = [];
        var offlineHostCounterSeries  = [];
        var onlineHostCounterSeries    = [];
        var data = data.response;
        for (var i in data){
            var onlineHostCounter = parseInt(data[i].onlineHostCounter);
            var offlineHostCounter = parseInt(data[i].offlineHostCounter);
            offlineHostCounterSeries.push(onlineHostCounter);
            onlineHostCounterSeries.push(offlineHostCounter)
        }
        series.push({
            name: "在线",
            type: 'bar',
            data: onlineHostCounterSeries
        });
        series.push({
            name: "离线",
            type: 'bar',
            data: offlineHostCounterSeries
        });
        var option = {
            textStyle:{
                color:"white"
            },
            title: {
                text: "各城市实时主机在线情况",
                textStyle:{
                    color:"white"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                top:30,
                left:40,
                data: ["在线","离线"],
                textStyle:{
                    color:"white"
                }
            },
            grid: {
                left: 45
            },
            color:["#44FDFE","#4267E1"],
            xAxis: {
                type: 'category',
                data: ["福州","莆田","泉州","厦门","宁德","漳州","龙岩","三明","南平"],
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: series
        };
        Chart_5.setOption(option);
    })
}

//获取各时段统计信息
function getTimeIntervalStatistics(){
    $.get("getTimeIntervalStatistics",function(data){
        var series = [];
        var captureNumberSeries      = [];
        var checkNumberSeries        = [];
        var interceptionNumberSeries = [];
        var data = data.response;
        for (var i in data){
            var captureNumber      = parseInt(data[i].captureNumber);
            var checkNumber        = parseInt(data[i].checkNumber);
            var interceptionNumber = parseInt(data[i].interceptionNumber);
            captureNumberSeries.push(captureNumber);
            interceptionNumberSeries.push(interceptionNumber);
            checkNumberSeries.push(checkNumber);
        }

        series.push({
            name: "捕获次数",
            type: 'line',
            data: captureNumberSeries
        });
        series.push({
            name: "拦截次数",
            type: 'line',
            data: interceptionNumberSeries
        });
        series.push({
            name: "检测次数",
            type: 'line',
            data: checkNumberSeries
        });

        var option = {
            textStyle:{
                color:"white"
            },
            title: {
                text: "各城市检测/拦截/捕获次数统计",
                textStyle:{
                    color:"white"
                }
            },
            legend: {
                top:30,
                data: ["捕获次数","拦截次数","检测次数"],
                textStyle:{
                    color:"white"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: 50
            },
            color:["#F9D345","#F1637B","#4179FE"],
            xAxis: {
                type: 'category',
                data: getNow24Hour()
            },
            yAxis: {
                type: 'value'
            },
            series: series
        };

        Chart_2.setOption(option);
    })
}

//获返回总统计数
function getTotalStatisticsCounter(){
    $.get("getTotalStatisticsCounter",function(data){

    })
}

function fromIntGetCityName(value){
    switch (parseInt(value)){
        case 256:
            return "福州";
        case 257:
            return "莆田";
        case 258:
            return "泉州";
        case 259:
            return "厦门";
        case 260:
            return "宁德";
        case 261:
            return "漳州";
        case 262:
            return "龙岩";
        case 263:
            return "三明";
        case 264:
            return "南平";
    }
}

function getNow24Hour(){
    var hours = [];
    var timestamp=new Date().getTime();
    var yestoday_timestamp = timestamp - 86400000;
    var yestoday_date = new Date(yestoday_timestamp);
    var yestoday_hour =yestoday_date.getHours();
    for (var i=0;i<24;i++){
        if (yestoday_hour < 10){
            yestoday_hour = "0" + yestoday_hour
        }
        hours.push(yestoday_hour.toString());
        yestoday_hour++;
        if(yestoday_hour == 24){
            yestoday_hour = 0;
        }
    }
    return hours
}

function showNowTime(){
    var date=new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());

    $(".header-time-time").html(h + ":"  + m);
    $(".header-time-day").html(Y + "-" + M + "-" + D);
}

getCityStatisticsCounter();
getCityASSetInfo();
getHostOnlineInfo();
getTimeIntervalStatistics();
showNowTime();
setInterval(function(){
    getCityStatisticsCounter();
    getCityASSetInfo();
    getHostOnlineInfo();
    getTimeIntervalStatistics();
    showNowTime();
},5000);