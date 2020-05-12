<template>
  <div class="login container">
    <div class="p">
      <!--  Soy el signUp  -->
      <div class="row">
        <div class="col-lg-6 bg-dark">
          <!-- Invocamos el componente para su visualizacion en nuestro View-->
          <SignupForm class="login-form"></SignupForm>
        </div>
        <div class="col-lg-6 d-none d-lg-block bg-light">
          <div class="img">
            <table
              class="signup"
              style="height: 100%; width:100%;"
            >
              <tbody>
                <tr>
                  <td class="text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
// @ is an alias to /src
import SignupForm from '@/components/SignupForm'
export default {
  name: 'signup',
  components: {
    SignupForm
  },
  beforeCreate: function () {
    document.body.className = 'signup'
  }
}
</script>
<style lang="scss">
</style>
