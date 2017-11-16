<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <searchBox ref="searchBox" @query="getQuery" placeholder="搜索歌曲"></searchBox>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches>
        <div class="list-wrapper">
          <scroll ref="songList" class="list-scroll" v-show="currentIndex === 0" :data="playHistory">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </scroll>
          <scroll ref="SearchListwrapper" :refreshDelay="refreshDelay" class="list-scroll" v-show="currentIndex === 1" :data="searchHistory">
            <div class="list-inner">
              <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest @listScroll="blurInput" :query="query" :showSinger="showSinger" @select="selectSuggest"></suggest>
      </div>
      <top-tip ref="TopTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
import SearchBox from 'base/search-box/search-box';
import Suggest from 'components/suggest/suggest';
import {searchMixin} from 'common/js/mixin';
import Switches from 'base/switches/switches';
import Scroll from 'base/scroll/scroll';
import SongList from 'base/song-list/song-list';
import searchList from 'base/search-list/search-list';
import {mapGetters, mapActions} from 'vuex';
import TopTip from 'base/top-tip/top-tip';
import Song from 'common/js/song';

export default {
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      showSinger: false,
      currentIndex: 1,
      switches: [
        {name: '最近播放'},
        {name: '搜索历史'}
      ]
    };
  },
  components: {
    SearchBox,
    Suggest,
    Switches,
    Scroll,
    SongList,
    searchList,
    TopTip
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(() => {
        if (this.currentIndex) {
          this.$refs.SearchListwrapper.refresh();
        } else {
          this.$refs.songList.refresh();
        }
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    selectSuggest() {
      this.saveSearch();
      this.showTip();
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    selectSong(song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song));
        this.showTip();
      }
    },
    showTip() {
      this.$refs.TopTip.show();
    },
    ...mapActions([
      'insertSong'
    ])
  },
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  watch: {
    currentIndex(val) {
      setTimeout(() => {
        if (val === 1) {
          this.$refs.SearchListwrapper.refresh();
        } else {
          this.$refs.songList.refresh();
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
  @import "~common/less/variable";
  @import "~common/less/mixin";

  .add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: @color-background;
    &.slide-enter-active,&.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter,&.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .header {
      position: relative;
      height: 44px;
      text-align: center;
      .title {
        line-height: 44px;
        font-size: @font-size-large;
        color: @color-text;
      }
      .close {
        position: absolute;
        top: 0;
        right: 8px;
        .icon-close {
          display: block;
          padding: 12px;
          font-size: 20px;
          color: @color-theme;
        }
      }
    }
    .search-box-wrapper {
      margin: 20px;
    }
    .shortcut {
      .list-wrapper {
        position: absolute;
        top: 165px;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        .list-scroll {
          height: 100%;
          overflow: hidden;
          .list-inner {
            padding: 20px 30px;
          }
        }
      }
    }
    .search-result {
      position: fixed;
      top: 124px;
      bottom: 0;
      width: 100%;
    }
    .tip-title {
      text-align: center;
      padding: 18px 0;
      font-size: 0;
      .icon-ok {
        font-size: @font-size-medium;
        color: @color-theme;
        margin-right: 4px;
      }
      .text {
        font-size: @font-size-medium;
        color: @color-text;
      }
    }
  }
</style>
