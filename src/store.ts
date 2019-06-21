import Vue from 'vue';
import Vuex from 'vuex';
import { LocationUpdate } from './models/locationUpdate';
import { CanvasProvider } from './models/canvasProvider';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mouseX: 0,
    mouseY: 0,
    previousDrawX: 0,
    previousDrawY: 0,
    previousX: 0,
    previousY: 0,
    mouseDown: false,
    scaler: 0,
    canvas: new CanvasProvider(),
    offset: (ele: HTMLElement) => {
      const rect = ele.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    },
  },
  mutations: {
    shake(state) {
      state.scaler = Math.max(state.scaler - 0.1, 0);
    },
    updateCanvas(state, canvas: HTMLCanvasElement) {
      state.canvas.update(canvas);
    },
    updatePosition(state, mouseUpdate: LocationUpdate) {
      const canvas = state.canvas.canvas;
      const ctx = state.canvas.context;
      if (!ctx || !canvas) {
        return;
      }
      state.previousX = state.mouseX;
      state.previousY = state.mouseY;
      state.mouseX = mouseUpdate.x;
      state.mouseY = mouseUpdate.y;

      const deltaX = Math.abs(state.mouseX - state.previousX);
      const deltaY = Math.abs(state.mouseY - state.previousY);
      const shakeTreshold = 100;
      if (deltaX > shakeTreshold || deltaY > shakeTreshold) {
        state.scaler = Math.max(state.scaler - 0.1, 0);
      }

      if (state.mouseDown) {
        const off = state.offset(canvas);
        const x = state.mouseX - off.left;
        const y = state.mouseY - off.top;
        const xLast = state.previousDrawX;
        const yLast = state.previousDrawY;
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.4 + Math.random() * 0.2) + ')';
        ctx.beginPath();
        ctx.moveTo(xLast, yLast);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Chalk Effect
        const length = Math.round(Math.sqrt(Math.pow(x - xLast, 2) + Math.pow(y - yLast, 2)) / (5 / 7));
        const xUnit = (x - xLast) / length;
        const yUnit = (y - yLast) / length;
        for (let i = 0; i < length; i++) {
          const xCurrent = xLast + (i * xUnit);
          const yCurrent = yLast + (i * yUnit);
          const xRandom = xCurrent + (Math.random() - 0.5) * 7 * 1.2;
          const yRandom = yCurrent + (Math.random() - 0.5) * 7 * 1.2;
          const widthRandom = Math.random() * 2 + 2;
          const heightRandom = Math.random() + 1;
          ctx.clearRect(xRandom, yRandom, widthRandom + state.scaler, heightRandom + state.scaler);
        }
        state.previousDrawX = x;
        state.previousDrawY = y;
        state.scaler = Math.min(state.scaler + 0.01, 4);
      }
    },
    mouseUp(state) {
      state.mouseDown = false;
    },
    mouseDown(state) {
      const canvas = state.canvas.canvas;
      if (!canvas) {
        return;
      }
      const offset = state.offset(canvas);
      state.previousDrawX = state.mouseX - offset.left;
      state.previousDrawY = state.mouseY - offset.top;
      state.mouseDown = true;
    },
  },
  actions: {
    mouseUp(context) {
      context.commit('mouseUp');
    },
    mouseDown(context) {
      context.commit('mouseDown');
    },
    updatePosition(context, mouseUpdate: LocationUpdate) {
      context.commit('updatePosition', mouseUpdate);
    },
    updateCanvas(context, canvas: HTMLCanvasElement) {
      context.commit('updateCanvas', canvas);
    },
    shake(context) {
      context.commit('shake');
    },
  },
});
