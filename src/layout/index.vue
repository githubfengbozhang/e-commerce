<template>
  <el-container>
    <el-header>
      <LayHeader />
    </el-header>
    <el-container style="background-color: #11246b;">
      <el-aside width="100px">
        <section>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/'}">
            <router-link :to="{path: '/'}"
                         @click.native="displayArticle('/')">
              <div>
                <i class="iconfont">&#xe62c;</i>
              </div>
              <span class="iconname">首页</span>
            </router-link>
          </div>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/fireManger'}">
            <router-link :to="{path: '/fireManger'}"
                         @click.native="displayArticle('/fireManger')">
              <div>
                <i class="iconfont">&#xe630;</i>
              </div>
              <span class="iconname">消防管理</span>
            </router-link>
          </div>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/NotPage'}">
            <router-link :to="{path: '/fireManger'}"
                         @click.native="displayArticle('/NotPage')">
              <div>
                <i class="iconfont">&#xe62d;</i>
              </div>
              <span class="iconname">视频监控</span>
            </router-link>
          </div>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/NotPage1'}">
            <router-link :to="{path: ''}"
                         @click.native="displayArticle('/NotPage1')">
              <div>
                <i class="iconfont">&#xe62e;</i>
              </div>
              <span class="iconname">环保管理</span>
            </router-link>
          </div>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/NotPage2'}">
            <router-link :to="{path: ''}"
                         @click.native="displayArticle('/NotPage2')">
              <div>
                <i class="iconfont">&#xe634;</i>
              </div>
              <span class="iconname">楼宇自控</span>
            </router-link>
          </div>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/NotPage3'}">
            <router-link :to="{path: ''}"
                         @click.native="displayArticle('/NotPage3')">
              <div>
                <i class="iconfont">&#xe631;</i>
              </div>
              <span class="iconname">能耗监测</span>
            </router-link>
          </div>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/NotPage4'}">
            <router-link :to="{path: ''}"
                         @click.native="displayArticle('/NotPage4')">
              <div>
                <i class="iconfont">&#xe631;</i>
              </div>
              <span class="iconname">停车管理</span>
            </router-link>
          </div>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/accessManger'}">
            <router-link :to="{path: '/accessManger'}"
                         @click.native="displayArticle('/accessManger')">
              <div>
                <i class="iconfont">&#xe633;</i>
              </div>
              <span class="iconname">门禁管理</span>
            </router-link>
          </div>
          <div class="silde"
               :class="{'select-silde':selectItem ==='/NotPage5'}">
            <router-link :to="{path: ''}"
                         @click.native="displayArticle('/NotPage5')">>
              <div>
                <i class="iconfont">&#xe632;</i>
              </div>
              <span class="iconname">智能照明</span>
            </router-link>
          </div>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    // Navbar,
    // Sidebar,
    // AppMain
    LayHeader
  },
  data () {
    return {
      selectItem: '/',
    }
  },
  watch: {
    selectMenu: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.selectItem = newValue
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      selectMenu: 'selectRouter'
    }),
    variables () {
      return variables
    },
    // 路由
    routerList () {
      let list = []
      const routePath = this.$route.matched[1].path;
      const route = JSON.parse(localStorage.getItem(storage.ROUTEMATCH))
      console.log(route)
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
    ...mapActions({
      selectRouter: 'router/select_router'
    }),
    /** 
     * 选中的菜单项
    */
    displayArticle (item) {
      this.selectItem = item;
      this.selectRouter(item)
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
.select-silde {
  background: radial-gradient(#477ce7, #223d92) !important;
  border: 1px solid #68b4ff;
  box-shadow: 3px 3px 6px 0px rgba(50, 111, 252, 0.73);
}
.silde {
  width: 98px;
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
