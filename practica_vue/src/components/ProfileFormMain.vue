<template>
<section>
  <div class="col">
    <img class="img-fluid mb-2" :src="user.photo"
      style="height: 100px;">
    <a class="subtitle text-center">
      <h6 class="title text-light">Hello {{user.nombre?user.nombre:'Sin Nombre'}}</h6>
      {{user&&user.emailUser?user.emailUser:'Sin Correo'}}
    </a>
  </div>
  <router-link :to="{name:'profile'}">
<button class="btn btn-edit">Edit</button>
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
