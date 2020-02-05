<template>
  <section>
    <div class="text-left">
      <h3>We are <b>aroma</b>
      </h3>
      <h6>Welcome Back, Please login</h6>
      <h6>to your account</h6>
    </div>
    <div class="col form-group">
      <input
        type="email"
        placeholder="Correo"
        class="form-control mb-2"
      >
      <input
        type="password"
        placeholder="Contraseña"
        class="form-control mb-2"
      >
    </div>
    <div class="form-group m5">
      <div class="row">
        <div class="col text-left">
          <input type="checkbox" />Remember me
        </div>
        <div class="col text-right">
          <small>Forgot password?</small>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col">
          <button class="btn btn-purple btn-dark btn-block">Login</button>
        </div>
        <div class="col">
          <button class="btn  btn-light btn-block">Sign up</button>
        </div>
      </div>
    </div>

  </section>
</template>
<script lang="js">
export default {
  name: 'LoginForm'
}
</script>
<style lang="scss">
.btn-purple {
  background: darkviolet;
  &:hover,
  &:active {
    background: rgb(43, 4, 43);
  }
}
</style>
