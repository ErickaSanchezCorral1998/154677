<template>
<section class="partida">
    <h1>Piedra, papel o tijera</h1>
    <div class="row">
      <div class="col col-md-6">
          <juego @opcion="opcion"></juego>
      </div>
      <div class="col col-md-6">
        <juego></juego>
      </div>
    </div>
  </section>
</template>
<script lang="js">
import Juego from '@/components/Juego/Juego'
export default {
  name: 'Partida',
  components: {
    Juego
  },
  methods: {
    getOpcion (opcion) {
      alert(opcion)
    }
  }
}
</script>
<style lang="scss">
  .partida{
    background-color: rgb(173, 173, 212);
  }
</style>
