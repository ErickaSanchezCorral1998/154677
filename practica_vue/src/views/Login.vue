<template >
  <!--Container nos da un ancho maximo de 1140px-->
  <div :style="{'background-color':'black', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="login container">
      <div class="card">
        <div class="row no-gutters">
          <div class="col-sm-6">
            <img
              src="@/assets/pexels-photo-1034662.jpeg"
              class="card-img loginImg"
            />
          </div>
          <div class="col-sm-6">
            <LoginForm class="loginForm"></LoginForm>
          </div>
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
<style lang="scss">
.loginForm {
  margin: 60px;
}
.loginImg {
  height: 80vh;
}
@media (max-width: 576px) {
  .loginImg {
    display: none;
  }
}
</style>
