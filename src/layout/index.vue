<template>
  <el-container>
    <el-header>
      <LayHeader />
    </el-header>
    <el-container style="background-color: #11246b;">
      <el-aside width="100px">
        <section>
          <div class="silde">
            <router-link :to="{path: '/'}"
                         @click.native="displayArticle()">
              <div>
                <i class="iconfont">&#xe62c;</i>
              </div>
              <span class="iconname">首页</span>
            </router-link>
          </div>
          <div class="silde">
            <router-link :to="{path: '/fireManger'}">
              <div>
                <i class="iconfont">&#xe630;</i>
              </div>
              <span class="iconname">消防管理</span>
            </router-link>
          </div>
          <div class="silde">
            <router-link :to="{path: ''}">
              <div>
                <i class="iconfont">&#xe62d;</i>
              </div>
              <span class="iconname">视频监控</span>
            </router-link>
          </div>
          <div class="silde">
            <router-link :to="{path: ''}">
              <div>
                <i class="iconfont">&#xe62e;</i>
              </div>
              <span class="iconname">环保管理</span>
            </router-link>
          </div>
          <div class="silde">
            <router-link :to="{path: '/accessManger'}">
              <div>
                <i class="iconfont">&#xe633;</i>
              </div>
              <span class="iconname">门禁管理</span>
            </router-link>
          </div>
          <!--
            <router-link :to="{path: ''}">
              <div>
                <i class="iconfont">&#xe62d;</i>
              </div>
              <span>环保管理</span>
            </router-link>
            <router-link :to="{path: ''}">
              <div>
                <i class="iconfont">&#xe62e;</i>
              </div>
              <span>楼宇自控</span>
            </router-link>
            <router-link :to="{path: ''}">
              <div>
                <i class="iconfont">&#xe634;</i>
              </div>
              <span>能耗监测</span>
            </router-link>
            <router-link :to="{path: ''}">
              <div>
                <i class="iconfont">&#xe631;</i>
              </div>
              <span>停车管理</span>
            </router-link>
            <router-link :to="{path: ''}">
              <div>
                <i class="iconfont">&#xe62f;</i>
              </div>
              <span>门禁管理</span>
            </router-link>
            <router-link :to="{path: ''}">
              <div>
                <i class="iconfont">&#xe632;</i>
              </div>
              <span>智能照明</span>
            </router-link> -->
        </section>
      </el-aside>
      <el-main>
        <transition name="fade-transform"
                    mode="out-in">
          <div class="main">
            <div class="main-router"
                 v-if="routerList.length > 0">
              <div v-for="(item,index) in routerList"
                   :key="index+'router'">
                <router-link :to="{path:item.path}">
                  <p>{{ item.name }}</p>
                </router-link>
              </div>
            </div>
            <div class="main-view">
              <router-view :key="key +'view'" />
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { LayHeader } from './components'
import variables from '@/styles/variables.scss'
import { storage } from "../utils/constant"

export default {
  name: 'Layout',
  components: {
    // Navbar,
    // Sidebar,
    // AppMain
    LayHeader
  },
  computed: {

    variables () {
      return variables
    },
    // 路由
    routerList () {
      let list = []
      const routePath = this.$route.matched[1].path;
      const route = JSON.parse(localStorage.getItem(storage.ROUTEMATCH))
      for (let i = 0; i < route.length; i++) {
        const item = route[i]
        const path = item.path
        if (routePath === path) {
          list = item.children
          break
        }
      }
      return list
    }
  },
  methods: {
    displayArticle () {
      alert(1312)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.el-header {
  padding: 0;
  background: linear-gradient(#223fac, #4887f3);
  height: 76px !important;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.el-main {
  background: rgba(34, 63, 172, 1);
  padding-top: 0;
  overflow: hidden;
  padding-left: 0;
}
.main {
  .main-router {
    float: left;
    height: 1004px;
    width: 120px;
    background: #293a7a;
    div {
      .router-link-active {
        display: inline-block;
        width: 96%;
        color: white;
        height: 50px;
        text-align: center;
        text-decoration: none;
        box-shadow: 3px 3pt 6px 0px rgba(50, 111, 252, 0.73);
        background: radial-gradient(#477ce7, #223d92);
        border: 1px solid #68b4ff;
        border-left: 4px solid #68b4ff;
      }
    }
  }
  .main-view {
    overflow: hidden;
    padding-left: 20px;
  }
}
.silde {
  width: 100px;
  height: 100px;
  text-align: center;
  background: #11246b;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
  }
}
.iconfont {
  font-size: 32px;
  color: white;
}
.iconname {
  font-size: 16px;
  color: white;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
