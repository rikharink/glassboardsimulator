<template>
  <div
    id="app"
    v-on:mousemove="mousemove"
    v-on:mousedown="mousedown"
    v-on:mouseup="mouseup"
    v-on:touchstart="touchstart"
    v-on:touchend="touchend"
    v-on:touchmove="touchmove"
    v-on:shake="shake"
  >
    <h1>Glassboard Simulator</h1>
    <h2>A High Effort Joke by Rik Harink</h2>
    <p>Click to draw, shake marker to refill</p>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { LocationUpdate } from "./models/locationUpdate";
import { Component } from "vue-property-decorator";
import Shake from "shake.js";

@Component
export default class App extends Vue {
  myShakeEvent: any = new Shake();

  mounted() {
    this.myShakeEvent.start();
  }

  async mousemove(event: MouseEvent) {
    await this.$store.dispatch(
      "updatePosition",
      new LocationUpdate(event.pageX, event.pageY)
    );
  }

  async mouseup(event: MouseEvent) {
    await this.$store.dispatch("mouseUp");
  }

  async mousedown(event: MouseEvent) {
    await this.$store.dispatch("mouseDown");
  }

  async touchstart(event: TouchEvent) {
    await this.$store.dispatch("mouseDown");
  }

  async touchend(event: TouchEvent) {
    await this.$store.dispatch("mouseUp");
  }

  async touchmove(event: TouchEvent) {
    const ev = event.touches[0];
    await this.$store.dispatch(
      "updatePosition",
      new LocationUpdate(ev.pageX, ev.pageY)
    );
  }

  async shake() {
    await this.$store.dispatch("shake");
  }
}
</script>

<style lang="postcss">
:root {
  --wall-color: #eeebe1;
  --holder-size: 24px;
  --holder-top-spacing: -15px;
  --holder-side-spacing: 10%;
  --holder-back-spacing: 0px;
  --holder-color: #848789;
  --holder-back-color: #848789;
  --holder-back-top-spacing: calc(
    var(--holder-top-spacing) - (var(--holder-back-spacing) / 2)
  );
  --holder-back-side-spacing: calc(
    var(--holder-side-spacing) - (var(--holder-back-spacing) / 2)
  );
  --glassboard-color: #4169e1;
  --glassboard-width: 100%;
  --glassboard-height: 100%;

  --d: 3em;
  --bw: 0.25em;
  --pw: 0.3125em;
  --bd: var(--d) - 2 * (var(--bw) + var(--pw) + 0.15em);
  --ad: var(--bd) - 0.125em;
  --alpha: 0.45;
}

* {
  padding: 0;
  margin: 0;
}
html {
  box-sizing: border-box;
  overflow: hidden;
  cursor: none;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background-color: var(--wall-color);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 8px 0 0 0;
  overflow: hidden;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
