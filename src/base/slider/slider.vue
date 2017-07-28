<template>
  <div class="slider">
    <div class="slider-group">
      <slot>
      </slot>
    </div>
  </div>  
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import '~common/less/variable';
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
