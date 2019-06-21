<template>
  <div id="stift" class="stift-wrapper" :style="position"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Stift extends Vue {
  get position() {
    return `top: ${this.$store.state.mouseY}px; 
    left: ${this.$store.state.mouseX}px;`;
  }
}
</script>
<style lang="postcss" scoped>
#stift {
  width: 30px;
  height: 150px;
  position: absolute;
  z-index: 10000000;
  transform: rotate(45deg) translate(-50px, 30px);
  background-image: url("/img/chalkmarker.png");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>



