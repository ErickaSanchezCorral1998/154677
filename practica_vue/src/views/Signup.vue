<template>
  <!--Container nos da un ancho maximo de 1140px-->
  <div class="login container">
    <div class="card p-3">
      <div class="row">
        <div class="col">
          <img
            src="@/assets/pexels-photo-1034662.jpeg"
            height="80%"
          />
        </div>
        <div class="col">
          <SignupForm></SignupForm>
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
