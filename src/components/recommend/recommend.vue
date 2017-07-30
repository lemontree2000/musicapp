<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <slider>
          <div v-for="(item, index) in recommends" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" >
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>  
</template>

<script>
import Slider from 'base/slider/slider';
import { getRecommend } from 'api/recommend';
import { ERR_OK } from 'api/config';
export default {
  data () {
    return {
      recommends: []
    };
  },
  components: {
    Slider
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    }
  },
  created () {
    this._getRecommend();
  }
};
</script>

<style lang="less" scoped>

</style>
