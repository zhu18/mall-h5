<template>
  <div class="search-component">
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
          show-action
          @search="onSearch"
          @focus="onFocus"
          @blur="onBlur"
          background="ffffff"
        >
          <div slot="left-icon" class="search-icon" :class="{'focus-icon':focusflag}">搜索</div>
           <div slot="action" @click="out">退出</div>
        </Search>
      </form>
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
          focusflag:false
      }
  },
  props: ['serchStyle'],
  methods:{
    onSearch() {},
    out(){
        this.$emit('out',false)
    },
    onFocus() {
      this.focusflag = true;
    },
    onBlur(e) {
      if (this.searchValue == "") {
        this.focusflag = false;
      }
    },
  },
  mounted(){
      console.log(this.serchStyle);
      console.log(123);
  },
  components: {Search}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
