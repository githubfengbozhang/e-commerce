<template>
  <div class="access-maanger">
    <div class="header">
      <span>门禁管理 / 人员进出管理</span>
    </div>
    <div class="flex">
      <div class="circular-fir-max">
        <div class="name">人员进入统计</div>
        <div class="info">
          <span class="info-name"> 进入人数：</span>
          <span class="number">145</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name"> 人员留存：</span>
          <span class="number1">4</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name"> 体温正常：</span>
          <span class="number2">4</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name"> 体温异常：</span>
          <span class="number2"
                style="color:rgba(255,42,42,1)">4</span>
          <span>（人）</span>
        </div>

      </div>
    </div>
    <div class="flex">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="circular">
            <div class="name">体温检测统计</div>
            <div class="info">
              <span class="info-name"> 体温正常：</span>
              <span class="number">145</span>
              <span>（人）</span>
              <span class="space"></span>
              <span class="info-name"> 体温异常：</span>
              <span class="number1">4</span>
              <span>（人）</span>
            </div>
            <div id="myChart3"
                 :style="{width: '100%', height:' 70%'}">
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="circular">
            <div class="name">人员进入统计</div>
            <div class="info">
              <span class="info-name"> 进入人数：</span>
              <span class="number">145</span>
              <span>（人）</span>
              <span class="space"></span>
              <span class="info-name"> 留存人数：</span>
              <span class="number1">4</span>
              <span>（人）</span>
            </div>
            <div id="myChart4"
                 :style="{width: '100%', height:' 70%'}">
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="flex mt20">
      <div class="access-table-box">
        <div class="table-list">
          <el-table :data="tableData"
                    stripe
                    style="width: 100%"
                    :cell-class-name="changeCellStyle">
            <el-table-column prop="date"
                             label="序号"
                             width="180">
            </el-table-column>
            <el-table-column prop="name"
                             label="相片"
                             width="180">
            </el-table-column>
            <el-table-column prop="address"
                             label="姓名">
            </el-table-column>
            <el-table-column prop="a"
                             label="身份">
            </el-table-column>
            <el-table-column prop="b"
                             label="状态">
            </el-table-column>
            <el-table-column prop="c"
                             label="留存时间">
            </el-table-column>
            <el-table-column prop="d"
                             label="时间">
            </el-table-column>
          </el-table>
        </div>
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage4"
                       :page-sizes="[100, 200, 300, 400]"
                       :page-size="100"
                       layout="total, prev, pager, next, jumper"
                       :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data () {
    return {
      tableData: [{
        date: 'C1',
        name: '131312',
        address: '231',
        a: '4',
        b: '6',
        c: '9',
        d: '6'
      }, {
        date: 'C1',
        name: '131312',
        address: '231',
        a: '4',
        b: '6',
        c: '9',
        d: '6'
      }, {
        date: 'C1',
        name: '131312',
        address: '231',
        a: '4',
        b: '6',
        c: '9',
        d: '6'
      }, {
        date: 'C1',
        name: '131312',
        address: '231',
        a: '4',
        b: '6',
        c: '9',
        d: '6'
      }],
      otherObjct: {
        chart2: '',
        chart3: '',
      }
    }
  },
  mounted () {
    this.drawLine2();
    this.drawLine3();
  },
  methods: {
    changeCellStyle ({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'oneline'
      } else {
        return 'twoline'
      }
    },
    //=============================echarts类====================================
    drawLine2 () {
      // 基于准备好的dom，初始化echarts实例
      this.otherObjct.chart2 = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      this.otherObjct.chart2.setOption({
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
              color: ["#162D75", "#15296D"]
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
      this.echartsResize()
    },
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      this.otherObjct.chart3 = this.$echarts.init(document.getElementById('myChart4'))
      // 绘制图表
      this.otherObjct.chart3.setOption({
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
              color: ["#162D75", "#15296D"]
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
      this.echartsResize()
    },
    echartsResize () {
      let that = this;
      window.addEventListener("resize", function () {
        that.otherObjct.chart2.resize();
        that.otherObjct.chart3.resize();
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>