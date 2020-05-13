<template>
  <section>
        <h3 class="title text-light" >JOIN US</h3>
   <h1><strong> AND PLAY!</strong></h1>
    <div class="col mb-3">
        <a class="subtitle text-center">
        </a>
    </div>
    <div class="col">

        <input type="text" name="name" class="form-control mb-3" placeholder="Name" v-model="user.nombre">
        <input type="email" name="email" class="form-control mb-3" placeholder="E-mail" v-model="user.email"
            @keypress="showError = false">
        <input type="password" name="password" class="form-control mb-3" placeholder="********" v-model="user.password"
            @keypress.enter="signup">
        <div class="alert-campos" id="alert-campos">Todos los campos son obligatorios</div>

    </div>

    <div class="form-group mb-3">

        <alerts-component v-if="showError" :message="errorMessage" :code="errorCode">
        </alerts-component>

        <div class="row">

        </div>
    </div>
    <div class="form-group mb-2">
        <div class="row">
            <div class="col text-center">
                <button class="btn btn_success btn-block btn-black btn-dark" @click="signup">SIGN UP</button>
            </div>

        </div>
    </div>
    <div class="col subtitle">

    </div>
    <div class="col">
        <button class="btn text-light sign-up " @click="login" > <small class="">Already have an account?</small></button>
    </div>
  </section>
</template>
<script lang="js">
import Auth from '@/config/auth.js'
import AlertsComponent from './Helpers/Alerts'
export default {
  name: 'SignupForm',
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
      Auth.signUp(this.user).catch(error => {
        console.log(error.code, error.message)
        this.showError = true
        this.errorMessage = error.message
        this.errorCode = error.code
      })
    },
    login () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss">
@import "./recursos/css/signup.css";
</style>
