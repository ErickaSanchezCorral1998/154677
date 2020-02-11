<template>
  <section>
    <div class="text-left">
      <h3>We are <b>aroma</b>
      </h3>
      <h6>Welcome Back, Please login</h6>
      <h6>to your account</h6>
    </div>
    <br>
    <br>
    <div class="col form-group">
      <input
        type="text"
        placeholder="User"
        class="form-control mb-2 "
        v-model="user.userName"
      >
      <input
        type="email"
        placeholder="Email"
        class="form-control mb-2 "
        v-model="user.email"
      >
      <input
        type="password"
        placeholder="Contraseña"
        class="form-control mb-2"
      >
      <input
        type="password"
        placeholder="Raetype contraseña"
        class="form-control mb-2"
        v-model="user.password"
        @keypress.enter="login"
      >
      <!--Handlerbars templating -  pasar datos de js a html-->
      <!-- {{user.password}}-->
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col">
          <button class="btn  btn-signup btn-light btn-block">Sign up</button>
        </div>
      </div>
    </div>

  </section>
</template>
<script lang="js">
export default {
  name: 'LoginForm',
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      user: {
        userName: ' ',
        email: ' ',
        password: ' '
      },
      userEmail: ' ',
      userPassword: ' '
    }
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
    }
  }
}
</script>
<style lang="scss">
.btn-signup {
  background: darkviolet;
  &:hover,
  &:active {
    background: rgb(43, 4, 43);
  }
}
</style>
