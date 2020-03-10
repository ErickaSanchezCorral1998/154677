<template>
<section class="partida">
    <h1 class="tituloJuego">Piedra, papel o tijera</h1>
    <div class="row tableroJuego">
      <div class="col col-md-6 tablero ">
          <juego @opcion="getOpcion"></juego>
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
    background-color: rgba(34, 185, 160, 0.575);
    padding: 50px;
  }
.tituloJuego{
  color: #fff;;
}
.tableroJuego{
  padding: 50px;;
}
</style>
