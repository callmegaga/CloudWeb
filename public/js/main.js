/**
 * Created by 41925 on 2018/4/17.
 */
var Chart_1 = echarts.init(document.getElementById('chart_1'));
var Chart_2 = echarts.init(document.getElementById('chart_2'));
var Chart_3 = echarts.init(document.getElementById('chart_3'));
var Chart_4 = echarts.init(document.getElementById('chart_4'));
var Chart_5 = echarts.init(document.getElementById('chart_5'));
var Now_Map_Show_type = 1;                                          //1显示总检测次数，2显示总拦截次数，3显示总捕获次数

var MapCaptureNumberData = [
    {name:"福州市",value:[119.306239, 26.075302,0]},
    {name:"莆田市",value:[119.007558, 25.431011, 0]},
    {name:"泉州市",value:[118.589421, 24.908853, 0]},
    {name:"厦门市",value:[118.11022, 24.490474, 0]},
    {name:"宁德市",value:[119.527082, 26.65924, 0]},
    {name:"漳州市",value:[117.66181, 24.510897,0]},
    {name:"龙岩市",value:[117.02978, 25.091603, 0]},
    {name:"三明市",value:[117.63500, 26.265444,0]},
    {name:"南平市",value:[118.17846, 26.635627,0]},
];
var MapCheckNumberData = [
    {name:"福州市",value:[119.306239, 26.075302,  100000]},
    {name:"莆田市",value:[119.007558, 25.431011, 0]},
    {name:"泉州市",value:[118.589421, 24.908853, 0]},
    {name:"厦门市",value:[118.11022, 24.490474, 0]},
    {name:"宁德市",value:[119.527082, 26.65924, 0]},
    {name:"漳州市",value:[117.66181, 24.510897,0]},
    {name:"龙岩市",value:[117.02978, 25.091603, 0]},
    {name:"三明市",value:[117.63500, 26.265444,0]},
    {name:"南平市",value:[118.17846, 26.635627,0]},
];
var MapInterceptionNumberData = [
    {name:"福州市",value:[119.306239, 26.075302, 0]},
    {name:"莆田市",value:[119.007558, 25.431011, 0]},
    {name:"泉州市",value:[118.589421, 24.908853, 0]},
    {name:"厦门市",value:[118.11022, 24.490474, 0]},
    {name:"宁德市",value:[119.527082, 26.65924, 0]},
    {name:"漳州市",value:[117.66181, 24.510897,0]},
    {name:"龙岩市",value:[117.02978, 25.091603, 0]},
    {name:"三明市",value:[117.63500, 26.265444,0]},
    {name:"南平市",value:[118.17846, 26.635627,0]},
];

//获取城市统计信息
function getCityStatisticsCounter(){
    $.get("getCityStatisticsCounter",{},function(data){
        var series = [];
        var captureNumberSeries      = [];
        var checkNumberSeries        = [];
        var interceptionNumberSeries = [];

        MapCaptureNumberData = [];
        MapCheckNumberData = [];
        MapInterceptionNumberData = [];

        var data = data.response;
        for (var i in data){
            var cityID             = parseInt(data[i].cityID);
            var captureNumber      = parseInt(data[i].captureNumber);
            var checkNumber        = parseInt(data[i].checkNumber);
            var interceptionNumber = parseInt(data[i].interceptionNumber);
            captureNumberSeries.push(captureNumber);
            interceptionNumberSeries.push(interceptionNumber);
            checkNumberSeries.push(checkNumber);

            var name = fromIntGetCityName(cityID);
            var coor = fromIntGetCityCoor(cityID);
            MapCheckNumberData.push({name:name, value:coor.concat(checkNumber)});
            MapInterceptionNumberData.push({name:name, value:coor.concat(interceptionNumber)});
            MapCaptureNumberData.push({name:name, value:coor.concat(captureNumber)});
        }


        series.push({
            name: "捕获次数",
            type: 'bar',
            barGap:0,
            data: captureNumberSeries
        });
        series.push({
            name: "拦截次数",
            type: 'bar',
            barGap:0,
            data: interceptionNumberSeries
        });
        series.push({
            name: "检测次数",
            type: 'bar',
            barGap:0,
            label:{
                show:true,
                position:"right"
            },
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
                top:40,
                data: ["捕获次数","拦截次数","检测次数"],
                textStyle:{
                    color:"white"
                }
            },
            grid: {
                top:80,
                left: 35,
                bottom:40
            },
            color:["#F9D345","#F1637B","#4179FE"],
            xAxis: {
                type: 'value',
                splitLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                },
                interval:10000
            },
            yAxis: {
                type: 'category',
                inverse: true,
                data: ["福州","莆田","泉州","厦门","宁德","漳州","龙岩","三明","南平"],
                axisLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                }
            },
            series: series
        };

        Chart_1.setOption(option);

        setMapData();
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
            barWidth:"50%",
            data: WindowsHostCounterSeries
        });
        series.push({
            name: "Linux",
            type: 'bar',
            stack: '总量',
            barWidth:"50%",
            data: LinuxHostCounterSeries
        });
        series.push({
            name: "其它",
            type: 'bar',
            stack: '总量',
            barWidth:"50%",
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
                top:40,
                data: ["Windows","Linux","其它"],
                textStyle:{
                    color:"white"
                }
            },
            grid: {
                left: 35,
                top:80,
                bottom:40
            },
            color:["#4267E1","#FAD344","#50CA74"],
            xAxis: {
                type: 'value',
                splitLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                },
                interval:5000
            },
            yAxis: {
                type: 'category',
                data: ["福州","莆田","泉州","厦门","宁德","漳州","龙岩","三明","南平"],
                axisLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                }
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
            barGap:0,
            data: onlineHostCounterSeries
        });
        series.push({
            name: "离线",
            type: 'bar',
            barGap:0,
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
                top:40,
                left:40,
                data: ["在线","离线"],
                textStyle:{
                    color:"white"
                }
            },
            grid: {
                top:80,
                left: 45,
                bottom:40
            },
            color:["#44FDFE","#4267E1"],
            xAxis: {
                type: 'category',
                data: ["福州","莆田","泉州","厦门","宁德","漳州","龙岩","三明","南平"],
                axisLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                },

            },
            yAxis: {
                type: 'value',
                splitLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:"#144869"
                    }
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
                top:40,
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
                left: 50,
                top:80,
                bottom:30
            },
            color:["#F9D345","#F1637B","#4179FE"],
            xAxis: {
                type: 'category',
                data: getNow24Hour(),
                axisLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:"#144869"
                    }
                }
            },
            series: series
        };

        Chart_2.setOption(option);
    })
}
//获返回总统计数
function getTotalStatisticsCounter(){
    $.get("getTotalStatisticsCounter",function(data){
        var checkNumber = data.checkNumber;
        var captureNumber = data.captureNumber;
        var interceptionNumber = data.interceptionNumber;

        $("#all-check-number").html("总检测次数：" + checkNumber);
        $("#all-capture-number").html("总捕获次数：" + captureNumber);
        $("#all-interception-number").html("总拦截次数：" + interceptionNumber);
        $(".content-middle-chart-title").removeClass("hide");
    })
}

