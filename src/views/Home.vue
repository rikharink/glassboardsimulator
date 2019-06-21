<template>
  <div class="wall">
    <Glassboard></Glassboard>
    <Stift></Stift>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Glassboard from "@/components/Glassboard.vue";
import Stift from "@/components/Stift.vue";

@Component({
  components: {
    Glassboard,
    Stift
  }
})
export default class Home extends Vue {}
</script>
<style lang="postcss" scoped>
.wall {
  display: flex;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
  padding: 5vw 5vh;
}
</style>

