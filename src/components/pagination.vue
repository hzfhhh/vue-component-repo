<!-- 分页插件-->
<template>
  <div class="pagination">
    <a href="javascript:;" class="btn-prev" :class="{disabled: pageIndex==1}" :style="{cursor: pageIndex==1?'not-allowed':'pointer'}" @click="setPage(pageIndex-1)">
    </a>
    <ul class="pager">
      <a href="javascript:;" v-if="pageArrayIndex > 1">
        <li class="number" @click="setPage(1)">1</li>
        <li class="dot">...</li>
      </a>
      <a href="javascript:;" v-for="i in (pageArrayIndex < Math.ceil(totalPage/size)? pageLenth : (totalPage - addNum))" :key="i" @click="setPage(i+addNum)">
        <li class="number" :class="{active: (i+addNum)==pageIndex}">{{i+addNum}}</li>
      </a>
      <a href="javascript:;" v-if="(totalPage - addNum) > pageLenth && pageArrayIndex < totalPage">
        <li class="dot">...</li>
        <li class="number" @click="setPage(totalPage)">{{totalPage}}</li>
      </a>
    </ul>
    <a href="javascript:;" class="btn-next" :class="{disabled: totalPage===1||pageIndex==totalPage}" :style="{cursor: totalPage===1||pageIndex==totalPage?'not-allowed':'pointer'}" @click="setPage(pageIndex+1)">
    </a>
    <div class="toPath">
      前往<div class="inputNum"><input type="text" v-model="inputPageIndex" @blur="setPage(inputPageIndex)" @keyup.enter="setPage(inputPageIndex)"></div>页
    </div>
  </div>
</template>

<script>
/**
 * 使用说明
 * Mthods: changeSize (页码改变回调函数)
 * Params: size(每页展示的列数), total(总列数)
 **/
export default {
  name: "pagination",
  props: {
    size: [String, Number], //每页展示的列数
    total: [String, Number] //总列数
  },
  data() {
    return {
      pageIndex: 1, //当前页码
      inputPageIndex: 1,//当前页码
      pageArrayIndex: 1, //当前页码分组
      addNum: 0,
      showSize: 5
    };
  },
  created() {
    this.pageArrayIndex = this.pageIndex;
  },
  computed: {
    //总页码数
    totalPage() {
      var totalPage = Math.ceil(this.total / this.size);
      return totalPage;
    },
    // 每组展示的页码数
    pageLenth() {
      var pageLenth = this.total > this.size * 10 ? 10 : this.totalPage;
      return pageLenth;
    }
  },
  methods: {
    setPage(i) {
      // 大于总页码数
      if (i > this.totalPage) {
        return false;
      }
      // 一次展示的列数小于总列数
      if ((i !== 0 && this.size < this.total) || this.size === this.total) {
        this.pageIndex = i;
        this.pageArrayIndex = Math.floor((i - 1) / this.size) + 1;
        //下一页判断
        if (
          (this.pageIndex - 1) % this.size === 0 &&
          this.pageIndex - 1 < this.total
        ) {
          var n = (this.pageIndex - 1) / this.size;
          this.addNum = n * this.size;
          // 上一页判断
        } else if (
          this.pageIndex % this.size === 0 &&
          this.pageIndex > 1 &&
          this.pageArrayIndex > 0
        ) {
          var n = this.pageIndex / this.size;
          this.addNum = (n - 1) * this.size;
        }
        this.$emit("changeSize", i);
      }
    }
  }
};
</script>

<style>
.pagination {
  text-align: center;
  margin: auto;
  overflow: hidden;
}
.pagination .active {
  color: #fff;
  background-color: #436993;
  border: none;
}
.pagination .btn-prev {
  display: inline-block;
  vertical-align: sub;
  width: 25px;
  height: 25px;
  line-height: 25px;
  padding: 2px 0;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  position: relative;
  margin-right: 20px;
}
.pagination .btn-prev:after {
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px 9px 7px 0;
  border-color: transparent #fff transparent transparent;
}
.pagination .btn-prev:before {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px 9px 7px 0;
  border-color: transparent #909399 transparent transparent;
}
.pagination .btn-prev.disabled {
  background-color: #ebeef5;
}
.pagination .btn-prev.disabled:before {
  border-color: transparent #909399 transparent transparent;
}
.pagination .btn-prev.disabled:after {
  border-color: transparent #ebeef5 transparent transparent;
}
.pagination .btn-next {
  display: inline-block;
  vertical-align: sub;
  width: 25px;
  height: 25px;
  line-height: 25px;
  padding: 2px 0;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  position: relative;
  margin-right: 20px;
}
.pagination .btn-next:after {
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px 0 7px 9px;
  border-color: transparent transparent transparent #fff;
}
.pagination .btn-next:before {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px 0 7px 9px;
  border-color: transparent transparent transparent #909399;
}
.pagination .btn-next.disabled {
  background-color: #ebeef5;
}
.pagination .btn-next.disabled:before {
  border-color: transparent transparent transparent #909399;
}
.pagination .btn-next.disabled:after {
  border-color: transparent transparent transparent #ebeef5;
}
.pagination .pager {
  vertical-align: sub;
  display: inline-block;
  overflow: hidden;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.pagination .pager a {
  color: #475669;
}
.pagination .pager a .number {
  margin-right: 18px;
  float: left;
  padding: 0 5px;
  height: 25px;
  line-height: 23px;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  /*border-right: none;*/
}
.pagination .pager a .dot {
  font-weight: bold;
  float: left;
  margin-right: 20px;
}
.pagination .pager a:first-child .number {
  /*border-left: none;*/
}
.pagination .toPath {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
}
.pagination .toPath .inputNum {
  display: inline-block;
  width: 50px;
  margin: 0 5px;
}
.pagination .toPath .inputNum input {
  display: inline-block;
  width: 100%;
  height: 23px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  text-align: center;
}
.pagination .toPath .inputNum input:focus {
  outline: none;
  border: 1px solid #436993 !important;
}
.pagination .toPath .inputNum input:hover {
  outline: none;
  border-color: #c0c4cc;
}
</style>
