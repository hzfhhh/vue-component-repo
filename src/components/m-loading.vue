<template>
  <!-- 移动端加载状态 -->
  <div class="g-loading">
    <!-- <div class="text">
      拼命加载中...
    </div> -->
    <div class="dot-group">
      <div class="dot dot-1"></div>
      <div class="dot dot-2"></div>
      <div class="dot dot-3"></div>
      <div class="dot dot-4"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.g-loading {
  width: 100%;
  height: 20px;
  .dot-group {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
      width: 7px;
      height: 7px;
      margin: 0 5px;
      border-radius: 50%;
      background-color: #999999;
    }
    .dot-1 {
      animation: loading-1 2s linear infinite;
      background-color: #ef6565;
    }
    .dot-2 {
      animation: loading-2 2s linear infinite;
      background-color: #12b778;
    }
    .dot-3 {
      animation: loading-3 2s linear infinite;
      background-color: #5aa8f7;
    }
    .dot-4 {
      animation: loading-4 2s linear infinite;
      background-color: #f1835b;
    }
  }
}
@keyframes loading-1 {
  from {
    transform: scale(0);
  }
  25% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loading-2 {
  from {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loading-3 {
  from {
    transform: scale(0);
  }
  75% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loading-4 {
  from {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
