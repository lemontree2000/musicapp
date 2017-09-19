<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="topList">
      <ul>
        <li class="item" v-for="item in topList" :key="item.picUrl" @click="selectItem(item)">
          <div class="icon">
            <img :src="item.picUrl" width="100" height="100" alt=".">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{index+1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <v-loading></v-loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>  
</template>

<script>
import {getTopList} from 'api/rank';
import {ERR_OK} from 'api/config';
import Scroll from 'base/scroll/scroll';
import vLoading from 'base/loading/loading';
import {playlistMixin} from 'common/js/mixin';
import {mapMutations} from 'vuex';

export default {
  mixins: [playlistMixin],
  data() {
    return {
      topList: []
    };
  },
  components: {
    Scroll,
    vLoading
  },
  methods: {
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    }),
    selectItem(item) {
      this.$router.push({
        path: `/Rank/${item.id}`
      });
      this.setTopList(item);
    },
    _getTopList() {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList;
        }
      });
    },
    handlePlayList(playlist) {
      const bottom = playlist.length ? '60px' : '';
      this.$refs.rank.style.bottom = bottom;
      console.log(this.$refs.rank.style.bottom);
      this.$refs.topList.refresh();
      console.log(playlist);
    }
  },
  created() {
    this._getTopList();
  }
};
</script>

<style lang="less" scoped>
  @import "~common/less/variable";
  @import "~common/less/mixin";

  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .toplist {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .songlist {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
        }
      }
    }
  }
</style>
