import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueResize from 'vue-resize';
import 'vue-resize/dist/vue-resize.css';

Vue.config.productionTip = false;
Vue.use(VueResize);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
