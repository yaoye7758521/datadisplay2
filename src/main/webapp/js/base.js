$(function () {
    var dzoom = 1.0;
    var minNum = 0;
    var maxNum = 5000;

    function fixWindow() {
        var b = window.innerHeight;
        document.getElementById("backGround").style.height = b - 80 + "px";
    }

    function initChartHight() {
        var chartContainer = $('#chart_container').innerHeight();
        document.getElementById('chart1').style.height = chartContainer + 'px';
        document.getElementById('chart2').style.height = chartContainer + 'px';

    }

    function initChart() {
        chart1.setOption(chartOption1);
        chart2.setOption(chartOption2);
        map.setOption(mapOptiong);
    }

    function getArrayItems(arr, num) {
        var temp_array = [];
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = [];
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }

    function getValueArray(sdata) {
        var valueArray = [];
        for (var i = 0; i < sdata.length; i++) {
            valueArray.push(sdata[i].value)
        }
        return valueArray;
    }

    function getNameArray(sdata) {
        var nameArray = [];
        for (var i = 0; i < sdata.length; i++) {
            nameArray.push(sdata[i].name)
        }
        return nameArray;
    }

    function getScatterData(data) {
        var scatterArray = [];
        for (var i = 0; i < data.length; i++) {
            var Obj = {}
            scatterArray.push({
                name: data[i].name,
                value: [data[i].lng, data[i].lat, data[i].value]
            });
        }
        return scatterArray;
    }

    function getLinesData(data) {
        var gdaga = [];
        for (i = 0; i < data.length * 2; i++) {
            var coped = getArrayItems(data, 2)
            gdaga.push({
                fromName: coped[0].name,
                toName: coped[1].name,
                coords: [[coped[0].lng, coped[0].lat], [coped[1].lng, coped[1].lat]]
            })
        }
        return gdaga;
    }

    function updateChinaMap() {
        var dataUrl = '../../data/province.json';
        $.ajax({
            type: "get",
            url: dataUrl,
            async: true,
            success: function (cdata) {
                map.setOption({
                    visualMap: {
                        min: minNum,
                        max: maxNum
                    },
                    geo: {
                        map: '湖北',
                    },
                    series: [{
                        //map: area,
                        id: 'map',
                        zoom: dzoom,
                        data: cdata
                    }]
                });
            }
        });
    }

    function updateLines() {
        var dataUrl = '../../data/scatter.json';
        $.ajax({
            type: "get",
            url: dataUrl,
            async: true,
            success: function (ldata) {
                map.setOption({
                    series: [
                        {
                            id: 'effectScatter',
                            data: getScatterData(ldata)
                        },
                        {
                            id: 'lines',
                            data: getLinesData(ldata)
                        }
                    ]
                });
            }
        });
    }

    fixWindow();
    initChartHight();


    var chart1 = echarts.init(document.getElementById('chart1'));
    var chart2 = echarts.init(document.getElementById('chart2'));
    var map = echarts.init(document.getElementById('map'));
    var chartOption1 = {
        calculable: true,
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [30, 90],
                //center: ['75%', '50%'],
                roseType: 'area',
                data: [
                    {value: 10, name: 'rose1'},
                    {value: 5, name: 'rose2'},
                    {value: 15, name: 'rose3'},
                    {value: 25, name: 'rose4'},
                    {value: 20, name: 'rose5'},
                    {value: 35, name: 'rose6'},
                    {value: 30, name: 'rose7'},
                    {value: 40, name: 'rose8'}
                ]
            }
        ]
    };
    var chartOption2 = {
        visualMap: {
            type: 'continuous',
            dimension: 0,
            show: false,
            min: 0,
            max: 70000,
            inRange: {
                color: [
                    /*'#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',*/
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    /*'#a50026'*/
                ]
            }
        },
        grid: {
            left: '6%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        calculable: true,
        xAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            splitLine: {show: false}
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 0
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            data: ['网站总数', '检查网站', '连接数', '疑似涉密网页', '涉密网页', '疑似涉密条目', '待处理条目', '涉密信息', '正在检查网站数']
        },
        series: [{
            data: [20156, 4323, 24346, 3428, 4672, 62344, 34654, 1543, 5657],
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    color: 'rgba(220,220,220,0.8)'
                }
            },
            /*itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: 'rgba(255,50,50,0.7)'},
                            {offset: 0.5, color: 'rgba(255,50,100,0.5)'},
                            {offset: 1, color: 'rgba(255,50,150,0.1)'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: 'rgba(255,150,150,0.8)'},
                            {offset: 0.7, color: 'rgba(255,100,100,0.8)'},
                            {offset: 1, color: 'rgba(255,50,50,0.8)'}
                        ]
                    )
                }
            }*/
        }]

    };
    var mapOptiong = {
        backgroundColor: 'rgba(200,200,200,0)',
        tooltip: {
            trigger: 'item'
        },
        visualMap: [{
            min: minNum,
            max: maxNum,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            seriesIndex: 0,
            inRange: {
                color: [
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    /*'#e0f3f8',
                     '#ffffbf',
                     '#fee090',
                     '#fdae61',
                     '#f46d43',
                     '#d73027',
                     '#a50026'*/
                    /*'rgba(100, 100, 120, 0.8)',
                     'rgba(208, 208, 228, 0.8)'*/
                ]
            },
            show: false
        }],
        geo: {
            map: '湖北',
            zoom: dzoom,
            label: {
                emphasis: {
                    show: true
                }
            },
            roam: false

        },
        series: [
            {
                id: 'map',
                name: '地区',
                type: 'map',
                geoIndex: 0,
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: []
            },
            {
                id: 'effectScatter',
                name: '被攻击',
                type: 'effectScatter',
                symbol: 'circle',
                showEffectOn: 'render',
                coordinateSystem: 'geo',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                symbolSize: function (val) {
                    return val[2] / 200;
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255, 0, 0, 0.8)',
                        opacity: 0.5,
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1,
                data: []
            },
            {
                id: 'lines',
                name: '攻击路径',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 2,
                    trailLength: 0.3,
                    color: ['#9933CC'],
                    symbol: ['circle', 'none'],
                    symbolSize: 2
                },
                lineStyle: {
                    normal: {
                        color: '#0099CC',
                        type: 'dashed',
                        width: 0,
                        curveness: 0.3,
                        opacity: 1
                    }
                },
                data: []
            },
        ]
    };

    initChart();
    updateChinaMap();
    updateLines();
});
