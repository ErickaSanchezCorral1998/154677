<template>
  <section>
    <div class="text-left">
      <h3 class="titulo">We are <b class="negrita">aroma</b>
      </h3>
      <br>
      <h6 class="titulo2">Welcome, Please register</h6>
      <h6 class="titulo2">your account</h6>
    </div>
    <br>
    <br>
    <div class="col form-group">
      <input
        type="text"
        placeholder="User"
        class="form-control mb-2 "
        v-model="user.nombre"
      >
      <input
        type="email"
        placeholder="Email"
        class="form-control mb-2 "
        v-model="user.email"
      >
      <input
        type="password"
        placeholder="Password"
        class="form-control mb-2"
        v-model="user.password"
        @keypress.enter="signup"
      >
      <br>
      <div class="form-group">
        <div class="row">
          <div class="col">
            <router-link
              :to="{name:'login'}"
              class="loginLink"
            >Already acount? <i>Login</i></router-link>
          </div>
        </div>
      </div>
      <!--Handlerbars templating -  pasar datos de js a html-->
      <!-- {{user.password}}-->
    </div>
    <br>
    <div class="form-group">
      <div class="row">
        <div class="col">
          <button
            class="btn btn-pink btn-block"
            @click="signup"
          >Sign up</button>
        </div>
      </div>
    </div>

  </section>
</template>
<script lang="js">
import Auth from '@/config/auth.js'
export default {
  name: 'SignupForm',
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      user: {
        nombre: '',
        email: '',
        password: ''
      }
    }
  },
  beforeCreate () {
    console.log('Estoy en un beforecreated')
  },
  created () {
    console.log(`Estoy en un created ${this.user}`)
  },
  mounted () {
    console.log(`Estoy en monted ${this.user}`)
    console.log(`Estoy en  ${this.$route.name}`)
  },
  methods: {
    signup () {
      Auth.signUp(this.user)
      if (this.user.nombre === ' ' || this.user.email === ' ' || this.user.password === ' ') {
        console.log('error')
      } else {
        setTimeout(() => {
          this.$router.push({ name: 'about' })
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss">
.loginLink {
  color: #ffd7da;
  &:hover,
  &:active {
    color: #ceaeb0;
  }
}
</style>
