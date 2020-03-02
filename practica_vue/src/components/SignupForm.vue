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
      <br>
       <div class="alert alert-danger correoUsado" role="alert" id="correoUsado">
      Correo en uso
      </div>
       <div class="alert alert-danger correoInvalido" role="alert" id="correoInvalido">
      Usuario inválido
      </div>
       <div class="alert alert-danger contrasenaDebil" role="alert" id="contrasenaDebil">
      Contraseña débil
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
      Auth.signUp(this.user).catch(error => {
        console.log(error.code, error.message)
        if (error.code === 'auth/email-already-in-use') {
          document.getElementById('correoUsado').style.display = 'block'
        } else if (error.code === 'auth/invalid-email') {
          document.getElementById('correoInvalido').style.display = 'block'
        } else if (error.code === 'auth/weak-password') {
          document.getElementById('contrasenaDebil').style.display = 'block'
        } else {
          alert(error.message)
        }
      })
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
.alert.alert-danger.correoUsado{
  display: none
}
.alert.alert-danger.contrasenaDebil{
  display: none
}
.alert.alert-danger.correoInvalido{
  display: none
}
</style>
