<template >
  <!--Container nos da un ancho maximo de 1140px-->
  <div :style="{'background-color':'#fefcfd', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="container">
      <div
        class="card"
        style="border-color: #ffebeb"
      >
        <div class="row no-gutters">
           <div class="col-md-4 columnaIzq">
            <img class="profilePhoto" src="@/assets/profile.png"/>
            <br>
            <br>
            <input
        type="text"
        placeholder="User"
        class="form-control mb-2 nameUser text-center"
         v-model="user.nombre"
      >
      <button class="btn btn-salir" @click="logout">Log Out</button>
          </div>
          <div class="col-md-6 columnaDer ">
          <h1 class="titulo">User profile</h1>
          <div class="fondoInfo">
            <div class="row">
              <div class="col-3">
                <span class="spanText">Email</span>
              </div>
              <div class="col-9">
                <input type="text" v-model="user.emailUser" class="form-control text-center" >
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-3">
                <span class="spanText">Phone number</span>
              </div>
              <div class="col-9">
                 <input type="text" v-model="user.phoneNumber" class="form-control text-center" >
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
             <button class="btn btn-pink " @click="updateProfile">Update profile</button>
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
export default {
  name: 'Profile',
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      user: {
        nombre: '',
        emailUser: '',
        password: '',
        phoneNumber: '',
        photo: ''

      }
    }
  },
  created () {
    let userC = Firebase.auth().currentUser
    this.user.emailUser = userC.email
    this.user.nombre = userC.displayName
    this.user.phoneNumber = userC.phoneNumber
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
        phoneNumber: this.user.phoneNumber
      }).then((result) => {
        console.log(result)
        console.log('Ok')
        return alert(`Usuario actualizado`)
      }).catch((err) => {
        console.table(err)
      })
    }
  }
}
</script>
<style lang="scss">
.container{
  height: 80vh;
}
.columnaIzq{
  background-color: #eb7b7e;
  padding: 10vh;
  border-radius: 5px;
}
.columnaDer{
margin-left: 0px;
}
.spanText{
  color: rgb(107, 107, 107);
}
.fondoInfo{
  background-color: #fdcdd0;
  padding: 20px;
  border-radius: 5px;
}
.profilePhoto{
  width: 90%;
}
.btn.btn-salir {
  background: #cc7073;
  color: #fff;
  &:hover {
    color: #fff;
    background-color: #cc7073;
  }
}
.nameUser{
  height: 30px;
}
.loginForm {
  margin: 60px;
}

@media (min-width: 576px) {
  .columnaDer {
   margin-left: 0px;
  }
}
@media (min-width: 768px) {
  .columnaDer {
    margin-left: 0px;
  }
}

@media (min-width: 992px) {
  .columnaDer {
    margin-left: 180px;
    margin-top: 100px;
  }
}
</style>
