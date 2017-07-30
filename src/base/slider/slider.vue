<template>
  <div class="slider">
    <div class="slider-group">
      <slot>
      </slot>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
@import '~common/less/variable';
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
