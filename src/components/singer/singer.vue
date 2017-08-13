<template>
  <div class="singer">
    singer
  </div>  
</template>

<script>
import {getSingerList} from 'api/singer';
import {ERR_OK} from 'api/config';
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>
