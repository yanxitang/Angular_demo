import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  timearr=['05.02', '05.03', '05.04', '05.05', '05.06', '05.07', '05.08']

  public chartOption = {
    background: '#000',
    title: {
      text: '图表标题',//图表标题　　　　
      top: 20,
      left: 'center',
      textStyle: { //标题样式
        color: "red"
      },
      subtext: '近一周推广数据',//表格副标题
      subtextStyle: { //副标题css

      },
    },
    tooltip: {  //点的提示
      // trigger的值axis,item(移动到圆点，只显示本身的tip)
      // trigger: 'axis',
      // axisPointer:{ //显示横中坐标的的值，以及比例尺
      //   type:'cross'
      // }
      trigger: 'item',
      formatter: "{a} <br/>{b}"
    },
    legend: { //图例说明
      bottom: '0', //图例说明的位置
      data: ['日平均点击量', '最高点击量']
    },
    toolbox: { //辅佐按钮
      show: true, //显示只设置
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { show: true, readOnly: false },
        magicType: { type: ['line', 'bar'] },//折线图、柱状图切换
        restore: {},//恢复，即刷新图表
        saveAsImage: {}//保存为图片
      }
    },
    grid: {//直角坐标系控制
      left: 40,//grid 组件离容器左侧的距离
      top: 70,
      right: 50,
      bottom: 50,
    },
    dataZoom: [{ //x轴可以滚动
      startValue: this.timearr[0],
      endValue: this.timearr[this.timearr.length],
      },{
          type: 'inside'
      }],
    xAxis: {    //设置横坐标
      type: 'category',
      axisLabel: {//横坐标的控制
        show: true,//是否显示横坐标数据
        rotate: 0,//坐标的倾斜角度
        inside: false,//刻度是否朝内
        margin: 10,//标尺与轴线的距离，默认8
      },
      boundaryGap: false,  //按区间分布显示数据
      data:this.timearr
      // data: ['05.02', '05.03', '05.04', '05.05', '05.06', '05.07', '05.08']
    },
    yAxis: {    //设置纵坐标
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        rotate: 30,//坐标的倾斜角度
        inside: false,//刻度是否朝内
      }
    },
    series: [  //请求列表的数据显示，替换其中data
      {
        name: '日平均点击量',
        type: 'line',
        data: [400, 554, 1580, 1355, 1111, 1644, 1066],
        markPoint: {

        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }
      },
      {
        name: '最高点击量',
        type: 'line',
        data: [800, 1000, 1700, 1689, 1500, 1900, 2016],
        markPoint: {
          data: [
            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' },
            [{
              symbol: 'none',
              x: '90%',
              yAxis: 'max'
            }, {
              symbol: 'circle',
              label: {
                normal: {
                  position: 'start',
                  formatter: '最大值'
                }
              },
              type: 'max',
              name: '最高点'
            }]
          ]
        },
        itemStyle: {
          normal: {
            color: '#00FF00',//改变折线点的颜色
            lineStyle: { //改变折线颜色
              color: '#00FF00'
            }
          }
        },
      }]
  }


  public option = {
    backgroundColor: '#2c343c',
    title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'line',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 274, name: '联盟广告' },
          { value: 235, name: '视频广告' },
          { value: 400, name: '搜索引擎' }
        ].sort(function (a, b) { return a.value - b.value; }),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  }

}
