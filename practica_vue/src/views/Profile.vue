<template >
  <!--Container nos da un ancho maximo de 1140px-->
  <div :style="{'background-color':'#fefcfd', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="container">
       <div class="row" >
          <div class="col-6 columnaIzq">
            <img class="profilePhoto" src="@/assets/pexels-photo-1596569.jpeg"/>
            <br>
            <br>
            <input
        type="text"
        placeholder="User"
        class="form-control mb-2 nameUser"
         v-model="user.nombre"
      >
      <button class="btn btn-danger" @click="logout">Log Out</button>
          </div>
          <div class="col-6">
          <h1>User profile</h1>
          <div class="fondoInfo">

                <span>Phone number</span>

              <input type="text" class="form-control" >
            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
              </div>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            </div>
          </div>
          </div>
       </div>
        </div>
  </div>
</template>
<script lang="js">
import Auth from '@/config/auth.js'
export default {
  name: 'Profile',
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      user: {
        nombre: '',
        email: '',
        password: '',
        photo: '',
        phoneNumber: ''
      }
    }
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
.container{
  height: 80vh;
}
.columnaIzq{
  background-color: #ffd7da;
  padding: 10vh;
  border-radius: 10px;
}
.fondoInfo{
  background-color: #ceaeb0;
  padding: 20px;
  border-radius: 20px;
}
.profilePhoto{
  height: 300px;
}
.nameUser{
  height: 30px;
}
.loginForm {
  margin: 60px;
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
