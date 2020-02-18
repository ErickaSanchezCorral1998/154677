<template>
  <div :style="{'background-color':'#fefcfd', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="login container">
      <div class="card">
        <div class="row no-gutters">
          <div class="col-md-6">
            <SignupForm class="signupForm"></SignupForm>
          </div>
          <div class="col-md-6">
            <img
              src="@/assets/pexels-photo-2791043.jpeg"
              class="card-img loginImg"
            />
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
