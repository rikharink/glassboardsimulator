<template>
  <div class="glassboard-wrapper">
    <GlassboardCanvas class="glassboard"></GlassboardCanvas>
    <div class="holder top left"></div>
    <div class="holder top left back"></div>
    <div class="holder top right"></div>
    <div class="holder top right back"></div>
    <div class="holder bottom left"></div>
    <div class="holder bottom left back"></div>
    <div class="holder bottom right"></div>
    <div class="holder bottom right back"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { CanvasProvider } from "../models/canvasProvider";
import GlassboardCanvas from "./GlassboardCanvas.vue";
@Component({
  components: {
    GlassboardCanvas
  }
})
export default class Glassboard extends Vue {}
</script>
<style lang="postcss" scoped>
.glassboard-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.glassboard {
  width: var(--glassboard-width);
  height: var(--glassboard-height);
  background-color: var(--glassboard-color);
  box-shadow: 4px 4px 11px 0px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 2;
  overflow: hidden;
  opacity: 1;
}

.metal {
}

.holder {
  position: absolute;
  border-radius: 50%;
  width: var(--holder-size);
  height: var(--holder-size);
  z-index: 3;
  background-image: url("/img/brushed.png");
  background-size: cover;
  /* background-position: center; */

  &.bottom {
    bottom: var(--holder-top-spacing);
  }

  &.top {
    top: var(--holder-top-spacing);
  }

  &.left {
    left: var(--holder-side-spacing);
  }

  &.right {
    right: var(--holder-side-spacing);
  }

  &.back {
    position: absolute;
    z-index: 1;
    width: calc(var(--holder-size) + var(--holder-back-spacing));
    height: calc(var(--holder-size) + var(--holder-back-spacing));
    background: var(--holder-back-color);

    &.bottom {
      bottom: var(--holder-back-top-spacing);
    }

    &.top {
      top: var(--holder-back-top-spacing);
    }

    &.left {
      left: var(--holder-back-side-spacing);
    }

    &.right {
      right: var(--holder-back-side-spacing);
    }
  }
}
</style>