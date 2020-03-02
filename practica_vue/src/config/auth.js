import fireApp from './_firebase'
import router from '@/router'
export default {
  logOut () {
    fireApp.auth().signOut()
    router.push({ name: 'login' })
  },
  async checkUser () {
    let user = fireApp.auth().currentUser
    if (user) {
      return user
    }
    return null
  },
  async signUp (data) {
    if (data.nombre === ' ' || data.email === ' ' || data.password === ' ') {
      return alert('Todos los campos son obligatorios')
    }
    await fireApp.auth().createUserWithEmailAndPassword(data.email, data.password).then((result) => {
      let newUser = {
        displayName: data.nombre,
        email: result.user.email,
        uid: result.user.id
      }
      router.push({ name: 'profile' })
      fireApp.auth().updateCurrentUser(newUser).catch(err => console.table(err))
    }).catch((err) => {
      return Promise.reject(err)
    })
    console.log(data)
  },
  async logIn (data) {
    if (data.email === ' ' || data.password === ' ') {
      return alert('Favor de ingresar un correo y contraseña')
    }
    await fireApp.auth().signInWithEmailAndPassword(data.email, data.password).then((result) => {
      console.log(result)
      router.push({ name: 'profile' })
    }).catch((err) => {
      // Regresamos el error
      return Promise.reject(err)
    })
    console.log(data)
  }
}
