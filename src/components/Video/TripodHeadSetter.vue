<template>
  <div id="tripod-head-setter">
    <div class="controller-box">
      <div class="big-circle">
        <template v-for="dBtn in btn.direction">
          <svg-icon :key="dBtn.command"
                    :size="dBtn.icon === 'dot' ? '24' : '16'"
                    :style="dBtn.style"
                    :name="dBtn.icon"
                    class="arrow"
                    :class="{
                            active: currentCommand === dBtn.command
                        }"
                    @mousedown.native="mousedown(dBtn.command)"
                    @mouseup.native="mouseup"
                    @mouseleave.native="mouseleave"></svg-icon>
        </template>
      </div>
      <div class="middle-circle"></div>
      <div class="small-circle"
           :class="{ active: currentCommand === 'STOP' }"
           @click="dispatchCommand('STOP')">
        stop
      </div>
      <div v-for="oGroup in btn.pro"
           :key="oGroup.name"
           class="option-box"
           :style="oGroup.style">
        <div v-for="oBtn in oGroup.items"
             :key="oBtn.command"
             class="btn"
             @mousedown="mousedown(oBtn.command)"
             @mouseup="mouseup"
             @mouseleave="mouseleave">
          <el-tooltip effect="dark"
                      :content="oBtn.title"
                      placement="top">
            <svg-icon :name="oBtn.icon"
                      :class="{ active: currentCommand === oBtn.command }"
                      class="opt"
                      size="16"></svg-icon>
          </el-tooltip>
        </div>
        <div class="name">{{ oGroup.name }}</div>
      </div>
    </div>

    <div class="tab mx-10 mt-20">
      <div class="slider"
           :class="{ offset: currentTab === 1 }"></div>
      <div class="option"
           :class="{ active: currentTab === 0 }"
           @click="currentTab = 0">
        预置位
      </div>
      <div class="option"
           :class="{ active: currentTab === 1 }"
           @click="currentTab = 1">
        巡航
      </div>
    </div>

    <template v-if="currentTab === 0">
      <div class="app-row mx-10 mt-28">
        <el-input v-model.number="currentPresetIndex"
                  style="width: 160px"
                  placeholder="1~255"
                  type="number"
                  @keypress.enter="goToPreset">
        </el-input>
        <el-tooltip effect="dark"
                    content="到预置位"
                    placement="top">
          <i class="material-icons icon-btn ml-8 h-primary"
             :class="{ disable: !currentPresetIndex }"
             @click="goToPreset">
            call_missed_outgoing
          </i>
        </el-tooltip>
        <el-tooltip effect="dark"
                    content="设预置位"
                    placement="top">
          <i class="material-icons icon-btn ml-8 h-primary"
             :class="{ disable: !currentPresetIndex }"
             @click="resetPreset">
            edit
          </i>
        </el-tooltip>
      </div>
    </template>
    <template v-else>
      <div class="mx-10 mt-14 speed-controller">
        <span class="label fz-12 mr-12">云台速度</span>
        <div class="slider-box">
          <el-slider v-model="speed"
                     :show-tooltip="false"
                     :min="1"
                     :max="8"
                     show-input
                     :show-input-controls="false">
          </el-slider>
        </div>
      </div>
      <div class="app-row mx-10 mt-10"
           style="justify-content: space-between;width:230px">
        <el-input v-model.number="guard.point1Index"
                  style="width: 75px"
                  placeholder="1~255"
                  type="number"></el-input>
        <span>-</span>
        <el-input v-model.number="guard.point2Index"
                  style="width: 75px"
                  placeholder="1~255"
                  type="number"></el-input>
        <el-tooltip effect="dark"
                    content="开始巡航"
                    placement="top">
          <i class="material-icons icon-btn ml-8 h-primary"
             :class="{
                            disable: !guard.point1Index || !guard.point2Index
                        }"
             @click="startGuard">
            swap_horiz
          </i>
        </el-tooltip>
        <el-tooltip effect="dark"
                    content="停止巡航"
                    placement="top">
          <i class="material-icons icon-btn ml-8 danger--text"
             @click="stopGuard">
            stop
          </i>
        </el-tooltip>
      </div>
    </template>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon'
