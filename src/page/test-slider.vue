<template>
  <div id="test-slider">
    <div class="space">均分，滑动单位1</div>
    <slider class="slider1" :sliderOption="sliderOption1"></slider>
    <div class="space">不均分，滑动单位10，可滑动最大值为1000</div>
    <slider class="slider2" :sliderOption="sliderOption2"></slider>
    <div class="markBar">
      <div class="mark1">0</div>
      <div class="mark2">300</div>
      <div class="mark3">600</div>
      <div class="mark4">1000</div>
      <div class="mark5">2000</div>
    </div>
    <div class="space">不均分，滑动单位10，初始值为500，最小值为300</div>
    <slider class="slider3" :sliderOption="sliderOption3"></slider>
    <div class="markBar">
      <div class="mark1">0</div>
      <div class="mark2">300</div>
      <div class="mark3">600</div>
      <div class="mark4">1000</div>
      <div class="mark5">2000</div>
    </div>
  </div>
</template>

<script>
import slider from "../components/slider.vue";
export default {
  name: "test-slider",
  components: {
    slider
  },
  data() {
    return {
      sliderOption1: {
        slider: "slider1", //滑动条id(必填)
        bar: "bar1", //滑块id(必填)
        percent: [], //滑块分段百分比
        range: [], //滑块分段数值
        step: 1, //最小滑动距离
        initial: 200, //初始值
        slideMin: 0, //能滑动的最小值
        slideMax: 2000
      },
      sliderOption2: {
        slider: "slider2",
        bar: "bar2",
        percent: [0.25, 0.5, 0.75, 1],
        range: [300, 600, 1000, 2000],
        step: 10,
        initial: 800,
        slideMin: 0,
        slideMax: 1000
      },
      sliderOption3: {
        slider: "slider3",
        bar: "bar3",
        percent: [0.25, 0.5, 0.75, 1],
        range: [300, 600, 1000, 2000],
        step: 10,
        initial: 500,
        slideMin: 300,
        slideMax: 1000
      }
    };
  }
};
</script>

<style>
#test-slider {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#test-slider .slider1,
#test-slider .slider2,
#test-slider .slider3 {
  position: relative;
  left: 100px;
  width: 800px;
  box-sizing: border-box;
}
.space {
  margin-top: 100px;
  margin-left: 100px;
  text-align: left;
}
.markBar {
  overflow: hidden;
  position: relative;
  left: 100px;
  width: 1000px;
}
.markBar > div {
  float: left;
  position: relative;
}
.mark1 {
  left: 0;
}
.mark2 {
  left: 180px;
}
.mark3 {
  left: 350px;
}
.mark4 {
  left: 520px;
}
.mark5 {
  left: 690px;
}
</style>
