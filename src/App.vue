<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  mounted () {
    if (window.performance.navigation.type == 1) {
      console.log("页面被刷新")
    } else {
      this.selectRouter('/')
    }

  },
  methods: {
    ...mapActions({
      selectRouter: 'router/select_router'
    }),
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
}
</style>