//初始化地图
$.get('/js/fujian.json', function (geoJson) {
    echarts.registerMap("福建", geoJson);
    var option = {
        geo: {
            map: "福建",
            zoom:1.1,
        },
        series: [
            {
                type: 'map',
                mapType: "福建",
                label: {
                    offset:[0,30],
                    show:false,
                    color: '#fff',
                    emphasis: {
                        show:false,
                    }
                },
                zoom:1.1,
                itemStyle: {
                    normal: {
                        borderColor: '#07123C',
                        areaColor: '#13878F'
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                label: {
                    offset:[0,-20],
                    show:true,
                    formatter:function(e){
                        return e.data.name
                    },
                    color: '#fff'
                },
                data:getMapData(),
                symbolSize: getMapItemSize,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: getMapItemColor(),
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                }
            }
        ]
    };

    Chart_3.setOption(option);
});

function fromIntGetCityName(value){
    switch (parseInt(value)){
        case 256:
            return "福州市";
        case 257:
            return "莆田市";
        case 258:
            return "泉州市";
        case 259:
            return "厦门市";
        case 260:
            return "宁德市";
        case 261:
            return "漳州市";
        case 262:
            return "龙岩市";
        case 263:
            return "三明市";
        case 264:
            return "南平市";
    }
}
function fromIntGetCityCoor(value){
    switch (parseInt(value)){
        case 256:
            return [119.306239, 26.075302];
        case 257:
            return [119.007558, 25.431011];
        case 258:
            return [118.589421, 24.908853];
        case 259:
            return [118.11022, 24.490474];
        case 260:
            return [119.527082, 26.65924];
        case 261:
            return [117.661801, 24.510897];
        case 262:
            return [117.02978, 25.091603];
        case 263:
            return [117.635001, 26.265444];
        case 264:
            return [118.178459, 26.635627];
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
function getMapData(){
    switch (Now_Map_Show_type){
        case 1:
            return MapCheckNumberData;
        case 2:
            return MapInterceptionNumberData;
        case 3:
            return MapCaptureNumberData;

    }
}
function getMapItemColor(){
    switch (Now_Map_Show_type){
        case 1:
            return '#fff';
        case 2:
            return '#f4e925';
        case 3:
            return '#E8627A';

    }
}

function setMapData(){
    var option = Chart_3.getOption();
    if (option == undefined || option.series[1] == undefined){
        return
    }
    option.series[1].data = getMapData();
    option.series[1].itemStyle.color = getMapItemColor();
    Chart_3.setOption(option)
}

function getMapItemSize(val){
    var value = val[2] / 2000;
    if (value > 20) value = 20;
    return value
}

$("#content-middle-chart-title-check-number").click(function(){
    Now_Map_Show_type = 1;
    setMapData();
});

$("#content-middle-chart-title-interception-number").click(function(){
    Now_Map_Show_type = 2;
    setMapData();
});

$("#content-middle-chart-title-capture-number").click(function(){
    Now_Map_Show_type = 3;
    setMapData();
});
getCityStatisticsCounter();
getCityASSetInfo();
getHostOnlineInfo();
getTimeIntervalStatistics();
getTotalStatisticsCounter();
showNowTime();
setInterval(function(){
    getCityStatisticsCounter();
    getCityASSetInfo();
    getHostOnlineInfo();
    getTimeIntervalStatistics();
    getTotalStatisticsCounter();
    showNowTime();
},5000);