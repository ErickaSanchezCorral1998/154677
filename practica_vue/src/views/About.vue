<template>
  <div class="about">
    <h1>Entraste</h1>
    <button class="btn btn-danger" @click="logout">Log Out</button>
  </div>
</template>
<script lang="js">
import Auth from '@/config/auth.js'
export default {
  methods: {
    name: 'About',
    logout () {
      return Auth.logOut()
    }
  }
}
</script>
