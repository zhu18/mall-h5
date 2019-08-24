<template>
  <div class="home">
    <!-- 头部搜索 -->
    <div class="search-bar">
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
    <div class="banner-box">
      <Swipe :autoplay="3000" class="banner-swiper">
        <SwipeItem v-for="(image, index) in banners" :key="index">
          <img v-lazy="image" />
        </SwipeItem>
      </Swipe>
    </div>

    <!-- 底部导航  -->
    <Tabbar v-model="active" fixed>
      <TabbarItem icon="home-o">标签</TabbarItem>
      <TabbarItem icon="search">标签</TabbarItem>
      <TabbarItem icon="friends-o">标签</TabbarItem>
      <TabbarItem icon="setting-o">标签</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Search, Sticky,Swipe, SwipeItem } from "vant";
import banner1 from '../assets/images/demo/banner1.png';
import banner2 from '../assets/images/demo/banner2.png';
export default {
  name: "home",
  data() {
    return {
      active: 0,
      searchValue: "",
      focusflag: false,
      banners:[banner1,banner2],
    };
  },
  methods: {
    onSearch() {},
    onCancel() {},
    onFocus() {
      this.focusflag = true;
    },
    onBlur(e) {
     if (this.searchValue=='') {
        this.focusflag = false
     }
    }
     
  },
  components: {
    Tabbar,
    TabbarItem,
    Search,
    Sticky,
    Swipe, 
    SwipeItem
  }
};
</script>
<style lang="scss" scoped>
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
  flex-direction:column;
  // overflow:hidden;
}

.search-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  font-size: 13px;
  color: #323232;
  height:62px;
  display:flex;
  form{
    flex:1;
    width:100%;
    height:62px;
    display:flex;
    justify-content:space-between;
    align-items: center;
    
  }
  .top-search{
    height:30px;
    flex:1;
  }
  .search-icon {
    height: 16px;
    width: 16px;
    background: url(../assets/images/demo/搜索@2x.png) no-repeat center center;
    background-size: 100% 100%;
    text-indent: -9999px;
    margin-top: 4px;
    transition:all 0.3s;
  }
  .focus-icon {
    height: 16px;
    width: 16px;
    background: url(../assets/images/demo/搜索-@2x.png) no-repeat center center;
    background-size: 100% 100%;
    text-indent: -9999px;
    margin-top: 4px;
  }
  
}
.banner-box{
    width:375px;
    height:184px;
    background-image: linear-gradient(195deg, #F15042 4%, #E96674 100%);
    padding-top:62px;
    box-sizing:border-box;
    .banner-swiper{
      width:351px;
      height:122px;
      overflow: hidden;
      img{
         width:351px;
         height:122px;
      }
    }
  }
</style>
<style>
.van-field__control::placeholder {
  font-size: 12px;
}
</style>
