<template>
  <div class="swiper-out">
    <ul>
      <li class="list-item " v-for="(item,index) in list " :key="index">
          <div class="list-box" @click="skip" @touchstart.capture="touchStart" @touchmove.capture="touchMove" :data-index="index" @touchend.capture="touchEnd" :style="{transform: `translate3d(${activeIndex==index?distance:0}rem,0,0)`}">
              <img class="list-img" :src="item.imgUrl" alt="">
              <div class="list-content">
                  <p class="title">{{item.title}}</p>
                  <p class="tips">{{item.tips}}</p>
                  <p class="time">{{item.time}}</p>
              </div>
          </div>
          <div class="delete" @click="deleteItem" :style="{transform: `translate3d(${activeIndex==index?distance:0}rem,0,0)`}" ref="delete">删除</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeIndex: 0,
      startX: 0,
      endX: 0,
      distance: 0,
      innerWidth: 0
    };
  },
  props: {
    list: {
      type: Array
    }
  },
  mounted() {
    var innerWidth = window.innerWidth;
    document.getElementsByTagName("html")[0].style.fontSize =
      innerWidth / 10 + "px";
    //点击其它区域隐藏
    let start = 0;
    let delBtn = document.querySelectorAll(".delete");
    document.addEventListener("touchstart", e => {
      start = e.touches[0].clientX;
    });
    document.addEventListener("touchend", e => {
      let isDelBtn = false;
      delBtn.forEach(item => {
        if (item === e.target) {
          console.log("item", item);
          return (isDelBtn = true);
        }
      });
      if (e.changedTouches[0].clientX === start && !isDelBtn) {
        this.distance = 0;
      }
    });
    this.innerWidth = window.innerWidth;
  },
  methods: {
    //跳转
    skip() {
      alert("You click the slide!");
    },
    //滑动开始
    touchStart(e) {
      this.startX = e.touches[0].clientX;
      var index = e.currentTarget.dataset.index;
      if (index !== this.activeIndex) {
        this.distance = 0;
      }
      this.activeIndex = index;
      // console.log('activeIndex', this.activeIndex);
    },
    //滑动过程
    touchMove(e) {
      let parentElement = e.currentTarget.parentElement;
      if ((this.startX - e.touches[0].clientX) / (this.innerWidth / 10) > 2) {
        this.distance = -2;
      } else if (
        (this.startX - e.touches[0].clientX) / (this.innerWidth / 10) <
        -2
      ) {
        this.distance = 0;
      } else if (
        this.distance ||
        (!this.distance && this.startX > e.touches[0].clientX)
      ) {
        this.distance =
          (e.touches[0].clientX - this.startX) / (this.innerWidth / 10);
      }
    },
    //滑动结束
    touchEnd(e) {
      let parentElement = e.currentTarget.parentElement;
      this.endX = e.changedTouches[0].clientX;
      var endDistance = (this.startX - this.endX) / (this.innerWidth / 10);
      if (endDistance < 2) {
        this.distance = 0;
      } else if (endDistance > -2) {
        this.distance = -2;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //删除
    deleteItem(e) {
      let index = e.currentTarget.parentElement.firstChild.dataset.index;
      this.list.splice(index, 1);
      this.distance = 0;
    }
    //判断当前是否有滑块处于滑动状态
    // checkSlide(){
    // 	let listItems = document.querySelectorAll('.list-item');
    // 	for( let i = 0 ; i < listItems.length ; i++){
    // 		if( listItems[i].dataset.type == 1 ) {
    // 			return true;
    //         }
    // 	}
    // 	return false;
    // },
    //一次只能滑动一个
    // restSlide(e){
    // 	let listItems = document.querySelectorAll('.list-item');
    // 	for( let i = 0 ; i < listItems.length ; i++){
    // 		listItems[i].dataset.type = 0;
    //     }
    // },
  }
};
</script>

<style scoped>
.list-item {
  position: relative;
  height: 1.6rem;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
/* .list-item[data-type="0"]{
        transform: translate3d(0,0,0);
    }
    .list-item[data-type="1"]{
        transform: translate3d(-2rem,0,0);
    } */
.list-item:after {
  content: " ";
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-box {
  padding: 0.2rem;
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}
.list-item .list-img {
  display: block;
  width: 1rem;
  height: 1rem;
}
.list-item .list-content {
  padding: 0.1rem 0 0.1rem 0.2rem;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  overflow: hidden;
}
.list-item .title {
  display: block;
  color: #333;
  overflow: hidden;
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}
.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}
.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0.1rem;
  color: #666;
  margin: 0;
}
.list-item .delete {
  width: 2rem;
  height: 1.6rem;
  background: #ff4949;
  font-size: 17px;
  color: #fff;
  text-align: center;
  line-height: 1.6rem;
  position: absolute;
  top: 0;
  right: -2rem;
}
</style>
