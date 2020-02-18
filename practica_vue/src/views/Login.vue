<template >
  <!--Container nos da un ancho maximo de 1140px-->
  <div :style="{'background-color':'#fefcfd', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="container">
      <div
        class="card"
        style="border-color: #ffebeb"
      >
        <div class="row no-gutters">
          <div class="col-md-6">
            <LoginForm class="loginForm"></LoginForm>
          </div>
          <div class="col-md-6">
            <img
              src="@/assets/pexels-photo-1596569.jpeg"
              class="card-img loginImg .img-fluid. max-width: 100%; and height: >auto"
            />
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
.card {
  border: 0px;
}
.loginForm {
  margin: 60px;
}

@media (max-width: 576px) {
  .loginImg {
    display: none;
  }
}
@media (max-width: 768px) {
  .loginImg {
    display: none;
  }
}
</style>
