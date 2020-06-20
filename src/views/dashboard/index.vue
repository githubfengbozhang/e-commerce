<template>
  <div>
    <div class="header">
      <span>首页</span>
    </div>
    <div class="flex">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="circular">
            <div class="name"
                 @click="openDialog()">直播参观人数</div>
            <div class="info">
              <span class="info-name">参观总数：</span>
              <span class="number">{{countPerson}}</span>
              <span>（个）</span>
            </div>
            <div id="myChart5"
                 class="echarts"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="circular">
            <div class="name"
                 style="margin-bottom: 0px">销售排行榜</div>
            <div class="classifiy">
              <div class="blank">
                <div class="icon">
                  <i class="iconfont"
                     style="color:#CCD1D7">&#xe644;</i>
                </div>
                <div>
                  <img :src="img2" />
                </div>
              </div>
              <div class="blank"
                   style="margin: 0 10px">
                <div class="icon">
                  <i class="iconfont"
                     style="color:#FDD85E">&#xe643;</i>
                </div>
                <div>
                  <img :src="img1" />
                </div>
              </div>
              <div class="blank">
                <div class="icon">
                  <i class="iconfont"
                     style="color:#F5B08B">&#xe641;</i>
                </div>
                <div>
                  <img :src="img3" />
                </div>
              </div>

            </div>
            <div class="classifiy-table">
              <el-table :data="tableData"
                        stripe
                        :row-style="{height:'10px'}"
                        :cell-style="{padding:'5px 0'}"
                        :show-header='false'
                        :row-class-name="tabRowClassName"
                        style="width: 100%">
                <el-table-column type="index"
                                 label="序"
                                 width="50">
                  <template slot-scope="scope">
                    {{scope.$index + 1}}
                  </template>
                </el-table-column>
                <el-table-column prop="phb"
                                 label="分类">
                </el-table-column>
                <el-table-column prop="number"
                                 label="数量"
                                 width="120">
                </el-table-column>

              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="circular">
            <div class="name">人员进入情况</div>
            <div class="info">
              <span class="info-name">进入人数：</span>
              <span class="number">{{personObject.clockPersonnum}}</span>
              <span>（人）</span>
              <!-- <span class="space"></span>
          <span class="info-name">留存人数：</span>
          <span class="number1">4</span>-->
              <span>（人）</span>
              <span class="space"></span>
              <span class="info-name">体温正常：</span>
              <span class="number1">{{personObject.clockPersonTempnum}}</span>
              <span>（人）</span>
              <span class="space"></span>
              <span class="info-name">体温异常：</span>
              <span class="number1">{{personObject.clockPersonAbtempnum}}</span>
              <span>（人）</span>
            </div>
            <div id="myChart1"
                 class="echarts"></div>
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="flex">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="circular-sale">
            <p class="title">当天销售总额</p>
            <p class="number">{{zje}} </p>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="circular-max">
            <div class="text">
              <div>视频监控</div>
              <div class="mt10">
                <span class="name">设备总数：</span>
                <span class="number">68</span>
                <span>(个)</span>
              </div>
              <div class="mt10">
                <span class="name">设备异常：</span>
                <span class="number">0</span>
                <span>(个)</span>
              </div>
              <div class="mt0">
                <span class="open">开：5</span>
                <span class="close">关：0</span>
              </div>
            </div>
            <div class="vide">
              <DialogVideo v-for="(item,index) in videoList"
                           :key="index"
                           :propsVideo="item" />
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="flex mt20">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="circular">
            <div class="name">电气火灾检测统计</div>
            <div class="info">
              <span class="info-name">设备总数：</span>
              <span class="number">1</span>
              <span>（个）</span>
              <span class="space"></span>
              <span class="info-name">设备异常：</span>
              <span class="number1">0</span>
              <span>（个）</span>
            </div>
            <div id="myChart3"
                 class="echarts"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="circular">
            <div class="name">设备统计</div>
            <div class="info">
              <span class="info-name">设备总数：</span>
              <span class="number">70</span>
              <span>（个）</span>
              <span class="space"></span>
              <span class="info-name">设备异常：</span>
              <span class="number1">0</span>
              <span>（个）</span>
            </div>
            <div id="myChart"
                 class="echarts"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="circular">
            <div class="name">能耗统计</div>
            <div class="info">
              <span class="info-name">设备总数：</span>
              <span class="number">1</span>
              <span>（个）</span>
              <span class="space"></span>
              <span class="info-name">设备总数：</span>
              <span class="number1">0</span>
              <span>（个）</span>
              <span class="space"></span>
              <span class="open">开：5</span>
              <span class="close">关：0</span>
            </div>
            <div id="myChart4"
                 class="echarts"></div>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="提示"
                 :visible.sync="dialogVisible"
                 width="50%">
        <FormDialog ref="formDialog" />
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="query()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DialogVideo from "../../components/DialogVideo/index.vue";
import axios from "axios";
import FormDialog from "./components/index.vue"

import {
  todayFaceQuery,
  faceQuery,
  hisFaceTempDateQuery
} from "../../api/accessManger";

