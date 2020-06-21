<template>
  <div class="access-maanger">
    <div class="header">
      <span>门禁管理 / 人员进出管理</span>
    </div>
    <div class="flex">
      <div class="circular-fir-max">
        <div class="name">人员进入统计</div>
        <div class="info">
          <span class="info-name">进入人数：</span>
          <span class="number">{{personObject.clockPersonnum}}</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name">体温正常：</span>
          <span class="number">{{personObject.clockPersonTempnum}}</span>
          <span>（人）</span>
          <span class="space"></span>
          <span class="info-name">体温异常：</span>
          <span class="number2"
                style="color:rgba(255,42,42,1)">{{personObject.clockPersonAbtempnum}}</span>
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
              <span class="info-name">体温正常：</span>
              <span class="number">{{temperature.number[0]}}</span>
              <span>（人）</span>
              <span class="space"></span>
              <span class="info-name">体温异常：</span>
              <span class="number1">{{temperature.number1[0]}}</span>
              <span>（人）</span>
            </div>
            <div id="myChart3"
                 :style="{width: '100%', height:' 70%'}"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="circular">
            <div class="name">人员进入统计</div>
            <div class="info">
              <span class="info-name">进入人数：</span>
              <span class="number">{{personObject.clockPersonnum}}</span>
              <span>（人）</span>
              <span class="space"></span>
            </div>
            <div id="myChart4"
                 :style="{width: '100%', height:' 70%'}"></div>
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
                             type="index"
                             width="180">
              <template slot-scope="scope">{{(params.currentPage-1)*params.pageSize + scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="image"
                             label="相片"
                             width="180">
              <template slot-scope="scope">
                <img :src="scope.row.image"
                     class="phote" />
              </template>
            </el-table-column>
            <el-table-column prop="perName"
                             label="姓名"></el-table-column>
            <el-table-column prop="certificateNumber"
                             label="身份"></el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             :formatter="formatterStatus"></el-table-column>
            <el-table-column prop="dataTime"
                             label="打卡时间"
                             :formatter="formatterTime"></el-table-column>
            <el-table-column prop="temperature"
                             label="温度"></el-table-column>
            <el-table-column prop="groupId"
                             label="分组"></el-table-column>
          </el-table>
        </div>
        <!-- <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="params.currentPage"
          :page-sizes="[5]"
          :page-size="params.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="otherObjct.total"
        ></el-pagination>-->
      </div>
    </div>
  </div>
</template>
<script>
import {
  todayFaceQuery,
  faceQuery,
  hisFaceTempDateQuery,
  todayFaceDateQuery
} from "../../api/accessManger";

export default {
  name: "dashboard",
  data () {
    return {
      tableData: [],
      otherObjct: {
        chart2: "",
        chart3: "",
        total: 0
      },
      personObject: {
        clockPersonnum: "",
        clockPersonTempnum: "",
        clockPersonAbtempnum: ""
      },
      params: {
        currentPage: 1,
        pageSize: 5
      },
      temperature: {
        time: [],
        number: [],
        number1: []
      },
      personEchartsStatistics: {
        time: [],
        number: []
      }
    };
  },
  mounted () {
    this.personStatistics();
    this.loadDataList();
    setInterval(() => {
      this.personStatistics();
      this.loadDataList();
    }, 5000);
    this.drawLine2();
    this.drawLine3();
    this.todayFaceDateQuery();
    this.hisFaceTempDateQuery()
  },
  methods: {
    //==================================接口请求===============================
    personStatistics () {
      let that = this;
      todayFaceQuery().then(res => {
        const {
          clockPersonnum,
          clockPersonTempnum,
          clockPersonAbtempnum
        } = res.data;
        that.personObject.clockPersonnum = clockPersonnum;
        that.personObject.clockPersonTempnum = clockPersonTempnum;
        that.personObject.clockPersonAbtempnum = clockPersonAbtempnum;
      });
    },
    loadDataList () {
      let that = this;
      faceQuery(that.params).then(res => {
        that.tableData = res.data.records;
        that.otherObjct.total = res.total;
      });
    },
    todayFaceDateQuery () {
      let that = this;
      let time = new Date();
      let year = time.getFullYear();
      let month =
        time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : `0${time.getMonth() + 1}`;
      let day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
      const dataStar = `${year}-${month}-${day}`;
      todayFaceDateQuery({ dataStar }).then(res => {
        res.data.map(item => {

          that.personEchartsStatistics.time.push(item.clockPersondate);
          that.personEchartsStatistics.number.push(item.clockPersonnum);
        })

        let myChart = that.$echarts.init(document.getElementById("myChart4"));
        myChart.setOption({
          tooltip: {},
          grid: {
            top: "10%",
            bottom: "25%", //也可设置left和right设置距离来控制图表的大小
            left: "5%",
            right: "2%"
          },
          xAxis: {
            data: that.personEchartsStatistics.time,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(186,210,242,1)" //X轴文字颜色
              }
            }
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
          series: [
            {
              name: "温度",
              type: "bar",
              barWidth: 10, // 柱状粗细
              data: that.personEchartsStatistics.number,
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "rgba(186,210,242,1)"
                }
              },
              itemStyle: {
                normal: {
                  // 渐变 柱状
                  color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(123,106,239,1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(51,108,241,1)"
                    }
                  ])
                }
              }
            },
            {
              name: "折线",
              type: "line",
              smooth: false, //折点是圆弧状的
              // showSymbol: true,
              showAllSymbol: true,
              symbol: "circle", //折点设定为实心点
              symbolSize: 10, //设定实心点的大小
              itemStyle: {
                /*设置折线颜色*/
                color: "rgba(120,106,239,1)",
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2
                // normal: {
                //   // color: '#fc8a0f', //折点颜色
                //   lineStyle: {
                //     color: 'rgba(120,106,239,1)' //折线颜色
                //   }

                // }
              },
              data: that.personEchartsStatistics.number,
            }
          ]
        })
        //  res.data.records
      });
    },
    hisFaceTempDateQuery () {
      let that = this;
      let time = new Date();
      let year = time.getFullYear();
      let month =
        time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : `0${time.getMonth() + 1}`;
      let day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
      const dataStar = `${year}-${month}-${day}`;
      hisFaceTempDateQuery({ dataStar }).then(res => {
        res.data.map(item => {

          // return `${month}月${day}日`;
          that.temperature.time.push(item.clockPersondate)
          that.temperature.number.push(item.personNormalnum)
          that.temperature.number1.push(item.personAlarnum)
        })






        let myChart = that.$echarts.init(document.getElementById("myChart3"));
        myChart.setOption({
          tooltip: {},
          grid: {
            top: "10%",
            bottom: "25%", //也可设置left和right设置距离来控制图表的大小
            left: "5%",
            right: "2%"
          },
          xAxis: {
            data: that.temperature.time,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(186,210,242,1)" //X轴文字颜色
              }
            }
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
          series: [
            {
              name: "人",
              type: "bar",
              barWidth: 10, // 柱状粗细
              data: that.temperature.number,
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "rgba(186,210,242,1)"
                }
              },
              itemStyle: {
                normal: {
                  // 渐变 柱状
                  color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(123,106,239,1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(51,108,241,1)"
                    }
                  ])
                }
              }
            },
            {
              name: "人",
              type: "bar",
              barWidth: 10, // 柱状粗细
              data: that.temperature.number1,
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "rgba(186,210,242,1)"
                }
              },
              itemStyle: {
                normal: {
                  // 渐变 柱状
                  color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(123,106,239,1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(51,108,241,1)"
                    }
                  ])
                }
              }
            },
          ]
        })
        //  res.data.records
      });
    },
    changeCellStyle ({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "oneline";
      } else {
        return "twoline";
      }
    },
    handleCurrentChange (value) {
      this.params.currentPage = value;
    },
    //=============================echarts类====================================
    drawLine2 () {
      // 基于准备好的dom，初始化echarts实例
      this.otherObjct.chart2 = this.$echarts.init(
        document.getElementById("myChart3")
      );
      // 绘制图表
      this.otherObjct.chart2.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%", //也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: "2%"
        },
        xAxis: {
          data: [
            "6月01日",
            "6月02日",
            "6月03日",
            "6月04日",
            "6月05日",
            "6月06日",
            "6月07日",
            "6月08日",
            "6月09日",
            "6月10日",
            "6月11日",
            "6月12日"
          ],
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)" //X轴文字颜色
            }
          }
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
        series: [
          {
            name: "销量",
            type: "bar",
            barWidth: 10, // 柱状粗细
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "rgba(186,210,242,1)"
              }
            },
            itemStyle: {
              normal: {
                // 渐变 柱状
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(123,106,239,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(51,108,241,1)"
                  }
                ])
              }
            }
          }
        ]
      });
      this.echartsResize();
    },
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      this.otherObjct.chart3 = this.$echarts.init(
        document.getElementById("myChart4")
      );
      // 绘制图表
      this.otherObjct.chart3.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%", //也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: "2%"
        },
        xAxis: {
          data: this.personEchartsStatistics.time,
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(186,210,242,1)" //X轴文字颜色
            }
          }
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
        series: [
          {
            name: "销量",
            type: "bar",
            barWidth: 10, // 柱状粗细
            data: this.personEchartsStatistics.number,
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "rgba(186,210,242,1)"
              }
            },
            itemStyle: {
              normal: {
                // 渐变 柱状
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(123,106,239,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(51,108,241,1)"
                  }
                ])
              }
            }
          },
          {
            name: "折线",
            type: "line",
            smooth: false, //折点是圆弧状的
            // showSymbol: true,
            showAllSymbol: true,
            symbol: "circle", //折点设定为实心点
            symbolSize: 10, //设定实心点的大小
            itemStyle: {
              /*设置折线颜色*/
              color: "rgba(120,106,239,1)",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
              // normal: {
              //   // color: '#fc8a0f', //折点颜色
              //   lineStyle: {
              //     color: 'rgba(120,106,239,1)' //折线颜色
              //   }

              // }
            },
            data: this.personEchartsStatistics.number,
          }
        ]
      });
      this.echartsResize();
    },
    //=======================================辅助类============================================
    echartsResize () {
      let that = this;
      window.addEventListener("resize", function () {
        that.otherObjct.chart2.resize();
        that.otherObjct.chart3.resize();
      });
    },
    formatterStatus (scope) {
      let value = "";
      if (scope.status === "certified") {
        value = "已认证";
      } else if (scope.status === "uncertified") {
        value = "未认证";
      }
      return value;
    },
    formatterTime (scope) {
      if (scope.dataTime) {
        let time = new Date(scope.dataTime);
        let year = time.getFullYear();
        let month =
          time.getMonth() + 1 > 9
            ? time.getMonth() + 1
            : `0${time.getMonth() + 1}`;
        let day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;

        let hours =
          time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`;
        let minute =
          time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`;
        let seconds =
          time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`;
        return `${year}-${month}-${day} ${hours}:${minute}:${seconds}`;
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>