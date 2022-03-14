import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Ripple from 'vuetify/lib/directives/ripple'
import mavonEditor from 'mavon-editor'

Vue.config.productionTip = false

// mavonEditer
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  directives: {
    Ripple,
  },
}).$mount('#app')