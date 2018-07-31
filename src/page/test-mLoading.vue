<template>
  <div class="test">
    <router-link to="/">
      <div class="back">返回</div>
    </router-link>
    <h4>加载动画</h4>
    <m-loading></m-loading>
  </div>
</template>

<script>
import mLoading from "../components/m-loading";
export default {
  components: {
    mLoading
  }
};
</script>
