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
  signUp (data) {
    if (data.nombre === ' ' || data.email === ' ' || data.password === ' ') {
      return alert('Todos los campos son obligatorios')
    }
    fireApp.auth().createUserWithEmailAndPassword(data.email, data.password).then((result) => {
      let newUser = {
        displayName: data.nombre,
        email: result.user.email,
        uid: result.user.id
      }
      router.push({ name: 'profile' })
      fireApp.auth().updateCurrentUser(newUser).catch(err => console.table(err))
    }).catch((err) => {
      console.table(err)
    })
    console.log(data)
  },
  logIn (data) {
    if (data.email === ' ' || data.password === ' ') {
      return alert('Favor de ingresar un correo y contraseña')
    }
    fireApp.auth().signInWithEmailAndPassword(data.email, data.password).then((result) => {
      console.log(result)
      console.log('Entraste')
      router.push({ name: 'profile' })
    }).catch((err) => {
      console.table(err)
      return alert('Favor de ingresar un correo y contraseña correcta')
    })
    console.log(data)
  }
}
