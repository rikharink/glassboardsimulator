<template>
  <div class="glassboard-canvas-wrapper">
    <canvas ref="glassboard-canvas"></canvas>
    <resize-observer @notify="resize"/>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { CanvasProvider } from "../models/canvasProvider";
@Component({})
export default class GlassboardCanvas extends Vue {
  @Provide("provider")
  provider: CanvasProvider = new CanvasProvider();

  get canvas(): HTMLCanvasElement {
    return this.$refs["glassboard-canvas"] as HTMLCanvasElement;
  }

  mounted() {
    this.provider.update(this.canvas);
    this.$store.dispatch("updateCanvas", this.canvas);
    this.resize();
    if (this.provider.context) {
      this.initCanvas();
    }
  }

  initCanvas() {
    const ctx = this.provider.context;
    if (ctx) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
    }
  }

  resize() {
    if (this.canvas.parentElement) {
      this.canvas.width = this.canvas.parentElement.clientWidth;
      this.canvas.height = this.canvas.parentElement.clientHeight;
      this.initCanvas();
    }
  }
}
</script>
</script>
<style lang="postcss" scoped>
.glassboard-canvas-wrapper {
  position: relative;
  z-index: 10;
}
</style>
