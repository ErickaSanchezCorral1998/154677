<template >
  <!--Container nos da un ancho maximo de 1140px-->
  <div :style="{'background-color':'#fefcfd', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="container">
      <div
        class="card"
        style="border-color: #ffebeb"
      >
      <br>
      <h3 class="titulo">Edit profile</h3>
      <br>
        <div class="row no-gutters">
          <div class="col-md-6 colIzqPerfil">
            <img  class="profilePhotoEdit mx-auto" :src="user.photo"/>
            <br>
            <label class="mx-auto usuarioNombre">{{user.nombre}}</label>
            <br>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-6 justify-center">
                <button class="btn btn-pink2 btn-block" @click="logout">Log Out</button>
                <br>
                <br>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <ProfileForm class="loginForm"></ProfileForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
// @ is an alias to /src
import Auth from '@/config/auth.js'
import Firebase from '@/config/_firebase.js'
import ProfileForm from '@/components/ProfileForm'
export default {
  name: 'profile',
  components: {
    ProfileForm
  },
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      showError: false,
      errorMessage: '',
      errorCode: '',
      user: {
        nombre: '',
        photo: ''
      }
    }
  },
  mounted () {
    let userC = Firebase.auth().currentUser
    this.user.nombre = userC.displayName
    this.user.photo = userC.photoURL
  },
  updated () {
    let userC = Firebase.auth().currentUser
    this.user.nombre = userC.displayName
    this.user.photo = userC.photoURL
  },
  methods: {
    name: 'Profile',
    logout () {
      return Auth.logOut()
    }
  }
}
</script>
<style lang="scss">
.card {
  border: 0px;
}
.loginForm {
  margin: 60px;
}
.colIzqPerfil{
  background-color: #eb7b7e;
}
.profilePhotoEdit{
 width: 40%;
 margin: 30px;
 border: 3px solid #fff;
}
@media (max-width: 576px) {
  .loginImg {
    display: none;
  }
}
@media (max-width: 768px) {
  .loginImg {
    display: none;
  }
}
</style>
