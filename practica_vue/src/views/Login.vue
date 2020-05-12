<template>
  <div class="login container">
    <div class="p">
      <!--  Soy el login  -->
      <div class="row">
        <div class="col-lg-6 d-none d-lg-block bg-light">
          <div class="img">
            <table
              class="login"
              style="height: 100%; width:100%;"
            >
              <tbody>
                <tr>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
        <div class="col-lg-6 bg-dark">
          <!-- Invocamos el componente para su visualizacion en nuestro View-->
          <LoginForm class="login-form"></LoginForm>
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
  },
  beforeCreate: function () {
    document.body.className = 'login'
  }
}
</script>
<style lang="scss">

</style>
