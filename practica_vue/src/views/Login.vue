<template>
  <!--Container nos da un ancho maximo de 1140px-->
  <div class="login container">
    <div class="card p-3">
      <h1>Bienvenido</h1>
      <div class="row">
        <div class="col">
          <img
            src="@/assets/pexels-photo-1034662.jpeg"
            height="90%"
          />
        </div>
        <div class="col">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
// @ is an alias to /src
import LoginForm from '@/components/LoginForm'
export default {
  name: 'login',
  components: {
    LoginForm
  }
}
</script>
