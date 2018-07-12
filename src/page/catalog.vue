<template>
  <div class="catalog">
    <h3 class="title">组件目录</h3>
    <router-link to="/test-mLoading">
      <div class="catalog-tag">1.加载动画</div>
    </router-link>
    <router-link to="/test-pagination">
      <div class="catalog-tag">2.分页</div>
    </router-link>
    <router-link to="/test-slider">
      <div class="catalog-tag">3.滑块</div>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.catalog {
  padding: 0 50px;
  text-align: left;
  .title {
  }
  a {
    text-decoration: none;
  }
  .catalog-tag {
    color: #5c6065;
    &:hover {
      color: #4e94ce;
    }
  }
}
</style>
