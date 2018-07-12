<!-- 滑块组件 -->
<template>
  <div class="h_slider">
    <div class="scroll" :id="sliderOption.slider" :style="{backgroundColor: sliderOption.range[rangeMax]===sliderOption.slideMax||rangeMax<0?'#fff':'#F0F3F8'}">
      <div class="scrollWidth" v-if="sliderOption.range[rangeMax]>sliderOption.slideMax" :style="{width: scrollWidth+'px'}"></div>
      <div id="mask" :style="{width: maskWidth+'px'}"></div>
      <div class="bar" :id="sliderOption.bar" :style="{left: maskWidth-9+'px'}">
        <div class="tip-bubble">{{count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 具体参数使用案例
// sliderOption: {
//   slider: "slider", 滑动条id(必填)
//   bar: "bar", 滑块id(必填)
//   percent: [], 滑块分段百分比
//   range: [], 滑块分段数值
//   step: 1, 最小滑动距离
//   initial: 200, 初始值
//   slideMin: 0, 能滑动的最小值
//   slideMax: 2000
// }
export default {
  name: "slider",
  data() {
    return {
      maskWidth: 0, //滑块滑动长度
      scrollWidth: 0,
      count: 0, //
      barleft: 0 //滑块距离滑动条左边的距离
    };
  },
  props: {
    sliderOption: [Object]
  },
  computed: {
    rangeMax() {
      return this.sliderOption.range.length - 1;
    }
  },
  mounted() {
    console.log("sliderOption", this.sliderOption);
    var scroll = document.getElementById(this.sliderOption.slider);
    var bar = document.getElementById(this.sliderOption.bar);
    var mask = document.getElementById("mask");
    this.handlerSlider(scroll, bar, this.sliderOption);
  },
  methods: {
    /**
     * [handlerSlider 滑块滑动方法]
     * @param {[String]} scroll  [滑块父dom]
     * @param {[Number]} bar  [滑块dom]
     * @param {[Object]} paramsData [详细配置参数]
     */
    handlerSlider: function(scroll, bar, paramsData) {
      var me = this;
      var progress = 0;
      this.barleft = -bar.offsetWidth / 2;
      var slideWidth = scroll.clientWidth;
      var actualLeft = scroll.offsetLeft;
      var current = scroll.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      var _initial =
        paramsData.initial > paramsData.slideMin
          ? paramsData.initial
          : paramsData.slideMin;
      this.barleft = this.computWidth(paramsData, slideWidth, _initial);
      var minWidth = me.computWidth(
        paramsData,
        slideWidth,
        paramsData.slideMin
      );
      var maxWidth = me.computWidth(
        paramsData,
        slideWidth,
        paramsData.slideMax
      );
      console.log("mimWidth", minWidth);
      console.log("maxWidth", maxWidth);
      // this.scrollWidth = this.barleft
      this.scrollWidth = maxWidth;
      progress = this.barleft / slideWidth;
      me.computProgress(progress, slideWidth, paramsData);
      this.maskWidth = this.barleft;
      //点击跳转
      scroll.onmousedown = function(event) {
        var event = event || window.event;

        me.barleft = event.clientX - actualLeft;
        if (me.barleft < minWidth) {
          me.barleft = minWidth;
        } else if (me.barleft > maxWidth) {
          me.barleft = maxWidth;
        }
        me.maskWidth = me.barleft;
        progress = me.barleft / slideWidth * 100;
        me.computProgress(progress, slideWidth, paramsData);
      };
      //滑动
      bar.onmousedown = function(event) {
        if (event && event.stopPropagation)
          //因此它支持W3C的stopPropagation()方法
          event.stopPropagation();
        else
          //否则，我们需要使用IE的方式来取消事件冒泡
          window.event.cancelBubble = true;
        var event = event || window.event;
        console.log("offsetLeft", this.offsetLeft);
        var leftVal = event.clientX - this.offsetLeft;
        // 拖动一定写到 down 里面才可以
        document.onmousemove = event => {
          var event = event || window.event;
          me.barleft = event.clientX - leftVal;
          if (me.barleft < minWidth) {
            me.barleft = minWidth;
          } else if (me.barleft > maxWidth) {
            me.barleft = maxWidth;
          }
          me.maskWidth = me.barleft;
          if (me.barleft < 0) {
            progress = 0;
          } else if (me.barleft > slideWidth) {
            progress = 1;
          } else {
            progress = me.barleft / slideWidth;
          }
          //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
          window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection.empty();
          me.computProgress(progress, slideWidth, paramsData);
        };
      };
      document.onmouseup = function() {
        document.onmousemove = null; //弹起鼠标不做任何操作
      };
    },
    /**
     * [computProgress 计算滑块不同间距]
     * @param {[Object]} [paramsData]
     */
    computProgress: function(progress, slideWidth, paramsData) {
      if (!paramsData.percent.length || !paramsData.percent) {
        this.count = parseInt(this.barleft / slideWidth * paramsData.slideMax);
      } else {
        for (var i = 0; i < paramsData.percent.length; i++) {
          if (
            progress < paramsData.percent[i] ||
            progress == paramsData.percent[i]
          ) {
            var _range;
            if (paramsData.range[i - 1]) {
              _range = paramsData.range[i - 1];
            } else {
              _range = paramsData.slideMin;
              console.log("_range", _range);
            }
            var _space = paramsData.percent[i - 1]
              ? paramsData.percent[i - 1]
              : 0;
            console.log("space", _space);
            var rangeWidth =
              this.barleft -
              slideWidth *
                (paramsData.percent[i - 1] ? paramsData.percent[i - 1] : 0);
            console.log("rangeWidth", rangeWidth);
            var interval = paramsData.percent[i - 1]
              ? paramsData.range[i] - _range
              : paramsData.range[i];
            console.log("interval", interval);
            var space = paramsData.percent[i] - _space;
            console.log("space", space);
            this.count = paramsData.percent[i - 1]
              ? Math.ceil(interval / (slideWidth * space) * rangeWidth + _range)
              : Math.ceil(interval / (slideWidth * space) * rangeWidth);
            console.log("xxx", this.count);
            var _val = this.count.toString();
            if (paramsData.step) {
              if (
                this.count != paramsData.slideMin &&
                this.count != paramsData.slideMax &&
                this.count % paramsData.step !== 0
              ) {
                var unit = parseInt(_val.substring(_val.length - 1));
                this.count =
                  this.count - this.count % paramsData.step + paramsData.step;
              }
            }
            break;
          }
        }
      }
    },
    /**
     * [computWidth 计算滑块滑动距离]
     */
    computWidth: function(paramsData, slideWidth, count) {
      var width, _range;
      if (!paramsData.percent || !paramsData.percent.length) {
        width = count / paramsData.slideMax * slideWidth;
      } else {
        for (var i = 0; i < paramsData.percent.length; i++) {
          if (count < paramsData.range[i] || count === paramsData.range[i]) {
            if (paramsData.range[i - 1]) {
              _range = paramsData.range[i - 1];
            } else {
              _range = count !== paramsData.initial ? 0 : paramsData.initial;
            }
            var _space = paramsData.percent[i - 1]
              ? paramsData.percent[i - 1]
              : 0;
            var rangeWidth =
              this.barleft -
              slideWidth *
                (paramsData.percent[i - 1] ? paramsData.percent[i - 1] : 0);
            var interval = paramsData.range[i] - _range;
            var space = paramsData.percent[i] - _space;
            width = interval
              ? ((count - _range) / interval * space + _space) * slideWidth
              : 0;
            break;
          }
        }
      }
      return width;
    }
  }
};
</script>

<style scoped>
.scroll {
  cursor: pointer;
  margin-top: 30px;
  width: 100%;
  height: 19px;
  background: #fff;
  border: 1px solid #dfe2e5;
  position: relative;
}
.bar {
  background-image: url("https://uploads.codesandbox.io/uploads/user/82e0864e-4213-4d6c-a67d-cde3dedc92a2/2YBk-%E6%BB%91%E5%8A%A8%E5%9D%97.png");
  width: 18px;
  height: 33px;
  position: absolute;
  top: -6px;
  left: 0;
  cursor: pointer;
}
.bar:hover .tip-bubble,
.bar:active .tip-bubble {
  display: block;
}
.tip-bubble {
  display: none;
  color: #fff;
  background-color: #223243;
  position: absolute;
  left: -7px;
  top: -35px;
  min-width: 30px;
  font-size: 12px;
  padding: 2px;
  text-align: center;
  border-radius: 2px;
}
.tip-bubble:after {
  display: inline-block;
  position: absolute;
  content: "";
  bottom: -10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 5px 0 5px;
  border-color: #223243 transparent transparent transparent;
}
#mask {
  position: absolute;
  left: 0;
  top: 0;
  background: #4e79a8;
  width: 0;
  height: 19px;
}
.scrollWidth {
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
  width: 0;
  height: 19px;
}
</style>
