<template>
  <section class="section">

    <h4>EDITAR PERFIL</h4>
    <a class="subtitle text-center">
      <img
        class="imgperfil"
        :src="user.photo"
      >
      <h6 class="title profiletitle"> {{user&&user.nombre?user.nombre:'Sin Nombre'}}</h6>
    </a>
    <alerts-component
      v-if="showError"
      :message="errorMessage"
      :code="errorCode"
    ></alerts-component>
    <div class="col">

      <br>
      <small class="small">Nombre:</small>
      <input
        class="form-control mb-2"
        name="name"
        type="text"
        placeholder="Name"
        v-model="user.nombre"
      >
      <small class="small">Url Foto:</small>
      <input
        placeholder="Ex: http://pic.com"
        class="form-control mb-2 "
        type="text"
        v-model="user.photo"
      >

    </div>
    <div class="form-group mb-3">
      <div class="row">
      </div>
    </div>
    <div class="form-group mb-2">
      <div class="row">
        <div class="col">

        </div>

      </div>
    </div>
    <div class="form-group mb-2">
      <div class="row">
        <div class="col">
          <button
            class="btn btn-update"
            @click="updateProfile"
          ><small><strong class="strong">ACTUALIZAR</strong></small></button>
          <br>
          <br>
          <button
            class="btn"
            @click="logout"
          ><small><strong class="strong">CERRAR SESIÓN</strong></small></button>
        </div>

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
        this.$router.push({ name: 'partidas' })
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
@import "./recursos/css/profile.css";
</style>
