// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuefire from "vuefire"
import vuex from "vuex"
import '../static/reset.css'
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VModal from 'vue-js-modal'
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.min.css";

Vue.use(FullCalendar);
Vue.config.productionTip = false;
Vue.use(VModal)
Vue.use(BootstrapVue)
Vue.use(vuefire);
Vue.use(vuex);
Vue.use(Vuetify);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuex,
  components: { App },
  template: '<App/>'
})
