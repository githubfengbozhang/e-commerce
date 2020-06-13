<template>
  <div>
    <div class="header">
      <span>首页</span>
    </div>
    <div class="flex">
      <div class="circular">
        <div class="name">设备统计</div>
        <div class="info">
          <span class="info-name"> 设备总数：</span>
          <span class="number">145</span>
          <span>（个）</span>
          <span class="space"></span>
          <span class="info-name"> 设备异常：</span>
          <span class="number1">4</span>
          <span>（个）</span>
        </div>
        <div id="myChart"
             :style="{width: '860px', height: '230px'}">
        </div>
      </div>
      <div class="circular">
        <div class="name">人员进入情况</div>
        <div class="info">
          <span class="info-name"> 进入人数：</span>
          <span class="number">145</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name"> 留存人数：</span>
          <span class="number1">4</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name"> 体温正常：</span>
          <span class="number1">4</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name"> 体温异常：</span>
          <span class="number1">4</span>
          <span>（人）</span>
        </div>
        <div id="myChart1"
             :style="{width: '860px', height: '230px'}">
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="circular-max">
        <div class="text">
          <div>视频监控</div>
          <div class="mt10"><span class="name">设备总数：</span><span class="number">6</span><span>(个)</span></div>
          <div class="mt10"><span class="name">设备异常：</span><span class="number">6</span><span>(个)</span></div>
          <div class="mt0"><span class="open">开：5</span><span class="close">关：1</span></div>
        </div>
        <div class="vide">
          <div>
            <div></div>
            <div class="text">位置一</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt20">
      <div class="circular">
        <div class="name">电气火灾检测统计</div>
        <div class="info">
          <span class="info-name"> 设备总数：</span>
          <span class="number">145</span>
          <span>（个）</span>
          <span class="space"></span>
          <span class="info-name"> 设备异常：</span>
          <span class="number1">4</span>
          <span>（个）</span>
        </div>
        <div id="myChart3"
             :style="{width: '860px', height: '250px'}">
        </div>
      </div>
      <div class="circular">
        <div class="name">能耗统计</div>
        <div class="info">
          <span class="info-name"> 设备总数：</span>
          <span class="number">145</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name"> 设备总数：</span>
          <span class="number1">4</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name"> 开：</span>
          <span class="number">4</span>
          <span class="space"></span>
          <span class="info-name"> 关：</span>
          <span class="number">3</span>
        </div>
        <div id="myChart4"
             :style="{width: '860px', height: '250px'}">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data () {
    return {}
  },
  mounted () {
    this.drawLine();
    this.drawLine1();
    this.drawLine2();
    this.drawLine3();
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%",//也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: '2%'
        },
        xAxis: {
          data: ["视频", "电气火灾", "门禁", "电梯", "监控", "闸机"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)" //X轴文字颜色
            }
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)"
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(2,17,37,0.5)", "rgba(15,42,82,1)"]
            }
          }
        },
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: {
              label: {
                show: true,		//开启显示
                position: 'top',	//在上方显示
                textStyle: {	    //数值样式
                  color: 'rgba(186,210,242,1)',
                  fontSize: 16
                }
              },
              // 渐变 柱状
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(123,106,239,1)'
              }, {
                offset: 1,
                color: 'rgba(51,108,241,1)'
              }]),
            },
          },
        }]
      });
    },
    drawLine1 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%",//也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: '2%'
        },
        xAxis: {
          data: ["6月01日", "6月02日", "6月03日", "6月04日", "6月05日", "6月06日", "6月07日", "6月08日", "6月09日", "6月10日", "6月11日", "6月12日"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)" //X轴文字颜色
            }
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)"
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(2,17,37,0.5)", "rgba(15,42,82,1)"]
            }
          }
        },
        series: [{
          name: '销量',
          type: 'bar',
          barWidth: 10, // 柱状粗细
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'rgba(186,210,242,1)',
            }
          },
          itemStyle: {
            normal: {
              // 渐变 柱状
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(123,106,239,1)'
              }, {
                offset: 1,
                color: 'rgba(51,108,241,1)'
              }]),
            }
          },
        },
        {
          name: '折线',
          type: 'line',
          smooth: false,//折点是圆弧状的
          // showSymbol: true,
          showAllSymbol: true,
          symbol: 'circle',     //折点设定为实心点
          symbolSize: 10,   //设定实心点的大小
          itemStyle: {  /*设置折线颜色*/
            color: "rgba(120,106,239,1)",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
            // normal: {
            //   // color: '#fc8a0f', //折点颜色
            //   lineStyle: {
            //     color: 'rgba(120,106,239,1)' //折线颜色
            //   }

            // }
          },
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
        }
        ]
      });
    },
    drawLine2 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%",//也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: '2%'
        },
        xAxis: {
          data: ["6月01日", "6月02日", "6月03日", "6月04日", "6月05日", "6月06日", "6月07日", "6月08日", "6月09日", "6月10日", "6月11日", "6月12日"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)" //X轴文字颜色
            }
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)"
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(2,17,37,0.5)", "rgba(15,42,82,1)"]
            }
          }
        },
        series: [{
          name: '销量',
          type: 'bar',
          barWidth: 10, // 柱状粗细
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'rgba(186,210,242,1)',
            }
          },
          itemStyle: {
            normal: {
              // 渐变 柱状
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(123,106,239,1)'
              }, {
                offset: 1,
                color: 'rgba(51,108,241,1)'
              }]),
            }
          },
        }
        ]
      });
    },
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart4'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%",//也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: '2%'
        },
        xAxis: {
          data: ["6月01日", "6月02日", "6月03日", "6月04日", "6月05日", "6月06日", "6月07日", "6月08日", "6月09日", "6月10日", "6月11日", "6月12日"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)" //X轴文字颜色
            }
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)"
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(2,17,37,0.5)", "rgba(15,42,82,1)"]
            }
          }
        },
        series: [{
          name: '销量',
          type: 'bar',
          barWidth: 2, // 柱状粗细
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'rgba(186,210,242,1)',
            }
          },
          itemStyle: {
            normal: {
              // 渐变 柱状
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(123,106,239,1)'
              }, {
                offset: 1,
                color: 'rgba(51,108,241,1)'
              }]),
            }
          },
        },
        {
          name: '折线',
          type: 'line',
          smooth: false,//折点是圆弧状的
          // showSymbol: true,
          showAllSymbol: true,
          symbol: 'circle',     //折点设定为实心点
          symbolSize: 10,   //设定实心点的大小
          itemStyle: {  /*设置折线颜色*/
            color: "rgba(120,106,239,1)",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
            // normal: {
            //   // color: '#fc8a0f', //折点颜色
            //   lineStyle: {
            //     color: 'rgba(120,106,239,1)' //折线颜色
            //   }

            // }
          },
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
        }
        ]
      });
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>