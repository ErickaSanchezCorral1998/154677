<template>
  <section class="fondoForm">
    <div class="text-left">
      <h3 class="titulo">We are <b class="negrita">aroma</b>
      </h3>
      <br>
      <h6 class="titulo2">Welcome Back, Please login</h6>
      <h6 class="titulo2">to your account</h6>
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
          <input
            id="Rem"
            type="checkbox"
          >
          <label
            for="Rem"
            class="input-rem"
          >Remember me</label>
        </div>
        <div class="col text-right">
          <button class="btn btn-Forgot">Forgot password?</button>
        </div>
      </div>
    </div>
    <br>
    <div class="form-group">
      <div class="row">
        <div class="col">
          <button
            class="btn btn-pink btn-block"
            @click="login"
          >Login</button>
        </div>
        <div class="col">
          <button
            class="btn btn-pink2 btn-block"
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
      console.log('Soy un login')
      // console.log('user local: ' + user.email)
      console.log('user from data:' + this.user.email)
      console.log(this.user.password)
      Auth.logIn(this.user)
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
//Letras
.titulo {
  color: #eb7b7e;
}
.negrita {
  color: #cc7073;
}
.titulo2 {
  color: #f6bdbe;
  font-size: 15px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
//Botones
.btn.btn-pink {
  background: #ff6c70;
  color: white;
  &:hover {
    color: white;
    background-color: #d3595d;
  }
}
.btn.btn-pink2 {
  background-color: #fdcdd0;
  color: white;
  &:hover {
    background-color: #dbb1b4;
    color: white;
  }
}
#Rem {
  margin-top: 10px;
}
.input-rem {
  color: #ffd7da;
}
.btn.btn-Forgot {
  background-color: rgba(255, 255, 255, 0);
  border-radius: 0px;
  color: #dddcdf;
  &:hover {
    color: #b9b8bb;
  }
}
//Input
.mb-2 {
  color: #a8a7ad;

  &:hover,
  &:active {
    border-bottom: 2px solid #fe6c72;
  }
}
</style>
