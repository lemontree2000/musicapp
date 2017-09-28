<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" ref="elInput" v-model="query" class="box" :placeholder="placeholder">
    <i v-show="query" @click="clear" class="icon-dismiss"></i>
  </div>
</template>

<script>
import {debunce} from 'common/js/util';

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    };
  },
  methods: {
    clear() {
      this.query = '';
    },
    blur() {
      this.$res.elInput.blur();
    },
    setQuery(query) {
      this.query = query;
    }
  },
  created() {
    this.$watch('query', debunce((newQuery) => {
      this.$emit('query', newQuery);
    }, 300));
  }
};
</script>

<style lang="less" scoped>
@import "~common/less/variable";

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: @color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: @color-background;
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: @color-highlight-background;
    color: @color-text;
    font-size: @font-size-medium;
    &::placeholder {
      color: @color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: @color-background;
  }
}

</style>
