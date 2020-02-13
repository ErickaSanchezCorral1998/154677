<template>
  <div :style="{'background-color':'black', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="login container">
      <div class="card">
        <div class="row no-gutters">
          <div class="col-sm-6">
            <img
              src="@/assets/pexels-photo-1294671.jpeg"
              class="card-img loginImg"
            />
          </div>
          <div class="col-sm-6">
            <SignupForm class="signupForm"></SignupForm>
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
  name: 'login',
  components: {
    SignupForm
  }
}
</script>
<style lang="scss">
.login {
  padding: 0px;
  margin: 0px;
}
.signupForm {
  margin: 60px;
}
.loginImg {
  height: 80vh;
  margin: 0px;
}
</style>
