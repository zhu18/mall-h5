<template>
  <div class="home">
    <div class="inner">
    <!-- 头部搜索 -->
    <div
      class="search-bar"
      :style="serchStyle"
      ref="search"
    >
      <form action="/">
        <Search
          class="top-search"
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          shape="round"
          @search="onSearch"
          @focus="onFocus"
          @blur="onBlur"
          background="ffffff"
        >
          <div slot="left-icon" class="search-icon" :class="{'focus-icon':focusflag}">搜索</div>
        </Search>
      </form>
    </div>

    <!-- banner -->
    <div
      class="banner-box"
      :style="{ backgroundImage: 'linear-gradient(195deg,'+curentBannerColor[0]+' 4%, '+curentBannerColor[1]+' 100%)' }"
    >
      <Swipe  class="banner-swiper" @change="onSwiperChange" ref='swiper' >
        <SwipeItem v-for="(image, index) in banners" :key="index"><img :src="image.img"  /></SwipeItem>
      </Swipe>
    </div>
    <!-- nav-bar -->
    <div class="nav-bar">
      <div class="item" v-for="(item,index) in splist" :key="index">
        <span class="icon"></span>
        <span class="text">{{item}}</span>
      </div>
    </div>

    <!-- 团购 -->

    <div class="group-buying">
      <div class="left">
        <h4 class="title">商品团购</h4>
        <small>全网最低 低至3折</small>
        <ul class="list">
          <li class="item">
            <img src="../assets/images/demo/tuangou.png" alt class />
            <span class="discount-price">12289</span>
            <span class="original-price">13688</span>
          </li>
          <li class="item">
            <img src="../assets/images/demo/tuangou2.png" alt class />
            <span class="discount-price">12289</span>
            <span class="original-price">13688</span>
          </li>
          <li class="item">
            <img src="../assets/images/demo/tuangou3.png" alt class />
            <span class="discount-price">12289</span>
            <span class="original-price">13688</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="item">
          <div class="l-item">
            <h4 class="title">品牌团购</h4>
            <small>全网最低</small>
          </div>
          <div class="r-item">
            <img src="../assets/images/demo/tuangou3.png" alt class />
          </div>
        </div>
        <div class="item">
          <div class="l-item">
            <h4 class="title">品目团购</h4>
            <small>全网最低</small>
          </div>
          <div class="r-item">
            <img src="../assets/images/demo/tuangou3.png" alt class />
          </div>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="shop-list" >
      <Tabs v-model="active" sticky :offset-top="searchHeight">
        <Tab v-for="(item,index) in splist" :title="item" :key="index">
          <div class="list-body">
            <List
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class="list-body-c"
              >
            <div class="sp-item" v-for="i in list" :key="i">
              <span class="img">
                <img src="../assets/images/demo/sp2.jpg" alt class />
              </span>
              <span class="name">Apple iMac 21.5英寸一体机四核 Core i5 处理器</span>
              <span class="price">
                <var class="discount-price">¥9998.00</var>
                <var class="original-price">¥12998</var>
              </span>
            </div>
            </List>
          </div>
        </Tab>
      </Tabs>
    </div>
    <!-- 底部导航  -->
    <Tabbar v-model="active2" class='foot' fixed>
      <TabbarItem>
        <span class="tabs-text">首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? require('../assets/images/demo/home-icon-active@3x.png') : require('../assets/images/demo/home-icon@3x.png')"
        >
      </TabbarItem>
      <TabbarItem>
        <span class="tabs-text">分类</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? require('../assets/images/demo/fl-icon-active@3x.png') : require('../assets/images/demo/fl-icon@3x.png')"
        >
      </TabbarItem>
      <TabbarItem>
        <span class="tabs-text">活动</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? require('../assets/images/demo/hd-icon-active@3x.png') : require('../assets/images/demo/hd-icon@3x.png')"
        >
      </TabbarItem>
      <TabbarItem>
        <span class="tabs-text">购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? require('../assets/images/demo/bus-icon-active@3x.png') : require('../assets/images/demo/bus-icon@3x.png')"
        >
      </TabbarItem>
      <TabbarItem>
        <span class="tabs-text">我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? require('../assets/images/demo/my-icon-active@3x.png') : require('../assets/images/demo/my-icon@3x.png')"
        >
      </TabbarItem>
    </Tabbar>
    </div>
    <Popup
      v-model="popupFlag"
      position="left"
      :style="{ height: '100%',width: '100%'  }"
    >
    <searchComponent :serchStyle='serchStyle' @out='searchOut'/>
    </Popup>
  </div>
