<template>
  <div class="profile container">

    <div class="p">
      <div class="row">

        <div style="width:100%;">
          <router-link :to="{name:'partidas'}"> <button class="btn back">BACK TO MAIN</button></router-link><br>
        </div>
        <div class="col-lg-5">
          <ProfileForm class="login-form"></ProfileForm>
        </div>
        <div
          class="col-lg-7 pt"
          style="background-color:#344093"
        >
          <h3>RECORD</h3>
          <Ronda></Ronda>
          <button class="btn btn-create-new" style="border:2px solid yellow; color:yellow;">CREATE NEW</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
// @ is an alias to /src

import ProfileForm from '@/components/ProfileForm'
import Ronda from '@/components/Juego/Ronda'
export default {
  name: 'profile',
  components: {
    ProfileForm,
    Ronda
  },
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      showError: false,
      errorMessage: '',
      errorCode: '',
      user: {
        nombre: '',
        photo: ''
      }
    }
  },
  beforeCreate: function () {
    document.body.className = 'profile'
  }
}
</script>
<style lang="scss">

</style>
