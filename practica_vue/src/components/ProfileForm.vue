<template>
  <section>
    <div class="row">
      <alerts-component v-if="showError" :message="errorMessage" :code="errorCode"></alerts-component>
              <div class="col-3-lg col-6-md col-6-sm">
                <span class="spanText">Name</span>
              </div>
              <div class="col">
              <input  type="text" placeholder="User" class="form-control mb-2 nameUser text-center"
              v-model="user.nombre">
              </div>
            </div>
      <div class="row">

              <div class="col-3-lg col-6-md col-6-sm">
                <span class="spanText">Email</span>
              </div>
              <div class="col">
                <input  type="text" v-model="user.emailUser" class="form-control mb-2 text-center" >
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-3-lg col-6-md col-6-sm">
                <span class="spanText">Phone </span>
              </div>
              <div class="col">
              <input  type="text" v-model="user.phone" class="form-control mb-2 text-center" >
              </div>
            </div>
            <br>
                  <div class="row">
              <div class="col-3-lg col-6-md col-6-sm">
                <span class="spanText">Photo<br> URL</span>
              </div>
              <div class="col">
                <input type="text" v-model="user.photo" class="form-control mb-2 text-center" >
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-6 justufy-center">
                <button class="btn btn-pink btn-block " @click="updateProfile">Update profile</button>
              </div>
            </div>
</section>
</template>
<script lang="js">
import Auth from '@/config/auth.js'
import Firebase from '@/config/_firebase.js'
import AlertsComponent from '@/components/Helpers/Alerts'
export default {
  name: 'ProfileForm',
  components: {
    AlertsComponent
  },
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      showError: false,
      errorMessage: '',
      errorCode: '',
      user: {
        nombre: '',
        emailUser: '',
        password: '',
        phone: '',
        photo: ''
      }
    }
  },
  mounted () {
    let userC = Firebase.auth().currentUser
    this.user.emailUser = userC.email
    this.user.nombre = userC.displayName
    this.user.phone = userC.phoneNumber
    this.user.photo = userC.photoURL
  },
  methods: {
    name: 'Profile',
    logout () {
      return Auth.logOut()
    },
    updateProfile () {
      let userU = Firebase.auth().currentUser

      userU.updateProfile({
        displayName: this.user.nombre,
        email: this.user.email,
        photoURL: this.user.photo,
        phoneNumber: this.user.phone
      }).then((result) => {
        console.log(result)
        return alert(`Usuario actualizado`)
      }).catch((error) => {
        console.table(error)
        this.showError = true
        this.errorMessage = error.message
        this.errorCode = error.code
      })
    }
  }
}
</script>
<style lang="scss">
  .spanText{
      color: #f6bdbe;
  font-size: 18px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  }
</style>
