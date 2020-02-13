<template>
  <section>
    <div class="text-left">
      <h3>We are <b>aroma</b>
      </h3>
      <br>
      <h6>Welcome, Please register</h6>
      <h6>your account</h6>
    </div>
    <br>
    <br>
    <div class="col form-group">
      <input
        type="text"
        placeholder="User"
        class="form-control mb-2 "
        v-model="userName"
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
        v-model="password"
        @keypress.enter="login"
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
            class="btn btn-secondary btn-block"
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
        email: 'mail@mail.com ',
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
    signup () {
      setTimeout(() => {
        this.$router.push({ name: 'about' })
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
.loginLink {
  color: rgb(46, 5, 63);
  &:hover,
  &:active {
    color: rgb(161, 10, 161);
  }
}
</style>
