<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :songs="songs" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list';
import {getMusicList} from 'api/rank';
import {ERR_OK} from 'api/config';
import {mapGetters} from 'vuex';
import {createSong} from 'common/js/song';

export default {
  data() {
    return {
      songs: [],
      rank: true
    };
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title() {
      return this.topList.topTitle;
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return '';
    }
  },
  created() {
    this._getMusicList();
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.back();
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._norlmalizeSongs(res.songlist);
        }
      });
    },
    _norlmalizeSongs(list) {
      let ret = [];
      list.forEach(function(item) {
        const musicData = item.data;
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      }, this);
      return ret;
    }
  }
};
</script>

<style lang="less" scoped>
  .slide-enter-active,.slide-leave-active {
    transition: all 0.3s ease;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
