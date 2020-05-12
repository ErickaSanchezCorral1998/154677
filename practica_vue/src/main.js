import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Auth from './config/auth'
import Firebase from './config/_firebase'
import 'animate.css'
// VueFire instalacion
import { firestorePlugin } from 'vuefire'
//  librerias de usuario
import 'bootstrap/scss/bootstrap.scss'
// Registro de pugin en vue
Vue.use(firestorePlugin)
Vue.config.productionTip = false
Firebase.auth().onAuthStateChanged(user => {
  if (user) {
    router.push({ name: 'partidas' }).catch(err => console.log(err))
  } else {
    router.push({ name: 'login' }).catch(err => console.log(err))
  }
})
// Metodo de comprobacion de permiso de acceso
router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    console.log('Necesita permiso para entrar')
    // Traer informacion actual del usuario
    let user = await Auth.checkUser()
    if (user == null) {
      // si no hay'un usuario, se redirecciona a login
      next({
        name: 'login'
      })
      return
    }
    // Si existe un usuario avanzamos a la ruta
    console.log(`Usuario logeado: ${user.email}`)
    next()
  }
  next()
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
