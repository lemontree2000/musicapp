<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="getQuery" ref="searchBox"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="addQuery(item.k)" class="item" v-for="item in hotKey" :key="item.k">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list @delete="deleteOne" @select="addQuery" :searches="searchHistory"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest @select="saveSearch" @listScroll="blurInput" :query="query" :showSinger="true"></suggest>
    </div>
    <confirm @confirm="clearAll" ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box';
import Suggest from 'components/suggest/suggest';
import SearchList from 'base/search-list/search-list';
import { mapActions, mapGetters } from 'vuex';
import { getHotKey } from 'api/search';
import confirm from 'base/confirm/confirm';
import { ERR_OK } from 'api/config';

export default {
  components: {
    SearchBox,
    Suggest,
    SearchList,
    confirm
  },
  data() {
    return {
      hotKey: [],
      query: ''
    };
  },
  created() {
    this._getHotKey();
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    addQuery(key) {
      this.$refs.searchBox.setQuery(key);
    },
    clearAll() {
      this.clearSearchHistory();
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    blurInput() {
      this.$refs.searchBox.blur();
    },
    saveSearch() {
      this.saveSearchHistory(this.query);
    },
    deleteOne(item) {
      this.deleteSearchHistory(item);
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
    },
    getQuery(query) {
      this.query = query;
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  }
};
</script>

<style lang="less" scoped>
@import "~common/less/variable";
@import "~common/less/mixin";
.search {
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: @font-size-medium;
          color: @color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: @color-highlight-background;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: @font-size-medium;
          color: @color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            .extend-click();
            .icon-clear {
              font-size: @font-size-medium;
              color: @color-text-d;
            }
          }
        }
      }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