let speed = sessionStorage.getItem('ISC-VIDEO-RUN-PTZ-SPEED')
speed = speed === '' ? 1 : parseInt(speed)
export default {
  name: 'TripodHeadSetter',
  components: { SvgIcon },
  props: {
    assetNo: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    btn: {
      direction: [
        {
          style: 'top: 50%;transform: translateY(-50%);left: 8px',
          command: 'LEFT',
          icon: 'left'
        },
        {
          style: 'left: 50%;transform: translateX(-50%);top: 8px',
          command: 'UP',
          icon: 'up'
        },
        {
          style: 'top: 50%;transform: translateY(-50%);right: 8px',
          command: 'RIGHT',
          icon: 'right'
        },
        {
          style: 'left: 50%;transform: translateX(-50%);bottom: 8px',
          command: 'DOWN',
          icon: 'down'
        },
        {
          style: 'left: 28px;top: 28px',
          command: 'LEFT_UP',
          icon: 'dot'
        },
        {
          style: 'right: 28px;top: 28px',
          command: 'RIGHT_UP',
          icon: 'dot'
        },
        {
          style: 'left: 28px;bottom: 28px',
          command: 'LEFT_DOWN',
          icon: 'dot'
        },
        {
          style: 'right: 28px;bottom: 28px',
          command: 'RIGHT_DOWN',
          icon: 'dot'
        }
      ],
      pro: [
        {
          name: '远近',
          style: 'left: 10px',
          items: [
            {
              command: 'ZOOM_IN',
              icon: 'zoom-in',
              title: '放大'
            },
            {
              command: 'ZOOM_OUT',
              icon: 'zoom-out',
              title: '缩小'
            }
          ]
        },
        {
          name: '焦距',
          style: 'left:50%;transform: translateX(-50%)',
          items: [
            {
              command: 'FOCUS_FAR',
              icon: 'focus-far',
              title: '远焦'
            },
            {
              command: 'FOCUS_NEAR',
              icon: 'focus-near',
              title: '近焦'
            }
          ]
        },
        {
          name: '光圈',
          style: 'right: 10px',
          items: [
            {
              command: 'IRIS_REDUCE',
              icon: 'iris-reduce',
              title: '减小'
            },
            {
              command: 'IRIS_ENLARGE',
              icon: 'iris-enlarge',
              title: '增大'
            }
          ]
        }
      ]
    },
    currentTab: 0,
    presetList: [],
    guard: {
      point1Index: null,
      point2Index: null
    },
    currentPresetIndex: '',
    speed: speed,
    isClick: false
  }),
  computed: {
    currentCommand: {
      get: function () {
        return this.$store.state.currentCommand
      },
      set: function (v) {
        this.$store.state.currentCommand = v
      }
    }
  },
  watch: {
    assetNo () {
      // 数据重置
      this.guard = {
        point1Index: null,
        point2Index: null
      }
    },
    speed (v) {
      sessionStorage.setItem('ISC-VIDEO-RUN-PTZ-SPEED', v)
    }
  },
  async created () {
    console.log(this.assetNo)
  },
  methods: {
    mousedown (command) {
      if (command !== 'STOP') {
        this.isClick = true
      }
      this.dispatchCommand(command)
    },
    mouseup () {
      if (this.isClick) {
        this.isClick = false
        this.dispatchCommand('STOP')
      }
    },
    mouseleave () {
      if (this.isClick) {
        this.isClick = false
        this.dispatchCommand('STOP')
      }
    },
    // 设置预置位
    async resetPreset () {
      if (!this.currentPresetIndex) {
        return
      }
      try {
        const { data } = await this.$http.post(
          this.$myApi.monitor.guard,
          {
            action: 0,
            assetNo: this.assetNo,
            command: 'ADD_PRESET',
            presetList: [{ presetIndex: this.currentPresetIndex }]
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
        if (!data) {
          this.$message.error('设置预置位失败')
        } else {
          this.$message.success('设置预置位成功')
        }
      } catch (e) {
        this.$message.error('设置预置位失败：' + e)
      }
    },
    // 设置摄像机至预置点位
    async goToPreset () {
      if (!this.currentPresetIndex) {
        return
      }
      if (this.presetIndexOutRange(this.currentPresetIndex)) {
        this.$message.error('预置位索引须在1~255之间')
        return
      }
      try {
        const { data } = await this.$http.post(
          this.$myApi.monitor.guard,
          {
            action: 0,
            assetNo: this.assetNo,
            command: 'GOTO_PRESET',
            speed: this.speed,
            presetList: [{ presetIndex: this.currentPresetIndex }]
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
        if (!data) {
          this.$message.error('到达预置位失败')
        }
      } catch (e) {
        this.$message.error('到达预置位失败：' + e)
      }
    },
    // 索引范围
    presetIndexOutRange (v) {
      return !v || v < 1 || v > 255
    },
    // 开始巡航
    async startGuard () {
      if (!this.guard.point1Index || !this.guard.point2Index) {
        return
      }
      if (
        this.presetIndexOutRange(this.guard.point1Index) ||
        this.presetIndexOutRange(this.guard.point2Index)
      ) {
        this.$message.error('预置位索引须在1~255之间')
        return
      }
      try {
        const { data } = await this.$http.post(
          this.$myApi.monitor.guard,
          {
            action: 0,
            assetNo: this.assetNo,
            command: 'SPEED_CRUISE',
            speed: this.speed,
            presetList: [
              { presetIndex: this.guard.point1Index },
              { presetIndex: this.guard.point2Index }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
        if (!data) {
          this.$message.error('发送巡航命令失败')
        } else {
          this.$message.success('发送巡航命令成功')
        }
      } catch (e) {
        this.$message.error('发送巡航命令失败：' + e)
      }
    },
    // 结束巡航
    async stopGuard () {
      try {
        const { data } = await this.$http.post(
          this.$myApi.monitor.guard,
          {
            action: 1,
            assetNo: this.assetNo,
            command: 'SPEED_CRUISE',
            presetList: []
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
        if (!data) {
          this.$message.error('发送停止巡航命令失败')
        } else {
          this.$message.success('发送停止巡航命令成功')
        }
      } catch (e) {
        this.$message.error('发送停止巡航命令失败：' + e)
      }
    },
    // 命令分发
    dispatchCommand (command) {
      if (!command) {
        return
      }
      if (!this.assetNo) {
        this.$message.info('设备资产匹配失败')
        return
      }
      if (command === 'STOP') {
        this.sendCommand(1, this.assetNo, this.currentCommand)
      } else {
        this.sendCommand(0, this.assetNo, command)
      }
    },
    // 发送命令
    async sendCommand (action, assetNo, command) {
      try {
        const { data } = await this.$http.get(
          this.$myApi.monitor.control,
          {
            params: {
              action,
              assetNo,
              command,
              speed: this.speed
            }
          }
        )
        if (data) {
          if (action === 0) {
            this.currentCommand = command
          }
          if (action === 1) {
            this.currentCommand = ''
          }
        } else if (command !== 'STOP' && command !== '') {
          // 停止命令请求成功就不再报错
          this.$message.error('云台控制失败')
        }
      } catch (e) {
        this.$message.error('云台控制失败：' + e)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/el-common";
#tripod-head-setter {
  transform: translateY(50px);
  color: #ffffff;
  width: 250px;
  .controller-box {
    position: relative;
    z-index: 2002;
    width: 100%;
    height: 278px;
  }
  .big-circle {
    z-index: 1;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 24px;
    width: 180px;
    height: 180px;
    background: rgba(76, 76, 76, 1);
    border-radius: 90px;
    .icon {
      user-select: none;
      cursor: pointer;
      position: absolute;
    }
  }
  .middle-circle {
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 62px;
    width: 104px;
    height: 104px;
    background: rgba(56, 56, 56, 1);
    border-radius: 52px;
  }
  .small-circle {
    z-index: 3;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 94px;
    width: 40px;
    height: 40px;
    background: rgba(76, 76, 76, 1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    user-select: none;
    cursor: pointer;
  }
  .option-box {
    position: absolute;
    width: 56px;
    top: 222px;
    .btn {
      width: 28px;
      height: 28px;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: 0.3s;
      cursor: pointer;
    }
    .name {
      line-height: 28px;
      text-align: center;
      color: rgba(255, 255, 255, 0.3);
      font-size: 12px;
    }
  }
  .tab {
    height: 28px;
    background: rgba(37, 37, 37, 1);
    border-radius: 2px;
    display: flex;
    position: relative;
    .option {
      z-index: 2;
      margin: 2px;
      height: 24px;
      flex: 1;
      display: flex;
      justify-content: center;
      width: 50%;
      align-items: center;
      font-weight: 500;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.3);
      transition: 0.3s;
      user-select: none;
      cursor: pointer;
      &.active {
        color: white;
      }
    }
    .slider {
      background-color: #383838;
      width: calc(50% - 4px);
      height: 24px;
      top: 2px;
      left: 2px;
      position: absolute;
      transition: 0.16s;
      &.offset {
        transform: translateX(calc(100% + 4px));
      }
    }
  }
  .icon-btn {
    user-select: none;
    cursor: pointer;
    transition: 0.3s;
  }
  .material-icons {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-feature-settings: "liga";
    font-feature-settings: "liga";
  }
  .speed-controller {
    display: flex;
    align-items: center;
    .slider-box {
      flex: 1;
    }
    .el-slider {
      display: block;
      .el-slider__input {
        width: 36px;
        .el-input__inner {
          margin-top: 2px;
          padding-left: 8px;
          padding-right: 8px;
        }
      }
    }
    .el-slider__runway.show-input {
      margin-right: 50px;
    }
  }
}
.el-select-dropdown {
  &.freeze-220-width {
    width: 220px !important;
  }
  .editable-select-option {
    .el-icon-edit,
    .el-icon-delete,
    .el-icon-check {
      transition: 0.3s;
      color: white;
    }
    .el-icon-edit:hover {
      color: #00b2f8;
    }
    .el-icon-delete:hover {
      color: #fe694a;
    }
    &.editing-row {
      background-color: #00b2f8 !important;
    }
    .el-input {
      width: 90%;
      margin-left: -2px;
      .el-input__inner {
        padding-left: 2px;
        padding-right: 2px;
        line-height: 18px;
        border: none;
        height: 18px;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        font-size: 12px;
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
}
</style>
