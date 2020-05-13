<template>
 <section class="formulario">
    <h3 class="title"><strong>WANNA<br>PLAY?</strong></h3>

    <div class="col mb-3">
      <a class="subtitle text-center text-light">

      </a>
    </div>
    <div class="col">
      <small class="text-light">Name:</small>
      <input class="form-control mb-3" name="email" type="email" placeholder="E-mail" v-model="user.email" @keypress="showError=false">
      <small class="text-light">Password</small>
      <input class="form-control mb-3" name="password" type="password" placeholder="********" v-model="user.password" @keypress.enter="login" @keypress="showError=false">

      <!-- Handler templating -->
      <!--{{user.password}}-->
      <!--{{1+1}}-->

    </div>
    <div class="form-group mb-3">
      <div class="row">
        <!-- <div class="col">
          <div class="row">
            <div class="col-md-2">
              <input type="checkbox" />
            </div>
            <div class="col">
              <small>Remember me</small>
            </div>
          </div>

        </div>-->
        <!--<div class="col">
          <small>Forgot password?</small>
        </div>-->
      </div>
    </div>
    <div class="form-group mb-2">
      <!--<div
        class="alert alert-danger"
        role="alert"
        id="alert-error"
      >
        <strong></strong> <a
          href="#"
          class="alert-link"
        >E-mail or password are incorrect </a> Try again.
      </div>-->
      <alerts-component v-if="showError" :message="errorMessage" :code="errorCode">
      </alerts-component>
      <div class="row">
        <div class="col">
          <button class="btn btn_success btn-block btn-black btn-dark" @click="login">Login</button>
        </div>

      </div>
    </div>
    <div class="col subtitle">

    </div>
    <div class="col">
      <button class="btn btn-gray sign-up" @click="signup"><small class="text-light">Don't have an account?</small></button>

    </div>

  </section>
</template>
<script lang="js">
import Auth from '@/config/auth.js'
// importar el componenete alerts
import AlertsComponent from './Helpers/Alerts'
export default {
  name: 'LoginForm',
  components: {
    AlertsComponent// Lo registramos como componente
  },
  data () {
    // Variables y metodos(funciones que vamos  a utilizar)
    return {
      showError: false,
      errorMessage: '',
      errorCode: '',
      user: {
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
    console.log(`Estoy en  ${this.$route.name}`)// route acceder información
  },
  methods: {
    login () {
      // Esta variable es de uso local de nuestro método
      /* let user = {
        email: 'esto es local'
      } */
      // console.log('Soy un login')
      // console.log('user local: ' + user.email)
      // console.log('user from data:' + this.user.email)
      Auth.logIn(this.user).catch(error => {
        console.log(error.code, error.message)
        this.showError = true
        this.errorMessage = error.message
        this.errorCode = error.code
      })
    },
    signup () {
      setTimeout(() => {
        this.$router.push({ name: 'signup' })
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
@import "./recursos/css/login.css";
</style>
