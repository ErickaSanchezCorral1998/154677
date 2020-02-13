<template>
  <section>
    <div class="text-left">
      <h3>We are <b>aroma</b>
      </h3>
      <br>
      <h6>Welcome Back, Please login</h6>
      <h6>to your account</h6>
    </div>
    <br>
    <br>
    <div class="col form-group">
      <input
        type="email"
        placeholder="Email address"
        class="form-control mb-2 "
        v-model="user.email"
      >
      <input
        type="password"
        placeholder="Password"
        class="form-control mb-2"
        v-model="user.password"
        @keypress.enter="login"
      >
      <!--Handlerbars templating -  pasar datos de js a html-->
      <!-- {{user.password}}-->
    </div>
    <br>
    <div class="form-group m5">
      <div class="row">
        <div class="col text-left">
          <input type="checkbox" />Remember me
        </div>
        <div class="col text-right">
          <small>Forgot password?</small>
        </div>
      </div>
    </div>
    <br>
    <div class="form-group">
      <div class="row">
        <div class="col">
          <button
            class="btn btn-purple btn-dark btn-block"
            @click="login"
          >Login</button>
        </div>
        <div class="col">
          <button
            class="btn  btn-light btn-block"
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
  name: 'LoginForm',
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      user: {
        email: 'mail@gmail.com',
        password: '123456 '
      },
      userEmail: ' ',
      userPassword: ' '
    }
  },
  beforeCreate () {
    console.log('Estoy en un beforecreated')
  },
  created () {
    console.log(`Estoy en un created ${this.user}`)
  },
  mounted () {
    Auth.signup(this.user)
    console.log(`Estoy en monted ${this.user}`)
    console.log(`Estoy en  ${this.$route.name}`)// route acceder información
  },
  methods: {
    login () {
      // Esta variable es de uso local de nuestro método
      let user = {
        email: 'esto es local'
      }
      console.log('Soy un login')
      console.log('user local: ' + user.email)
      console.log('user from data:' + this.user.email)
      console.log(this.user.password)
      setTimeout(() => {
        // Despues de iniciar sesion nos envia a la página de about
        this.$router.push({ name: 'about' })// Rouer para navegar entre rutas router para mover
      }, 1000)
    },
    signup () {
      setTimeout(() => {
        // Despues de iniciar sesion nos envia a la página de about
        this.$router.push({ name: 'signup' })// Rouer para navegar entre rutas router para mover
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
.btn-purple {
  background: darkviolet;
  &:hover,
  &:active {
    background: rgb(43, 4, 43);
  }
}
.mb-2 {
  border-left: 2px solid;
  &:hover,
  &:active {
    border-left: 2px solid rgb(55, 5, 134);
  }
}
</style>