export default {
  name: "dashboard",
  components: {
    DialogVideo,
    FormDialog
  },
  data () {
    return {
      img1: require('../../assets/img/one.png'),
      img2: require('../../assets/img/two.png'),
      img3: require('../../assets/img/three.png'),
      videoList: [
        {
          url: "A010102-00008",
          id: 8
        },
        {
          url: "A010102-00007",
          id: 7
        },
        {
          url: "A010102-00006",
          id: 6
        },
        {
          url: "A010102-00005",
          id: 5
        },
        {
          url: "A010102-00002",
          id: 2
        }
      ],
      list: [],
      tableData: [],
      personObject: {
        clockPersonnum: "",
        clockPersonTempnum: "",
        clockPersonAbtempnum: ""
      },
      dialogVisible: false,
      zje: '',
      countPerson: 0,
      temperature: {
        time: [],
        temperature: []
      }
    };
  },
  mounted () {
    // this.init();
    this.personStatistics();
    this.hisFaceTempDateQuery()
    this.drawLine();
    this.drawLine1();
    this.drawLine2();
    this.drawLine3();
    this.drawLine4();
    // 销售排行榜table的数据
    // this.loadTableData();
    this.zje = this.toThousands(localStorage.getItem('zje'));
    this.tableData = JSON.parse(window.localStorage.getItem('phbList'));
    if (JSON.parse(window.localStorage.getItem('broadcastNumber')).length > 0) {
      this.countPerson = JSON.parse(window.localStorage.getItem('broadcastNumber')).reduce((total, num) => {
        return parseInt(total) + parseInt(num);
      })
    }
  },
  methods: {
    toThousands (num) {
      var result = [], counter = 0;
      num = (num || 0).toString().split('');
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
      }
      return result.join('');
    },
    query () {
      this.dialogVisible = false;
      this.$refs.formDialog.onSubmit();
    },
    openDialog () {
      this.dialogVisible = true
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
      faceQuery({ dataStar }).then(res => {
        debugger
        res.data.records.map(item => {
          const time = new Date(item.dataTime);
          let month =
            time.getMonth() + 1 > 9
              ? time.getMonth() + 1
              : `0${time.getMonth() + 1}`;
          let day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
          // return `${month}月${day}日`;
          that.temperature.time.push(`${month}月${day}日`)
        })
        res.data.records.map(item => that.temperature.temperature.push(item.temperature));
        console.log(that.temperature)

        //  res.data.records
      });
    },
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
    tabRowClassName (row, rowIndex) {
      let index = rowIndex + 1;
      if (rowIndex % 2 === 0) {
        return 'two-row';
      } else {
        return 'one-row';
      }
      return '';
    },
    // clickVideo(video) {
    //   debugger;

    //   this.vide(video);
    // },
    // init() {
    //   this.videoList.map((item, index) => {
    //     this.vide(item.url, item.id);
    //   });
    // },
    // vide(video, id) {
    //   debugger;
    //   let that = this;
    //   axios
    //     .get(
    //       `/iscvideo/iscvideo/api/baseinfo/local/getCamStreamUrlByAssetNo?assetNo=${video}&protocol=HTTP_FLV&streamType=MAIN`
    //     )
    //     .then(res => {
    //       if (res.data) {
    //         let url = `http://61.161.91.90:38080${res.data}`;
    //         let temp = {
    //           url,
    //           id
    //         };
    //         that.list.push(temp);
    //       }
    //     });
    // },
    loadTableData () {
      let that = this
      axios.get('/data/ranking.json').then(res => {
        that.tableData = res.data.list
      }).catch(err => {
        alert("抱歉，服务出错！")
      })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%", //也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: "2%"
        },
        xAxis: {
          data: ["视频", "电气火灾", "门禁", "电梯", "闸机"],
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
            data: [68, 1, 1, 0, 0, 0],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "rgba(186,210,242,1)",
                    fontSize: 16
                  }
                },
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
    },
    drawLine1 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%", //也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: "2%"
        },
        xAxis: {
          data: this.temperature.time,
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
            data: this.temperature.temperature,
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
            data: this.temperature.temperature,
          }
        ]
      });
    },
    drawLine2 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%", //也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: "2%"
        },
        xAxis: {
          data: [
            "6月18日",
            "6月19日",
            "6月20日"
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
              color: ["rgba(2,17,37,0.5)", "rgba(15,42,82,1)"]
            }
          }
        },
        series: [
          {
            name: "销量",
            type: "bar",
            barWidth: 10, // 柱状粗细
            data: [0, 0, 0],
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
    },
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart4"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%", //也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: "2%"
        },
        xAxis: {
          data: [
            "6月18日",
            "6月19日",
            "6月20日"
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
              color: ["rgba(2,17,37,0.5)", "rgba(15,42,82,1)"]
            }
          }
        },
        series: [
          {
            name: "销量",
            type: "bar",
            barWidth: 2, // 柱状粗细
            data: [],
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
            data: [3, 3, 4]
          }
        ]
      });
    },
    drawLine4 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart5"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        grid: {
          top: "10%",
          bottom: "25%", //也可设置left和right设置距离来控制图表的大小
          left: "5%",
          right: "2%"
        },
        xAxis: {
          data: JSON.parse(window.localStorage.getItem('broadcastTime')),
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
            data: JSON.parse(window.localStorage.getItem('broadcastNumber')),
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
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>