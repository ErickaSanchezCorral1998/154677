<template>
  <div id="app">
    <div id="nav">
     <!--<router-link to="/">Home</router-link> -->
      <!--<router-link :to="{name:'about'}">About</router-link>-->
      <router-link :to="{name:'partidas'}">Inicio</router-link> |
      <router-link to="/juego-1/etCU3kenCKDvQCZv6GEU"> Juego</router-link>
      <!--Al agregar los dos puntos se convierte en una funcion de js-->
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "montserrat";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111213;
}

#nav {
  padding: 10px;
  font-size: 10pt;
  margin: 20px;

  a {
    font-weight: bold;
    color: yellow;

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
