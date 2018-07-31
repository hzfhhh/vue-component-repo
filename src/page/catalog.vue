<template>
  <div class="catalog">
    <router-link to="/test-mLoading">
      <div class="catalog-tag">1.加载动画</div>
    </router-link>
    <router-link to="/test-pagination">
      <div class="catalog-tag">2.分页</div>
    </router-link>
    <router-link to="/test-slider">
      <div class="catalog-tag">3.滑块</div>
    </router-link>
    <router-link to="/test-swiper-out">
      <div class="catalog-tag">4.滑动列表</div>
    </router-link>
    <router-link to="/test-swiper">
      <div class="catalog-tag">5.轮播图</div>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.catalog {
  height: 100%;
  width: 100%;
  padding: 0;
  text-align: left;
  .title {
  }
  a {
    text-decoration: none;
  }
  .catalog-tag {
    margin-left: 50px;
    margin-top: 20px;
    color: #5c6065;
    &:hover {
      color: #4e94ce;
    }
  }
  .side-bar {
    float: left;
    width: 200px;
    height: 100%;
    background-color: #eee;
    padding: 20px 0;
    box-sizing: border-box;
  }
}
</style>
