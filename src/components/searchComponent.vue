<template>
  <div class="search-component">
    <div
      class="search-bar"
      ref="search"
    >
      <form action="/">
        <Search
          class="top-search"
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          shape="round"
          show-action
          @search="onSearch"
          @focus="onFocus"
          @blur="onBlur"
          background="ffffff"
        >
          <div slot="left-icon" class="search-icon" :class="{'focus-icon':focusflag}">搜索</div>
           <div slot="action" @click="out" class='out'>退出</div>
        </Search>
      </form>
    </div>
    <div class="seach-list">
        <div class="top-bar">
            <span class="title">最近搜索</span>
            <span class="del" @click='del' v-if="list.length">删除</span>
        </div>
        <div class="list">
            <span v-for='item in list' :key="item">{{item}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import {
  Search,
} from "vant";
export default {
  name: 'search',
  data(){
      return {
          searchValue:'',
          focusflag:false,
          list:['小桌子','苹果机','宝宝开发智力的玩具','苹果','我想听音乐']
      }
  },
  props: [],
  methods:{
    onSearch() {},
    out(){
        this.$emit('out',false)
    },
    onFocus() {
      this.focusflag = true;
    },
    del(){
        this.list=[]
    },
    onBlur(e) {
      if (this.searchValue == "") {
        this.focusflag = false;
      }
    },
  },
  mounted(){
      console.log(123);
  },
  components: {Search}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" >
@import "../assets/css/index.scss";
.search-bar {
  background:#FC6457;
  position:static;
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
.seach-list{
    padding:0 12px;
    .top-bar{
        height:43px;
        display:flex;
        align-items: center;
        justify-content:space-between;
        .title{
            font-size: 13px;
            color: #646464;
            line-height: 13px;
        }
        .del{
            @include bg-img('../assets/images/demo/del');
            background-repeat: no-repeat;
            background-size: cover;
            text-indent:-9999px;
            height:16px;
            width:16px;
        }
    }
    .list{
        display:flex;
        flex-wrap: wrap;
        span{
            font-size: 13px;
            color: #484848;
            line-height: 13px;
            display:inline-block;
            background-color: #F5F5F5;
            border-radius: 11px;
            margin-right:9px;
            margin-bottom: 14px;
            padding:5px 10px;
        }
    }
    
}
.out{
        font-size: 13px;
        color: #FFFFFF;
        letter-spacing: -1px;
    }
</style>
