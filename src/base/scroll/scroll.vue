<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props: {
    probeTybe: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeTybe: this.probeTybe,
        click: this.click
      });
    },
    enable() {
      this.scroll && this.scroll.enbale();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scroll.refresh();
      }, 20);
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  }
};
</script>

<style lang="less" scoped>

</style>

