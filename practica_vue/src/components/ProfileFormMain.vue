<template>
<section class="profilemain">
  <div class="col">
    <center>
      <div class="imagenperfil">
        <img class="mb-2" :src="user.photo">
      </div>
    </center>
    <a class="subtitle text-center">
      <h6 class="titleprofile text-dark">{{user&&user.name?user.name:'Sin Nombre'}}</h6>
      <p class="correo">{{user&&user.email?user.email:'Sin Correo'}}</p>
    </a>
  </div>
  <router-link :to="{name:'profile'}">
<button class="btn btn-edit editar">Edit</button>
  </router-link>

  </section>

</template>
<script lang="js">
import Firebase from '@/config/_firebase.js'

export default {
  name: 'ProfileFormMain',
  component: {
    Firebase
  },
  data () { // iteramos todas las variables y métodos que
    return {
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
    let usuario = Firebase.auth().currentUser
    this.user.name = usuario.displayName
    this.user.email = usuario.email
    this.user.photo = usuario.photoURL
  },
  methods: {
    name: 'profileMain',
    profile () {
      this.$router.push({ name: 'Profile' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
//Style, ubicamos el css relacionado a nuestros views y componentes
