<template>
  <div class="test">
    <router-link to="/">
      <div class="back">返回</div>
    </router-link>
    <h4>分页组件</h4>
    <pagination :size="size" :total="total" @changeSize="handleChangeSize"></pagination>
  </div>
</template>

<script>
import pagination from "../components/pagination";
export default {
  components: {
    pagination
  },
  data() {
    return {
      size: 10,
      total: 100
    };
  },
  methods: {
    handleChangeSize() {}
  }
};
</script>

<style lang="less" scoped>

</style>
