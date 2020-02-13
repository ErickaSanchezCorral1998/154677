import fireApp from './_firebase'
export default {
  signup (data) {
    if (data.nombre === ' ' || data.email === ' ' || data.password === ' ') {
      return alert('Todos los campos son obligatorios')
    }
    fireApp.auth().createUserWithEmailAndPassword(data.email, data.password).then((result) => {
      let newUser = {}
      newUser.displayName = data.nombre
      fireApp.auth().updateCurrentUser(newUser).catch(err => console.log(err))
    }).catch((err) => {
      console.table(err)
    })
    console.log(data)
  }
}
