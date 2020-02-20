<template>
  <div class="about">
    <h1>Entraste</h1>
    <button class="btn" @click="logOut">Log Out</button>
  </div>
</template>
<script lang="js">
import Auth from '@/config/auth.js'
export default {
  methods: {
    name: 'About',
    logOut () {
      return Auth.logOut
    }
  }
}
</script>
