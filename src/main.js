import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import locale from 'moment/locale/zh-cn'
import Icon from 'vue-svg-icon/Icon.vue'
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './plugins/element.js'
Vue.use(require('vue-moment'));
Vue.use(VueQuillEditor)
Vue.component('icon', Icon);
// Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
//   return moment(dataStr).format(pattern)

// })
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  moment
}).$mount('#app')
