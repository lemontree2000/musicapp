<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list';
import {mapGetters} from 'vuex';
import {getSongList} from 'api/recommend';
import {ERR_OK} from 'api/config';
import {createSong} from 'common/js/song';

export default {
  data() {
    return {
      songs: []
    };
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'disc'
    ]),
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    }
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.back();
        return;
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          let list = res.cdlist[0].songlist;
          this.songs = this._normalizeSongs(list);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(function(musicData) {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      }, this);
      return ret;
    }
  },
  created() {
    this._getSongList();
  }
};
</script>

<style lang="less" scoped>
.slide-enter-active .slide-leave-active {
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