</template>

<script>

import {
  Tabbar,
  TabbarItem,
  Search,
  Sticky,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  List,
  Popup
} from "vant";
import searchComponent from '../components/searchComponent.vue';
import banner1 from "../assets/images/demo/banner1.png";
import banner2 from "../assets/images/demo/banner2.png";
export default {
  name: "home",
  data() {
    return {
      popupFlag:false,
      scrollHeight:0,
      searchHeight:0,
      active: 0,
      active2: 0,
      searchValue: "",
      focusflag: false,
      bannerIndex: 0,
      splist: [
        "食品生鲜",
        "个护清洁",
        "智能家居",
        "办公用品",
        "母婴亲子",
        "运动旅行",
        "图书影像",
        "爱心超市"
      ],
      banners: [
        {
          img: banner1,
          colors: ["#F15042", "#E96674"]
        },
        {
          img: banner2,
          colors: ["#2B5AAF", "#418AE0"]
        }
      ],
      list: [],
      loading: false,
      finished: false
    };
  },
  computed: {
    // 计算属性的 getter
    curentBannerColor: function() {
      // `this` 指向 vm 实例
      return this.banners[this.bannerIndex].colors;
    },
    serchStyle:function(){
      if (this.scrollHeight>0) {
        return {backgroundImage:  'linear-gradient(195deg,'+this.curentBannerColor[0]+' 4%, '+this.curentBannerColor[1]+' 100%)' }
      }else{
        return {}
      }
    }
  },
  methods: {
    onSearch() {},
    onCancel() {},
    onSwiperChange(e) {
      this.bannerIndex = e;
    },
    searchOut(){
      this.popupFlag=false
    },
    onFocus() {
      this.focusflag = true;
      this.popupFlag = true;
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onBlur(e) {
      if (this.searchValue == "") {
        this.focusflag = false;
      }
    },
    onScroll(){
      console.log(e);
    },
  },
   created(){
   },
   mounted() {
      console.log(this.$refs.swiper.$el.offsetWidth);
     this.searchHeight=this.$refs.search.offsetHeight
     window.addEventListener('scroll',()=>{this.scrollHeight=window.scrollY})
  },
  components: {
    Tabbar,
    TabbarItem,
    Search,
    Sticky,
    Swipe,
    Tab,
    Tabs,
    SwipeItem,
    List,
    Popup,
    searchComponent
  }
};
</script>

<style lang="scss" >
@import "../assets/css/index.scss";

.foot{
  background: #FFFFFF;
  box-shadow: 0 -1px 14px 0 rgba(6,38,83,0.17);
}
.home {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  flex-direction: column;
  // overflow-y: auto;
  padding-bottom: 50px;
}

.search-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  font-size: 13px;
  color: #323232;
  height: 62px;
  display: flex;
  z-index: 999;
  form {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top-search {
    height: 30px;
    flex: 1;
  }
  .search-icon {
    @include bg-img("../assets/images/demo/search");
    height: 16px;
    width: 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    text-indent: -9999px;
    margin-top: 4px;
    transition: all 0.3s;
  }
  .focus-icon {
    height: 16px;
    width: 16px;
    background: url(../assets/images/demo/search-@2x.png) no-repeat center
      center;
    background-size: 100% 100%;
    text-indent: -9999px;
    margin-top: 4px;
  }
}
.banner-box {
  width: 100%;
  height: 172px;
  box-sizing: border-box;
  padding: 50px 12px 0 12px;
  transition: all 0.6s;
  transform: rotate3d(0, 0, 0);
  position:relative;
  &:after{
    content:'';
    display:inline-block;
    width:0;
    height:0;
    border-right:50vw solid transparent;
    border-left:50vw solid transparent;
    border-bottom:30px solid #fff;
    position:absolute;
    left:0px;
    bottom:0px;
    z-index:0;
  }
  .banner-swiper {
    position: relative;
    bottom: -12px;
    height: 122px;
    z-index:100;
    // overflow: hidden;
    // background:red;
 
    img {
      max-width: 100%;
      width: 100%;
      //height: 122px;
      margin:0 
    }
  }
}

.nav-bar {
  margin-top: 19px;
  width: 100%;
  padding: 7px 12px 0px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height:auto;
  .item {
    width: 25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 19px;
    .icon {
      height: 42px;
      width: 42px;
      margin-bottom: 8px;

      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    &:nth-child(1) .icon {
      @include bg-img("../assets/images/demo/sx");
    }
    &:nth-child(2) .icon {
      @include bg-img("../assets/images/demo/qj");
    }

    &:nth-child(3) .icon {
      @include bg-img("../assets/images/demo/jj");
    }

    &:nth-child(4) .icon {
      @include bg-img("../assets/images/demo/bgyk");
    }

    &:nth-child(5) .icon {
      @include bg-img("../assets/images/demo/my");
    }

    &:nth-child(6) .icon {
      @include bg-img("../assets/images/demo/yd");
    }

    &:nth-child(7) .icon {
      @include bg-img("../assets/images/demo/ts");
    }

    &:nth-child(8) .icon {
      @include bg-img("../assets/images/demo/cs");
    }

    .text {
      height: 19px;
      line-height: 19px;
      font-size: 13px;
      color: #323232;
      letter-spacing: 0.27px;
    }
  }
}
.group-buying {
  margin: 0 12px 6px 12px;
  display: flex;
  h4.title {
    margin: 0;
    height: 14px;
    line-height: 14px;
    border-left: 3px solid #ff9708;
    padding-left: 6px;
    font-size: 14px;
    color: #323232;
    letter-spacing: 0;
    line-height: 14px;
    display: flex;
    align-items: center;
    font-weight: normal;
    margin-bottom: 5px;
  }
  small {
    font-size: 11px;
    color: #777777;
    letter-spacing: 0;
    line-height: 11px;
    text-indent: 10px;
    margin-bottom: 8px;
  }
  .left {
    flex: 1;
    display: flex;
    background: #f8f8f8;
    border-radius: 5px;
    flex-direction: column;
    padding: 10px 0;
    .list {
      flex: 1;
      display: flex;
      padding: 5px;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
        font-style: normal;
        .discount-price {
          font-size: 11px;
          color: #ff4444;
          letter-spacing: 0.3px;
          line-height: 11px;
          margin-bottom: 2px;
        }
        .original-price {
          font-size: 8px;
          color: #8e8e8e;
          line-height: 8px;
          text-decoration: line-through;
        }
        img {
          width: 36px;
          height: 36px;
          margin-bottom: 6.5px;
        }
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    .item:nth-child(1) {
      margin-bottom: 5px;
    }
    .item {
      flex: 1;
      width: 100%;
      display: flex;
      background: #f8f8f8;
      border-radius: 5px;
      padding: 10px 0;
      justify-content: space-between;
      .l-item {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
      .r-item {
        display: flex;
        flex: 1;
        justify-content: center;
        img {
          max-width: 40px;
          max-height: 40px;
        }
      }
    }
  }
}
.shop-list {
  padding: 0 12px;
  .list-body-c ,
  .list-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width:100%;
    .sp-item {
      width: calc(50% - 5px);
      display: flex;
      flex-direction: column;
      margin:7px 0 17px 0;
      .name {
        font-size: 12px;
        color: #323232;
        text-align: left;
        line-height: 17px;
        height:34px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding:0 5px;
        margin-bottom:7px;
      }
      .price{
        display:flex;
        justify-content:space-between;
        padding:0 5px;
        font-style: normal;
        .discount-price{
          font-size: 14px;
          color: #F44336;
          line-height: 14px;
          font-style:normal;
        }
        .original-price{
            font-size: 12px;
            color: #909090;
            line-height: 12px;
            text-decoration: line-through;
            font-style:normal;
        }
      }
      .img {
        // @include border-1px(#eeeeee);
        width: 100%;
        height: 140px;
        border:1px solid #eeeeee;
        border-radius: 10px;
        box-sizing: border-box;
        margin-bottom:7px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          border:none;
          display: block;
        }
      }
    }
  }
}
.van-tabbar-item--active .tabs-text{
  color: #FC6457;
}
.tabs-text{
  font-size: 10px;
  color: #323232;
  text-align: center;
  line-height: 10px;
}

</style>
<style>
.van-field__control::placeholder {
  font-size: 12px;
  line-height: 1;
  padding: 5px;
}
.van-field__control {
  position: relative;
}
.shop-list .van-tab {
  font-size: 13px;
  color: #555555;
  font-weight: normal;
}
.shop-list .van-tab--active {
  font-size: 13px;
  color: #323232;
}
 .shop-list .van-hairline--top-bottom::after,
  .shop-list  .van-hairline-unset--top-bottom::after{
  border:none;
}
.van-list__loading,.van-list__error-text, .van-list__finished-text, .van-list__loading{
  width:100%;
  text-align:center;
}
.shop-list .van-tabs__line {
    bottom:25px;
    width:19px!important;
    height:3px!important;
    }
    .van-swipe-item{
   
    }
</style>
