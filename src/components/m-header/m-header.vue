<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import '~common/less/variable';
@import '~common/less/mixin';

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: @color-theme;
  font-size: 0;
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
  }
}

</style>
