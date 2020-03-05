<template >
  <!--Container nos da un ancho maximo de 1140px-->
  <div :style="{'background-color':'#fefcfd', 'background-size': 'cover', 'height':'88.7vh'}">

    <div class="cointainer containerProfile">
      <div class="card  text-white">
  <img id="coverImgHeader" src="@/assets/pexels-photo-3576112.jpeg" class="card-img">
  <div class="card-img-overlay">
    <div class="col-12">
      <alerts-component v-if="showError" :message="errorMessage" :code="errorCode"></alerts-component>
      <h1 class="titulo1"><b>User profile</b></h1>
      <br>
      <br>
      <img  class="profilePhoto mx-auto" :src="user.photo"/>
      <br>
      <br>
    <label class="mx-auto nombreUsuario">{{user.nombre}}</label>
    <br>
    <label class="mx-auto correoUsuario">{{user.emailUser}}</label>
    <br>
    <br>
    <button class="btn btn-salir" @click="logout">Log Out</button>
    </div>
  </div>

        <div class="row">
        <div class="col-md-6  mx-auto ">
          <h1 class="tituloU">Update profile</h1>
          <div class="fondoInfo">
              <div class="row">
              <div class="col-3">
                <span class="spanText">Name</span>
              </div>
              <div class="col-9">
              <input  type="text" placeholder="User" class="form-control mb-2 nameUser text-center"
              v-model="user.nombre">
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <span class="spanText">Email</span>
              </div>
              <div class="col-9">
                <input  type="text" v-model="user.emailUser" class="form-control text-center" >
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-3">
                <span class="spanText">Phone number</span>
              </div>
              <div class="col-9">
              <input  type="text" v-model="user.phone" class="form-control text-center" >
              </div>
            </div>
            <br>
                  <div class="row">
              <div class="col-3">
                <span class="spanText">Photo URL</span>
              </div>
              <div class="col-9">
                <input type="text" v-model="user.photo" class="form-control text-center" >
              </div>
            </div>
            <br>
            <div class=" text-right">
              <button class="btn btn-update " @click="updateProfile">Update profile</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from '@/config/auth.js'
import Firebase from '@/config/_firebase.js'
import AlertsComponent from '@/components/Helpers/Alerts'
export default {
  name: 'profile',
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
.titulo1{
  color: #fff;
}
#coverImgHeader{
  height: 80vh;
}
.tituloU{
color: #eb7b7e;
}
.container{
  height: 80vh;
}
.nombreUsuario{
  color: #fff;
  font-size: 30px;
}
.correoUsuario{
  color: #fff;
}

.fondoHeader{
  background-color: #eb7b7e;
  padding: 10vh;
  border-radius: 5px;
}
.columnaDer{
margin-left: 0px;
}

.spanText{
  color: #ffffff;
  font-weight: bold;
}
.fondoInfo{
  background-color: #eb7b7e;
  padding: 20px;
  border-radius: 5px;
}
.profilePhoto{
  width: 15%;
}
.btn.btn-update{
  background-color: #fdcdd0;
  color: #cc7073;
}
.btn.btn-salir {
  background: #fff;
  color: #cc7073;
  &:hover {
    color: #965153;
    background-color: rgb(202, 202, 202);
  }
}
.nameUser{
  height: 30px;
}

@media (max-width: 576px) {
  .profilePhoto {
    width: 50%;
  }
}
@media (max-width: 768px) {
 .profilePhoto {
    width: 50%;
  }
}

</style>
