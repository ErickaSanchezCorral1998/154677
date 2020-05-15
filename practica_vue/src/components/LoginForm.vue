<template>
  <section class="formulario">
    <h3 class="title"><strong>¿QUIERES<br>JUGAR?</strong></h3>

    <div class="col mb-3">
      <a class="subtitle text-center text-light">

      </a>
    </div>
    <div class="col">

      <small class="text-light">Nombre:</small>
      <!--Input del formulatio para obtener el emal-->
      <input
        class="form-control mb-3"
        name="email"
        type="email"
        placeholder="E-mail"
        v-model="user.email"
        @keypress="showError=false"
      >
      <!--Fin Input del formulatio para obtener el emal-->
      <!--Input del formulatio para obtener la contraseña-->
      <small class="text-light">Contraseña</small>
      <input
        class="form-control mb-3"
        name="password"
        type="password"
        placeholder="********"
        v-model="user.password"
        @keypress.enter="login"
        @keypress="showError=false"
      >
      <!--Fin Input del formulatio para obtener la contraseña-->

    </div>
    <div class="form-group mb-3">
      <div class="row">

      </div>
    </div>
    <div class="form-group mb-2">
      <!--Inicio de componente que muestra las alertas-->
      <alerts-component
        v-if="showError"
        :message="errorMessage"
        :code="errorCode"
      >
      </alerts-component>
      <!--Fin de componente de alertas-->
      <div class="row">
        <div class="col">
          <!--Boton que manda llamar metodo de inicio de sesion-->
          <button
            class="btn btn_success btn-block btn-black btn-dark"
            @click="login"
          >Iniciar Sesión</button>
          <!--Boton que manda llamar metodo de inicio de sesion-->
        </div>

      </div>
    </div>
    <div class="col subtitle">

    </div>
    <div class="col">
      <!--Boton que lleva a la pantalla de registro-->
      <button
        class="btn btn-gray sign-up"
        @click="signup"
      ><small class="text-light">¿No tiene una cuenta?</small></button>
      <!--Fin Boton que lleva a la pantalla de registro-->

    </div>

  </section>
</template>
<script lang="js">
// importar la configuracion de autenticacion
import Auth from '@/config/auth.js'
// importar el componenete alerts
import AlertsComponent from './Helpers/Alerts'

export default {
  name: 'LoginForm',
  components: {
    AlertsComponent// Lo registramos como componente
  },
  data () {
    //Como se muestra la informacion en un inicio
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
  methods: {
    //metodo para hacer inicio de sesion
    login () {

      Auth.logIn(this.user).catch(error => {
        console.log(error.code, error.message)
        this.showError = true
        this.errorMessage = error.message
        this.errorCode = error.code
      })
    },
    //Lleva hacia la pantalla de registro
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
